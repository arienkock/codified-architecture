import express from "express";
import z from "zod";
import document from "./openapi";
import { PrismaClient } from "../persistence/generated/prisma/client";
import userResourceDefinition from "../services/handlers/user";
import { PagenatedResponse, paginationParamsSchema } from "../common/pagination";
import { DEFAULT_PAGE_SIZE } from "../config";


export function createServer(db: PrismaClient, port?: number) {
    const app = express();

    port = port || Number(process.env.PORT) || 3000;

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.get("/openapi.json", (req, res) => {
        res.json(document);
    });
    setupRoutes(app, db);
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}

function setupRoutes(app: express.Application, db: PrismaClient) {
    app.use(`/${userResourceDefinition.namePlural}`, createUserRoutes(db));
}

function createUserRoutes(db: PrismaClient) {
    const router = express.Router();
    router.get("/", (req, res) => {
        const paginationParams = paginationParamsSchema.parse(req.query);
        const page = paginationParams.page ?? 0;
        const pageSize = paginationParams.pageSize ?? DEFAULT_PAGE_SIZE;
        return Promise.all([
            db.user.findMany({
                skip: page * pageSize,
                take: pageSize,
            }),
            db.user.count(),
        ]).then(([users, total]) => {
            const totalPages = Math.ceil(total / pageSize);
            res.json({
                data: users,
                pagination: {
                    page,
                    pageSize,
                    total,
                    totalPages,
                    hasNext: page < totalPages - 1,
                    hasPrev: page > 0,
                },
            } satisfies PagenatedResponse<z.infer<typeof userResourceDefinition.readResponseSchema>>);
        });
    });
    router.post("/", (req, res) => {
        res.json({ message: "Hello, world!" });
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