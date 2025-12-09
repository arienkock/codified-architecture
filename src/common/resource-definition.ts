import z from "zod";
import { SecurityFilterGenerator } from "./security";

export interface ResourceDefinition {
    name: string;
    namePlural: string;
    create: {
        requestBodySchema: z.ZodSchema;
        requestBodyTransformer?: Transformer;
        validators: Validator[];
        authorizers: Authorizer[];
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
        securityFilterGenerator: SecurityFilterGenerator;
        validators: Validator[];
    };
}

export interface Validator {
    (): void
}

export interface Authorizer {
    (): void
}

export interface Transformer {
    (input: any): any
}