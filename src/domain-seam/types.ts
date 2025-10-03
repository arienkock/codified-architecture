import z from "zod";
import { UserResultSchema, UserCreateInputObjectZodSchema } from "../persistence/generated/zod/schemas";

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


