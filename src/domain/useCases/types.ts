
import { z } from "zod";

export interface AppContext {

}

export interface RequestContext {
    app: AppContext,
}

export class ValidationResults {
    static OK: ValidationResults
    
    constructor(public success: boolean) {}
}

ValidationResults.OK = new ValidationResults(true)

export interface PaginationMetadata {
    total: number,
    page: number,
    pageSize: number
}

export interface UseCaseResponse<T> {
    meta: {
        success: boolean,
        pagination?: PaginationMetadata,
        warnings?: any[]
    },
    data?: T,
}

// Zod schemas for UseCaseResponse structure
export const PaginationMetadataSchema = z.object({
    total: z.number(),
    page: z.number(),
    pageSize: z.number()
});

export const UseCaseResponseMetaSchema = z.object({
    success: z.boolean(),
    pagination: PaginationMetadataSchema.optional(),
    warnings: z.array(z.any()).optional()
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
