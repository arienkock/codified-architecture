import express from "express";
import z from "zod";
import document from "./openapi.js";
import { Prisma, PrismaClient } from "../persistence/generated/prisma/client.js";
import userResourceDefinition from "../services/handlers/user.js";
import { PagenatedResponse, paginationParamsSchema } from "../common/pagination.js";
import { DEFAULT_PAGE_SIZE } from "../config.js";
import { ResourceDefinition } from "../common/resource-definition.js";
import { DefaultArgs } from "../persistence/generated/prisma/runtime/library";


export function createServer(db: PrismaClient, port?: number) {
    const app = express();

    port = port || Number(process.env.PORT) || 3000;

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.get("/openapi.json", (req, res) => {
        res.json(document);
    });
    setupRoutes(app, db);
    const server = app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
    return server;
}

function setupRoutes(app: express.Application, db: PrismaClient) {
    app.use(`/${userResourceDefinition.namePlural}`, createCRUDRoutes(db, db.user, userResourceDefinition));
}

function createCRUDRoutes(db: PrismaClient, repo: Prisma.UserDelegate<DefaultArgs>, resourceDefinition: ResourceDefinition) {
    const router = express.Router();
    router.get("/", (req, res) => {
        const paginationParams = paginationParamsSchema.parse(req.query);
        const page = paginationParams.page ?? 0;
        const pageSize = paginationParams.pageSize ?? DEFAULT_PAGE_SIZE;
        return db.$transaction([
            repo.findMany({
                skip: page * pageSize,
                take: pageSize,
            }),
            repo.count(),
        ]).then(([users, total]) => {
            const totalPages = Math.ceil(total / pageSize);
            res.json({
                data: users.map(u => resourceDefinition.readResponseSchema.parse(u)),
                pagination: {
                    page,
                    pageSize,
                    total,
                    totalPages,
                    hasNext: page < totalPages - 1,
                    hasPrev: page > 0,
                },
            } satisfies PagenatedResponse<z.infer<typeof resourceDefinition.readResponseSchema>>);
        });
    });
    router.post("/", (req, res) => {
        const body: z.infer<typeof resourceDefinition.createRequestBodySchema> = resourceDefinition.createRequestBodySchema.parse(req.body);
        return repo.create({
            data: body as any,
        }).then(u => res.json(resourceDefinition.readResponseSchema.parse(u)));
    });
    router.get("/:id", (req, res) => {
        res.json({ message: "Hello, world!" });
    });
    router.put("/:id", (req, res) => {
        res.json({ message: "Hello, world!" });
    });
    router.delete("/:id", (req, res) => {
        res.json({ message: "Hello, world!" });
    });
    return router;
}