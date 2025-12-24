import express from "express";
import document from "./openapi.js";
import { PrismaClient } from "../persistence/generated/prisma/client.js";
import userResourceDefinition from "../services/handlers/user.js";
import organizationResourceDefinition from "../services/handlers/organization.js";
import organizationInvitationResourceDefinition from "../services/handlers/organization-invitation.js";
import loginResourceDefinition from "../services/handlers/login.js";
import { createCRUDRoutes } from "./createCRUDRoutes.js";
import { SecurityContext } from "../common/security.js";
import { createSessionCookie } from "../common/session.js";
import * as jose from 'jose'
import cookieParser from "cookie-parser";
import { rateLimitMiddleware } from "./rateLimitMiddleware.js";
import { getAbsoluteFSPath } from "swagger-ui-dist";
import { AppConfig, defaultConfig } from "../config.js";

export function createServer(db: PrismaClient, port: number | undefined, config: AppConfig) {
    const app = express();

    const resolvedPort = port ?? (process.env.PORT ? Number(process.env.PORT) : undefined) ?? 3000;

    app.use(rateLimitMiddleware(config));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());
    app.get("/openapi.json", (req, res) => {
        res.json(document);
    });
    // Serve Swagger UI static assets
    app.use("/swagger/assets", express.static(getAbsoluteFSPath()));
    // Serve Swagger UI HTML page with spec loaded from /openapi.json
    app.get("/swagger", (req, res) => {
        res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>API Documentation</title>
    <link rel="stylesheet" type="text/css" href="/swagger/assets/swagger-ui.css" />
    <link rel="stylesheet" type="text/css" href="/swagger/assets/index.css" />
</head>
<body>
    <div id="swagger-ui"></div>
    <script src="/swagger/assets/swagger-ui-bundle.js"></script>
    <script src="/swagger/assets/swagger-ui-standalone-preset.js"></script>
    <script>
        window.onload = function() {
            window.ui = SwaggerUIBundle({
                url: "/openapi.json",
                dom_id: "#swagger-ui",
                presets: [
                    SwaggerUIBundle.presets.apis,
                    SwaggerUIStandalonePreset
                ],
                layout: "StandaloneLayout"
            });
        };
    </script>
</body>
</html>
        `);
    });

    app.get('/', (req, res) => {
        res.send('//TODO: Add a welcome page');
    });
    setupRoutes(app, db, config);
    if(process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
        setupDevRoutes(app);
    }
    const server = app.listen(resolvedPort, () => {
        const actualPort = (server.address() as { port: number })?.port ?? resolvedPort;
        console.log(`Server is running on port ${actualPort}`);
    });
    return server;
}

function setupDevRoutes(app: express.Application) {
    app.get('/dev/loginAsUser', async (req: express.Request, res: express.Response) => {
        await initSesssionCookieForUser(res, { currentUserId: req.query.userId as string, isAdmin: req.query.isAdmin as string === 'true' })
        res.redirect('/');
    });
    app.get('/dev/logout', (req: express.Request, res: express.Response) => {
        res.clearCookie('session');
        res.redirect('/');
    });
}
function setupRoutes(app: express.Application, db: PrismaClient, config: AppConfig) {
    app.use(securityContextMiddleware)
    app.use(`/${userResourceDefinition.namePlural}`, createCRUDRoutes(db, db.user, userResourceDefinition, config));
    app.use(`/${organizationResourceDefinition.namePlural}`, createCRUDRoutes(db, db.organization, organizationResourceDefinition, config));
    app.use(`/${organizationInvitationResourceDefinition.namePlural}`, createCRUDRoutes(db, db.organizationInvitation, organizationInvitationResourceDefinition, config));
    app.use(`/${loginResourceDefinition.namePlural}`, createCRUDRoutes(db, null as any, loginResourceDefinition, config));
}

async function initSesssionCookieForUser(res: express.Response, user: SecurityContext) {
    await createSessionCookie(res, user);
}

declare module 'express-serve-static-core' {
    interface Request {
        securityContext: SecurityContext;
    }
}

// TODO: Use cookie parser to use signed cookies.
async function securityContextMiddleware(req: express.Request, res: express.Response, next: express.NextFunction) {
    const securityContext = await parseSessionCookie(req.cookies?.session ?? '');
    // Always set a security context, even for unauthenticated requests
    req.securityContext = securityContext ?? { currentUserId: undefined, isAdmin: false };
    return next();
}

async function parseSessionCookie(sessionCookie: string): Promise<SecurityContext | undefined> {
    try {
        const secret = new TextEncoder().encode(
            defaultConfig.JWT_SECRET
        );
        const { payload } = await jose.jwtVerify(sessionCookie, secret) as { payload: SecurityContext };
        return payload;
    } catch (error) {
        return undefined;
    }
}

