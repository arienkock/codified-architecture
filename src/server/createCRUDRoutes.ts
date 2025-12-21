import express from "express";
import z from "zod";
import { paginationParamsSchema, PaginatedResponse } from "../common/pagination";
import { ResourceDefinition } from "../common/resource-definition";
import { AppConfig } from "../config.js";
import { PrismaClient } from "../persistence/generated/prisma";
import { GenericErrorResponse } from "../common/errors";

export function createCRUDRoutes(db: PrismaClient, repo: any, resourceDefinition: ResourceDefinition, config: AppConfig) {
    const router = express.Router();
    
    // Collection GET endpoint (read collection)
    if (resourceDefinition.read) {
        const readOp = resourceDefinition.read;
        router.get("/", async (req, res) => {
            let enrichedParams: any = {};
            if (readOp.referenceDataLoader) {
                const referenceData = await readOp.referenceDataLoader(db, {}, req.securityContext);
                enrichedParams = { ...enrichedParams, ...referenceData };
            }
            try {
                await Promise.all(readOp.authorizers.map((authorizer) => authorizer(req.securityContext, db, enrichedParams)));
            } catch (error) {
                if (error instanceof Error && error.message.includes('required')) {
                    return res.status(401).json({ message: "Unauthorized" } satisfies GenericErrorResponse);
                }
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
                where = readOp.securityFilterGenerator(enhancedSecurityContext, enrichedParams);
            } catch (error) {
                if (error instanceof z.ZodError) {
                    return res.status(400).json({ message: "Invalid request", errors: error.issues } satisfies GenericErrorResponse);
                }
                console.log(error);
                return res.status(400).json({ message: "Invalid request" } satisfies GenericErrorResponse);
            }
            const page = paginationParams.page ?? 0;
            const pageSize = paginationParams.pageSize ?? config.DEFAULT_PAGE_SIZE;
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
                    data: results.map((d: any) => readOp.responseSchema.parse(d)),
                    pagination: {
                        page,
                        pageSize,
                        total,
                        totalPages,
                        hasNext: page < totalPages - 1,
                        hasPrev: page > 0,
                    },
                } satisfies PaginatedResponse<z.infer<typeof readOp.responseSchema>>);
            }).catch((error: any) => {
                console.log(error);
                return res.status(500).json({ message: "Internal server error" } satisfies GenericErrorResponse);
            });
        });
    }
    
    // Collection POST endpoint (create)
    if (resourceDefinition.create) {
        const createOp = resourceDefinition.create;
        router.post("/", async (req, res) => {
            let body: z.infer<typeof createOp.requestBodySchema>;
            try {
                body = createOp.requestBodySchema.parse(req.body);
            } catch (error) {
                if (error instanceof z.ZodError) {
                    return res.status(400).json({ message: "Invalid request", errors: error.issues } satisfies GenericErrorResponse);
                }
                return res.status(400).json({ message: "Invalid request" } satisfies GenericErrorResponse);
            }
            let enrichedParams: any = body;
            if (createOp.referenceDataLoader) {
                const referenceData = await createOp.referenceDataLoader(db, body, req.securityContext);
                enrichedParams = { ...referenceData };
            }
            try {
                await Promise.all(createOp.authorizers.map((authorizer) => authorizer(req.securityContext, db, enrichedParams)));
            } catch (error) {
                if (error instanceof Error && error.message.includes('required')) {
                    return res.status(401).json({ message: "Unauthorized" } satisfies GenericErrorResponse);
                }
                return res.status(401).json({ message: "Unauthorized" } satisfies GenericErrorResponse);
            }
            if (createOp.requestBodyTransformer) {
                body = createOp.requestBodyTransformer(body);
            }
            return db.$transaction(async (tx) => {
                const modelName = resourceDefinition.name.charAt(0).toLowerCase() + resourceDefinition.name.slice(1);
                const txRepo = (tx as any)[modelName];
                const created = await txRepo.create({
                    data: body as any,
                });
                if (createOp.postCreateHook) {
                    await createOp.postCreateHook(created, tx as PrismaClient, req.securityContext);
                }
                return created;
            })
                .then((d: any) => {
                    if (resourceDefinition.read) {
                        res.json(resourceDefinition.read.responseSchema.parse(d));
                    } else {
                        res.json(d);
                    }
                })
                .catch((error: any) => {
                    console.log(error);
                    return res.status(500).json({ message: "Internal server error" } satisfies GenericErrorResponse);
                });
        });
    }
    
    // Single resource GET endpoint (read single)
    if (resourceDefinition.read) {
        const readOp = resourceDefinition.read;
        router.get("/:id", async (req, res) => {
            let requestParams: any;
            let securityFilter: any;
            try {
                requestParams = readOp.requestParamsSchema.parse({ ...req.query, ...req.params });
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
                let enrichedParams = requestParams;
                if (readOp.referenceDataLoader) {
                    const referenceData = await readOp.referenceDataLoader(db, requestParams, enhancedSecurityContext);
                    enrichedParams = { ...requestParams, ...referenceData };
                }
                await Promise.all(readOp.authorizers.map((authorizer) => authorizer(enhancedSecurityContext, db, enrichedParams)));
                securityFilter = readOp.securityFilterGenerator(enhancedSecurityContext, enrichedParams);
            } catch (error) {
                if (error instanceof Error && error.message.includes('required')) {
                    return res.status(401).json({ message: "Unauthorized" } satisfies GenericErrorResponse);
                }
                if (error instanceof z.ZodError) {
                    return res.status(400).json({ message: "Invalid request", errors: error.issues } satisfies GenericErrorResponse);
                }
                return res.status(401).json({ message: "Unauthorized" } satisfies GenericErrorResponse);
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
                    res.json(readOp.responseSchema.parse(d[0]))
                } else {
                    return res.status(404).json({ message: "Not found" } satisfies GenericErrorResponse);
                }
            }).catch((error: any) => {
                console.log(error);
                return res.status(500).json({ message: "Internal server error" } satisfies GenericErrorResponse);
            });
        });
    }
    
    // Single resource PUT endpoint (update)
    if (resourceDefinition.update) {
        const updateOp = resourceDefinition.update;
        router.put("/:id", async (req, res) => {
            let data: z.infer<typeof updateOp.requestBodySchema>;
            let requestParams: any;
            let securityFilter: any;
            try {
                requestParams = updateOp.requestParamsSchema.parse({ ...req.query, ...req.params });
                let enrichedParams = requestParams;
                if (updateOp.referenceDataLoader) {
                    const referenceData = await updateOp.referenceDataLoader(db, requestParams, req.securityContext);
                    enrichedParams = { ...requestParams, ...referenceData };
                }
                await Promise.all(updateOp.authorizers.map((authorizer) => authorizer(req.securityContext, db, enrichedParams)));
                securityFilter = updateOp.securityFilterGenerator(req.securityContext, enrichedParams);
                data = updateOp.requestBodySchema.parse(req.body);
            } catch (error) {
                if (error instanceof Error && error.message.includes('required')) {
                    return res.status(401).json({ message: "Unauthorized" } satisfies GenericErrorResponse);
                }
                if (error instanceof z.ZodError) {
                    return res.status(400).json({ message: "Invalid request", errors: error.issues } satisfies GenericErrorResponse);
                }
                return res.status(401).json({ message: "Unauthorized" } satisfies GenericErrorResponse);
            }
            repo.updateManyAndReturn({
                data: data as any,
                where: {
                    AND: [{
                        id: requestParams.id,
                    }, {
                        ...securityFilter,
                    }]
                },
            }).then((updated: any[]) => {
                if (updated.length > 0) {
                    if (resourceDefinition.read) {
                        res.json(resourceDefinition.read.responseSchema.parse(updated[0]));
                    } else {
                        res.json(updated[0]);
                    }
                } else {
                    return res.status(404).json({ message: "Not found" } satisfies GenericErrorResponse);
                }
            }).catch((error: any) => {
                console.log(error);
                return res.status(500).json({ message: "Internal server error" } satisfies GenericErrorResponse);
            });
        });
    }
    
    // Single resource DELETE endpoint (delete)
    if (resourceDefinition.delete) {
        const deleteOp = resourceDefinition.delete;
        router.delete("/:id", async (req, res) => {
            let requestParams: any;
            let securityFilter: any;
            try {
                requestParams = deleteOp.requestParamsSchema.parse({ ...req.query, ...req.params });
                let enrichedParams = requestParams;
                if (deleteOp.referenceDataLoader) {
                    const referenceData = await deleteOp.referenceDataLoader(db, requestParams, req.securityContext);
                    enrichedParams = { ...requestParams, ...referenceData };
                }
                await Promise.all(deleteOp.authorizers.map((authorizer) => authorizer(req.securityContext, db, enrichedParams)));
                securityFilter = deleteOp.securityFilterGenerator(req.securityContext, enrichedParams);
            } catch (error) {
                if (error instanceof Error && error.message.includes('required')) {
                    return res.status(401).json({ message: "Unauthorized" } satisfies GenericErrorResponse);
                }
                if (error instanceof z.ZodError) {
                    return res.status(400).json({ message: "Invalid request", errors: error.issues } satisfies GenericErrorResponse);
                }
                return res.status(401).json({ message: "Unauthorized" } satisfies GenericErrorResponse);
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
    }
    
    return router;
}
