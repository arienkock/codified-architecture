
import { z } from "zod";
import type { AppContext } from "../../AppContext.js";

export type { AppContext };

export interface RequestContext {
    app: AppContext,
}

export interface ValidationError {
    code: string;
    message: string;
    field?: string;
}

export class ValidationResults {
    static OK: ValidationResults
    
    constructor(
        public success: boolean,
        public errors: ValidationError[] = []
    ) {}
}

ValidationResults.OK = new ValidationResults(true, [])

export interface PaginationMetadata {
    total: number,
    page: number,
    pageSize: number
}

export interface UseCaseResponse<T> {
    meta: {
        success: boolean,
        pagination?: PaginationMetadata,
        warnings?: any[],
        errors?: ValidationError[]
    },
    data?: T,
}

// Zod schemas for UseCaseResponse structure
export const PaginationMetadataSchema = z.object({
    total: z.number(),
    page: z.number(),
    pageSize: z.number()
});

export const ValidationErrorSchema = z.object({
    code: z.string(),
    message: z.string(),
    field: z.string().optional()
});

export const UseCaseResponseMetaSchema = z.object({
    success: z.boolean(),
    pagination: PaginationMetadataSchema.optional(),
    warnings: z.array(z.any()).optional(),
    errors: z.array(ValidationErrorSchema).optional()
});

/**
 * Generic wrapper function to wrap any Zod schema with the UseCaseResponse structure.
 * This ensures all use case responses follow the same format with meta and data fields.
 */
export function wrapUseCaseResponse<T extends z.ZodTypeAny>(dataSchema: T) {
    return z.object({
        meta: UseCaseResponseMetaSchema,
        data: dataSchema.optional()
    });
}

export interface UseCase<Req, Res>  {
    parseAndValidateRequest(rc: RequestContext, data: any): [ValidationResults, Req]
    isAuthorized(rc: RequestContext, cur: Req): boolean
    execute(rc: RequestContext, cur: Req): UseCaseResponse<Res>
}
