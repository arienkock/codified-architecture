import z from "zod";

export interface ResourceDefinition {
    name: string;
    namePlural: string;
    createRequestBodySchema: z.ZodSchema;
    readResponseSchema: z.ZodSchema;
    updateRequestBodySchema: z.ZodSchema;
}