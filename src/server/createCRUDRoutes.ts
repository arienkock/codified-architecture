import express from "express";
import z from "zod";
import { paginationParamsSchema, PaginatedResponse } from "../common/pagination";
import { ResourceDefinition } from "../common/resource-definition";
import { DEFAULT_PAGE_SIZE } from "../config";
import { PrismaClient } from "../persistence/generated/prisma";
import { GenericErrorResponse } from "../common/errors";

export function createCRUDRoutes(db: PrismaClient, repo: any, resourceDefinition: ResourceDefinition) {
    const router = express.Router();
    router.get("/", async (req, res) => {
        try {
            await Promise.all(resourceDefinition.read.authorizers.map((authorizer) => authorizer(req.securityContext)));
        } catch (error) {
            return res.status(401).json({ message: "Unauthorized" } satisfies GenericErrorResponse);
        }
        let paginationParams: { page?: number | undefined; pageSize?: number | undefined };
        let where: any;
        try {
            paginationParams = paginationParamsSchema.parse(req.query);
            // Fetch current organization ID for the user if authenticated
            let enhancedSecurityContext = { ...req.securityContext };
            if (req.securityContext.currentUserId && !req.securityContext.isAdmin) {
                const currentOrg = await db.userOrganization.findFirst({
                    where: {
                        userId: parseInt(req.securityContext.currentUserId),
                        isCurrent: true,
                    },
                    select: {
                        organizationId: true,
                    },
                });
                if (currentOrg) {
                    enhancedSecurityContext.currentOrganizationId = currentOrg.organizationId;
                }
            }
            where = resourceDefinition.read.securityFilterGenerator(enhancedSecurityContext, {} as any);
        } catch (error) {
            if (error instanceof z.ZodError) {
                return res.status(400).json({ message: "Invalid request", errors: error.issues } satisfies GenericErrorResponse);
            }
            console.log(error);
            return res.status(400).json({ message: "Invalid request" } satisfies GenericErrorResponse);
        }
        const page = paginationParams.page ?? 0;
        const pageSize = paginationParams.pageSize ?? DEFAULT_PAGE_SIZE;
        return db.$transaction([
            repo.findMany({
                skip: page * pageSize,
                take: pageSize,
                where,
            }),
            repo.count({ where }),
        ]).then(([results, total]) => {
            const totalPages = Math.ceil(total / pageSize);
            res.json({
                data: results.map((d: any) => resourceDefinition.read.responseSchema.parse(d)),
                pagination: {
                    page,
                    pageSize,
                    total,
                    totalPages,
                    hasNext: page < totalPages - 1,
                    hasPrev: page > 0,
                },
            } satisfies PaginatedResponse<z.infer<typeof resourceDefinition.read.responseSchema>>);
        }).catch((error: any) => {
            console.log(error);
            return res.status(500).json({ message: "Internal server error" } satisfies GenericErrorResponse);
        });
    });
    router.post("/", async (req, res) => {
        try {
            await Promise.all(resourceDefinition.create.authorizers.map((authorizer) => authorizer(req.securityContext)));
        } catch (error) {
            return res.status(401).json({ message: "Unauthorized" } satisfies GenericErrorResponse);
        }
        let body: z.infer<typeof resourceDefinition.create.requestBodySchema>;
        try {
            body = resourceDefinition.create.requestBodySchema.parse(req.body);
        } catch (error) {
            if (error instanceof z.ZodError) {
                return res.status(400).json({ message: "Invalid request", errors: error.issues } satisfies GenericErrorResponse);
            }
            return res.status(400).json({ message: "Invalid request" } satisfies GenericErrorResponse);
        }
        if (resourceDefinition.create.requestBodyTransformer) {
            body = resourceDefinition.create.requestBodyTransformer(body);
        }
        return db.$transaction(async (tx) => {
            const modelName = resourceDefinition.name.charAt(0).toLowerCase() + resourceDefinition.name.slice(1);
            const txRepo = (tx as any)[modelName];
            const created = await txRepo.create({
                data: body as any,
            });
            if (resourceDefinition.create.postCreateHook) {
                await resourceDefinition.create.postCreateHook(created, tx, req.securityContext);
            }
            return created;
        })
            .then((d: any) => res.json(resourceDefinition.read.responseSchema.parse(d)))
            .catch((error: any) => {
                console.log(error);
                return res.status(500).json({ message: "Internal server error" } satisfies GenericErrorResponse);
            });
    });
    router.get("/:id", async (req, res) => {
        try {
            await Promise.all(resourceDefinition.read.authorizers.map((authorizer) => authorizer(req.securityContext)));
        } catch (error) {
            return res.status(401).json({ message: "Unauthorized" } satisfies GenericErrorResponse);
        }
        let requestParams: any;
        let securityFilter: any;
        try {
            requestParams = resourceDefinition.read.requestParamsSchema.parse({ ...req.query, ...req.params });
            securityFilter = resourceDefinition.read.securityFilterGenerator(req.securityContext, requestParams);
        } catch (error) {
            if (error instanceof z.ZodError) {
                return res.status(400).json({ message: "Invalid request", errors: error.issues } satisfies GenericErrorResponse);
            }
            return res.status(400).json({ message: "Invalid request" } satisfies GenericErrorResponse);
        }
        repo.findMany({
            where: {
                AND: [{
                    id: requestParams.id,
                }, {
                    ...securityFilter,
                }]
            },
        }).then((d: any) => {
            if (d.length > 0) {
                res.json(resourceDefinition.read.responseSchema.parse(d[0]))
            } else {
                return res.status(404).json({ message: "Not found" } satisfies GenericErrorResponse);
            }
        }).catch((error: any) => {
            console.log(error);
            return res.status(500).json({ message: "Internal server error" } satisfies GenericErrorResponse);
        });
    });
    router.put("/:id", async (req, res) => {
        try {
            await Promise.all(resourceDefinition.update.authorizers.map((authorizer) => authorizer(req.securityContext)));
        } catch (error) {
            return res.status(401).json({ message: "Unauthorized" } satisfies GenericErrorResponse);
        }

        let data: z.infer<typeof resourceDefinition.update.requestBodySchema>;
        let requestParams: any;
        let securityFilter: any;
        try {
            requestParams = resourceDefinition.update.requestParamsSchema.parse({ ...req.query, ...req.params });
            securityFilter = resourceDefinition.update.securityFilterGenerator(req.securityContext, {} as any);
            data = resourceDefinition.update.requestBodySchema.parse(req.body);
        } catch (error) {
            if (error instanceof z.ZodError) {
                return res.status(400).json({ message: "Invalid request", errors: error.issues } satisfies GenericErrorResponse);
            }
            return res.status(400).json({ message: "Invalid request" } satisfies GenericErrorResponse);
        }
        repo.update({
            data: data as any,
            where: {
                id: requestParams.id,
                ...securityFilter,
            },
        }).then((d: any) => {
            if (d) {
                res.json(resourceDefinition.read.responseSchema.parse(d))
            } else {
                return res.status(404).json({ message: "Not found" } satisfies GenericErrorResponse);
            }
        }).catch((error: any) => {
            console.log(error);
            return res.status(500).json({ message: "Internal server error" } satisfies GenericErrorResponse);
        });
    });
    router.delete("/:id", async (req, res) => {
        try {
            await Promise.all(resourceDefinition.delete.authorizers.map((authorizer) => authorizer(req.securityContext)));
        } catch (error) {
            return res.status(401).json({ message: "Unauthorized" } satisfies GenericErrorResponse);
        }
        let requestParams: any;
        let securityFilter: any;
        try {
            requestParams = resourceDefinition.delete.requestParamsSchema.parse({ ...req.query, ...req.params });
            securityFilter = resourceDefinition.delete.securityFilterGenerator(req.securityContext, {} as any);
        } catch (error) {
            if (error instanceof z.ZodError) {
                return res.status(400).json({ message: "Invalid request", errors: error.issues } satisfies GenericErrorResponse);
            }
            return res.status(400).json({ message: "Invalid request" } satisfies GenericErrorResponse);
        }
        repo.deleteMany({
            where: {
                AND: [{
                    id: requestParams.id,
                }, {
                    ...securityFilter,
                }]
            },
        }).then((d: any) => {
            if (d.count > 0) {
                res.json({ message: "Deleted" });
            } else {
                return res.status(404).json({ message: "Not found" } satisfies GenericErrorResponse);
            }
    }).catch((error: any) => {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" } satisfies GenericErrorResponse);
    });
    });
    return router;
}
