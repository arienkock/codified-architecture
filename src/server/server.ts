import express from "express";
import document from "./openapi.js";
import { PrismaClient } from "../persistence/generated/prisma/client.js";
import userResourceDefinition from "../services/handlers/user.js";
import { createCRUDRoutes } from "./createCRUDRoutes.js";
import { SecurityContext } from "../common/security.js";
import * as jose from 'jose'
import { JWT_SECRET } from "../config.js";
import cookieParser from "cookie-parser";

const secret = new TextEncoder().encode(
    JWT_SECRET
)

export function createServer(db: PrismaClient, port?: number) {
    const app = express();

    const resolvedPort = port ?? (process.env.PORT ? Number(process.env.PORT) : undefined) ?? 3000;

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());
    app.get("/openapi.json", (req, res) => {
        res.json(document);
    });
    app.get('/', (req, res) => {
        res.send('//TODO: Add a welcome page');
    });
    setupRoutes(app, db);
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
        res.cookie('session', await new jose.SignJWT({ userId: req.query.userId as string, isAdmin: req.query.isAdmin as string === 'true' }).setProtectedHeader({ alg: 'HS256' }).setIssuedAt().setExpirationTime('1h').sign(secret), { httpOnly: true, secure: false });
        res.redirect('/');
    });
    app.get('/dev/logout', (req: express.Request, res: express.Response) => {
        res.clearCookie('session');
        res.redirect('/');
    });
}

function setupRoutes(app: express.Application, db: PrismaClient) {
    app.use(securityContextMiddleware)
    app.use(`/${userResourceDefinition.namePlural}`, createCRUDRoutes(db, db.user, userResourceDefinition));
}

declare module 'express-serve-static-core' {
    interface Request {
        securityContext: SecurityContext;
    }
}

// TODO: Use cookie parser to use signed cookies.
async function securityContextMiddleware(req: express.Request, res: express.Response, next: express.NextFunction) {
    const securityContext: SecurityContext = await parseSessionCookie(req.cookies?.session ?? '');
    req.securityContext = securityContext;
    return next();
}

async function parseSessionCookie(sessionCookie: string): Promise<any> {
    try {
        const { payload } = await jose.jwtVerify(sessionCookie, secret)
        return {
            currentUserId: parseInt(payload.userId as string),
            isAdmin: payload.isAdmin as boolean,
        };
    } catch (error) {
        return {};
    }
}
