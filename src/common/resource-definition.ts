import z from "zod";
import { SecurityContext, SecurityFilterGenerator } from "./security";
import { PrismaClient } from "../persistence/generated/prisma";

export interface ResourceDefinition {
    name: string;
    namePlural: string;
    create?: {
        requestBodySchema: z.ZodSchema;
        requestBodyTransformer?: Transformer;
        validators: Validator[];
        authorizers: Authorizer[];
        postCreateHook?: PostCreateHook;
    };
    read?: {
        requestParamsSchema: z.ZodSchema;
        responseSchema: z.ZodSchema;
        securityFilterGenerator: SecurityFilterGenerator;
        authorizers: Authorizer[];
    };
    update?: {
        requestBodySchema: z.ZodSchema;
        requestParamsSchema: z.ZodSchema;
        securityFilterGenerator: SecurityFilterGenerator;
        validators: Validator[];
        authorizers: Authorizer[];
    };
    delete?: {
        authorizers: Authorizer[];
        requestParamsSchema: z.ZodSchema;
        securityFilterGenerator: SecurityFilterGenerator;
        validators: Validator[];
    };
}

export interface Validator {
    (): void
}

export interface Authorizer {
    (securityContext: SecurityContext, db: PrismaClient, requestBody: any): Promise<void>
}

export interface Transformer {
    (input: any): any
}

export interface PostCreateHook {
    (createdEntity: any, db: PrismaClient, securityContext: SecurityContext): Promise<void>
}

export const IdPathParamSchema = z.object({ id: z.coerce.number().int() });