import z from "zod";
import { UserResultSchema, UserCreateInputObjectZodSchema } from "../persistence/generated/zod/schemas";

export const UserCreateRequestSchema = UserCreateInputObjectZodSchema.omit({ hashedPassword: true })

export type UserCreateRequest = z.infer<typeof UserCreateRequestSchema>

export const UserCreateResponseSchema = UserResultSchema.omit({ hashedPassword: true })

export type UserCreateResponse = z.infer<typeof UserCreateResponseSchema>


