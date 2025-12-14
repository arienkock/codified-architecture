import z from "zod";
import { createDocument, ZodOpenApiOperationObject, ZodOpenApiPathItemObject } from "zod-openapi";
import { ResourceDefinition } from "../common/resource-definition.js";
import { createPaginatedResponseSchema, paginationParamsSchema } from "../common/pagination.js";

import userResourceDefinition from "../services/handlers/user.js";

const document: ReturnType<typeof createDocument> = createDocument({
    openapi: "3.0.0",
    info: {
        title: "Codified Architecture",
        version: "1.0.0",
    },
    paths: {
        [`/${userResourceDefinition.namePlural}`]: CollectionResourcePaths(userResourceDefinition),
        [`/${userResourceDefinition.namePlural}/{id}`]: SingleResourcePaths(userResourceDefinition),
    },
});


function CollectionResourcePaths(resourceDefinition: ResourceDefinition): ZodOpenApiPathItemObject {
    return {
        post: CreateResourcePath(resourceDefinition),
        get: ReadCollectionResourcePath(resourceDefinition),
    }
}

function SingleResourcePaths(resourceDefinition: ResourceDefinition): ZodOpenApiPathItemObject {
    return {
        get: ReadResourcePath(resourceDefinition),
        put: UpdateResourcePath(resourceDefinition),
        delete: DeleteResourcePath(resourceDefinition),
    }
}

function ReadResourcePath(resourceDefinition: ResourceDefinition): ZodOpenApiOperationObject {
    return {
        summary: `Get a ${resourceDefinition.name} by ID`,
        requestParams: {
            path: resourceDefinition.read.requestParamsSchema as z.ZodObject<any>,
        },
        responses: {
            200: {
                description: "OK",
                content: {
                    "application/json": {
                        schema: resourceDefinition.read.responseSchema,
                    }
                }
            }
        }
    } satisfies ZodOpenApiOperationObject;
}

function UpdateResourcePath(resourceDefinition: ResourceDefinition): ZodOpenApiOperationObject {
    return {
        summary: `Update a ${resourceDefinition.name} by ID`,
        requestParams: {
            path: resourceDefinition.update.requestParamsSchema as z.ZodObject<any>,
        },
        requestBody: {
            content: {
                "application/json": {
                    schema: resourceDefinition.update.requestBodySchema,
                }
            }
        },
        responses: {
            200: {
                description: "OK",
                content: {
                    "application/json": {
                        schema: resourceDefinition.read.responseSchema,
                    }
                }
            }
        }
    } satisfies ZodOpenApiOperationObject;
}

function DeleteResourcePath(resourceDefinition: ResourceDefinition): ZodOpenApiOperationObject {
    return {
        summary: `Delete a ${resourceDefinition.name} by ID`,
        requestParams: {
            path: resourceDefinition.delete.requestParamsSchema as z.ZodObject<any>,
        },
        responses: {
            200: {
                description: "OK",
                content: {
                    "application/json": {
                        schema: resourceDefinition.read.responseSchema,
                    }
                }
            }
        }
    } satisfies ZodOpenApiOperationObject;
}

function CreateResourcePath(resourceDefinition: ResourceDefinition): ZodOpenApiOperationObject {
    return {
        summary: `Create a new ${resourceDefinition.name}`,
        requestBody: {
            content: {
                "application/json": {
                    schema: resourceDefinition.create.requestBodySchema,
                }
            }
        },
        responses: {
            201: {
                description: "Created",
                content: {
                    "application/json": {
                        schema: resourceDefinition.read.responseSchema,
                    }
                }
            }
        }
    } satisfies ZodOpenApiOperationObject;
}

function ReadCollectionResourcePath(resourceDefinition: ResourceDefinition): ZodOpenApiOperationObject {
    return {
        summary: `Get all ${resourceDefinition.namePlural}`,
        requestParams: {
            query: paginationParamsSchema,
        },
        responses: {
            200: {
                description: "OK",
                content: {
                    "application/json": {
                        schema: createPaginatedResponseSchema(resourceDefinition.read.responseSchema),
                    }
                }
            }
        }
    } satisfies ZodOpenApiOperationObject;
}

export default document;
