import z from "zod";
import { UserResultSchema, UserCreateInputObjectZodSchema, UserUncheckedUpdateInputObjectZodSchema } from "../persistence/generated/zod/schemas";
import { wrapUseCaseResponse, ValidationErrorSchema, UseCaseResponseMetaSchema } from "../domain/handlers/types";

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

export const UserUpdateRequestSchema = UserUncheckedUpdateInputObjectZodSchema
    .omit({ id: true, hashedPassword: true })
    .extend({
        password: z.string()
            .min(12)
            .optional()
            .meta({
                description: "Plain text password that is hashed before persistence."
            })
    })
    .partial()

export type UserUpdateRequest = z.infer<typeof UserUpdateRequestSchema>

export const UserUpdateResponseSchema = UserResultSchema.omit({ hashedPassword: true })

export type UserUpdateResponse = z.infer<typeof UserUpdateResponseSchema>

export const UserUpdateUseCaseResponseSchema = wrapUseCaseResponse(UserUpdateResponseSchema)

export type UserUpdateUseCaseResponse = z.infer<typeof UserUpdateUseCaseResponseSchema>

// Error response schema for all error cases (validation, domain, server errors)
export const ErrorResponseSchema = z.object({
    meta: z.object({
        success: z.literal(false),
        errors: z.array(ValidationErrorSchema)
    })
});

export type ErrorResponse = z.infer<typeof ErrorResponseSchema>
