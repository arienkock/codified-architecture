import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import express from "express";
import { AddressInfo } from "net";
import z from "zod";
import { ResourceDefinition } from "../common/resource-definition.js";
import { DEFAULT_PAGE_SIZE } from "../config.js";
import { createCRUDRoutes } from "../server/createCRUDRoutes.js";

describe("createCRUDRoutes", () => {
    const securityContext = { currentUserId: 99 };

    let repo: {
        findMany: jest.Mock<any>;
        count: jest.Mock<any>;
        create: jest.Mock<any>;
        update: jest.Mock<any>;
    };
    let db: { $transaction: jest.Mock<any>; userOrganization?: { findFirst: jest.Mock<any> } };
    let resourceDefinition: ResourceDefinition;

    beforeEach(() => {
        repo = {
            findMany: jest.fn(),
            count: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
        };
        db = {
            $transaction: jest.fn((queries: Promise<any>[]) => Promise.all(queries)) as jest.Mock<any>,
            userOrganization: {
                findFirst: jest.fn().mockResolvedValue(null as any) as jest.Mock<any>,
            },
        };
        const securityFilterGenerator = jest.fn((ctx: any) => ({ ownerId: ctx.currentUserId }));

        resourceDefinition = {
            name: "Widget",
            namePlural: "widgets",
            create: {
                requestBodySchema: z.object({ name: z.string() }).strict(),
                validators: [],
                authorizers: [],
            },
            read: {
                requestParamsSchema: z.object({ id: z.coerce.number().int() }),
                responseSchema: z.object({
                    id: z.number(),
                    name: z.string(),
                    ownerId: z.number(),
                }),
                securityFilterGenerator,
                authorizers: [],
            },
            update: {
                requestBodySchema: z.object({ name: z.string() }).strict(),
                requestParamsSchema: z.object({ id: z.coerce.number().int() }),
                securityFilterGenerator,
                validators: [],
                authorizers: [],
            },
            delete: {
                requestParamsSchema: z.object({ id: z.coerce.number().int() }),
                securityFilterGenerator,
                authorizers: [],
                validators: [],
            },
        };
    });

    const buildApp = () => {
        const app = express();
        app.use(express.json());
        app.use((req, _res, next) => {
            (req as any).securityContext = securityContext;
            next();
        });
        app.use("/widgets", createCRUDRoutes(db as any, repo as any, resourceDefinition));
        return app;
    };

    const requestJson = async (app: express.Application, path: string, init?: any) => {
        const server = app.listen(0);
        try {
            const { port } = server.address() as AddressInfo;
            const res = await fetch(`http://127.0.0.1:${port}${path}`, init);
            const body = await res.json();
            return { status: res.status, body };
        } finally {
            server.close();
        }
    };

    it("returns paginated list with defaults applied", async () => {
        const data = [{ id: 1, name: "Test widget", ownerId: securityContext.currentUserId }];
        repo.findMany.mockResolvedValue(data);
        repo.count.mockResolvedValue(1);

        const res = await requestJson(buildApp(), "/widgets");

        expect(db.$transaction).toHaveBeenCalledTimes(1);
        expect(repo.findMany).toHaveBeenCalledWith({
            skip: 0,
            take: DEFAULT_PAGE_SIZE,
            where: { ownerId: securityContext.currentUserId },
        });
        expect(res.status).toBe(200);
        expect(res.body).toEqual({
            data,
            pagination: {
                page: 0,
                pageSize: DEFAULT_PAGE_SIZE,
                total: 1,
                totalPages: 1,
                hasNext: false,
                hasPrev: false,
            },
        });
    });

    it("rejects invalid create requests with 400", async () => {
        repo.create.mockResolvedValue({
            id: 1,
            name: "Another widget",
            ownerId: securityContext.currentUserId,
        });

        const res = await requestJson(buildApp(), "/widgets", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({}),
        });

        expect(res.status).toBe(400);
        expect(repo.create).not.toHaveBeenCalled();
        expect((res.body as any).message).toBe("Invalid request");
        expect(Array.isArray((res.body as any).errors)).toBe(true);
    });
});

