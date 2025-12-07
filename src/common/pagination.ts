import z from "zod";

export const paginationSchema = z.object({
    page: z.number(),
    pageSize: z.number(),
    total: z.number(),
    totalPages: z.number(),
    hasNext: z.boolean(),
    hasPrev: z.boolean(),
});

export function createPagenatedResponseSchema(schema: z.ZodSchema): z.ZodSchema {
    return z.object({
        data: z.array(schema),
        pagination: paginationSchema,
    })
}

export type PagenatedResponse<T> = {
    data: T[];
    pagination: z.infer<typeof paginationSchema>;
}

export const paginationParamsSchema = z.object({
    page: z.number().optional(),
    pageSize: z.number().optional(),
});