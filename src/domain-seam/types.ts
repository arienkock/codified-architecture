import z from "zod";
import { UserResultSchema, UserCreateInputObjectZodSchema } from "../persistence/generated/zod/schemas";
import { wrapUseCaseResponse, ValidationErrorSchema, UseCaseResponseMetaSchema } from "../domain/useCases/types";

export const UserCreateRequestSchema = UserCreateInputObjectZodSchema
    .omit({ hashedPassword: true })
    .extend({
        password: z.string()
            .min(12)
            .meta({
                description: "Plain text password that is hashed before persistence."
            })
    })

export type UserCreateRequest = z.infer<typeof UserCreateRequestSchema>

export const UserCreateResponseSchema = UserResultSchema.omit({ hashedPassword: true })

export type UserCreateResponse = z.infer<typeof UserCreateResponseSchema>

export const UserCreateUseCaseResponseSchema = wrapUseCaseResponse(UserCreateResponseSchema)

export type UserCreateUseCaseResponse = z.infer<typeof UserCreateUseCaseResponseSchema>

// Error response schema for all error cases (validation, domain, server errors)
export const ErrorResponseSchema = z.object({
    meta: z.object({
        success: z.literal(false),
        errors: z.array(ValidationErrorSchema)
    })
});

export type ErrorResponse = z.infer<typeof ErrorResponseSchema>
