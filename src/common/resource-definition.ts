import z from "zod";
import { SecurityContext, SecurityFilterGenerator } from "./security";
import { PrismaClient } from "../persistence/generated/prisma";

export interface ResourceDefinition {
    name: string;
    namePlural: string;
    isSynthetic?: boolean; // If true, skip database entity creation
    create?: {
        requestBodySchema: z.ZodSchema;
        requestBodyTransformer?: Transformer;
        validators: Validator[];
        authorizers: Authorizer[];
        postCreateHook?: PostCreateHook;
        referenceDataLoader?: ReferenceDataLoader;
    };
    read?: {
        requestParamsSchema: z.ZodSchema;
        responseSchema: z.ZodSchema;
        securityFilterGenerator: SecurityFilterGenerator;
        authorizers: Authorizer[];
        referenceDataLoader?: ReferenceDataLoader;
    };
    update?: {
        requestBodySchema: z.ZodSchema;
        requestParamsSchema: z.ZodSchema;
        securityFilterGenerator: SecurityFilterGenerator;
        validators: Validator[];
        authorizers: Authorizer[];
        referenceDataLoader?: ReferenceDataLoader;
    };
    delete?: {
        authorizers: Authorizer[];
        requestParamsSchema: z.ZodSchema;
        securityFilterGenerator: SecurityFilterGenerator;
        validators: Validator[];
        referenceDataLoader?: ReferenceDataLoader;
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
    (createdEntity: any, db: PrismaClient, securityContext: SecurityContext, res?: any): Promise<void>
}

export interface ReferenceDataLoader {
    (db: PrismaClient, requestParams: any, securityContext: SecurityContext): Promise<Record<string, any>>
}

export const IdPathParamSchema = z.object({ id: z.coerce.number().int() });