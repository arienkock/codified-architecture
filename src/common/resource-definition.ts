import z from "zod";
import { SecurityContext, SecurityFilterGenerator } from "./security";
import { PrismaClient } from "../persistence/generated/prisma";

export type PrismaTransactionClient = Omit<PrismaClient, "$connect" | "$disconnect" | "$on" | "$transaction" | "$extends">;

export interface ResourceDefinition {
    name: string;
    namePlural: string;
    create: {
        requestBodySchema: z.ZodSchema;
        requestBodyTransformer?: Transformer;
        validators: Validator[];
        authorizers: Authorizer[];
        postCreateHook?: PostCreateHook;
    };
    read: {
        requestParamsSchema: z.ZodSchema;
        responseSchema: z.ZodSchema;
        securityFilterGenerator: SecurityFilterGenerator;
        authorizers: Authorizer[];
    };
    update: {
        requestBodySchema: z.ZodSchema;
        requestParamsSchema: z.ZodSchema;
        securityFilterGenerator: SecurityFilterGenerator;
        validators: Validator[];
        authorizers: Authorizer[];
    };
    delete: {
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
    (securityContext: SecurityContext, db: PrismaClient, requestParams: any): Promise<void>
}

export interface Transformer {
    (input: any): any
}

export interface PostCreateHook {
    (createdEntity: any, db: PrismaTransactionClient, securityContext: SecurityContext): Promise<void>
}