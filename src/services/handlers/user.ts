import z from "zod";
import { ResourceDefinition } from "../../common/resource-definition.js"
import { UserCreateInputObjectZodSchema, UserUpdateInputObjectZodSchema } from "../../persistence/generated/zod/schemas";
import { UserSelectObjectZodSchema } from "../../persistence/generated/zod/schemas/objects/UserSelect.schema.js";

const internalFields: Record<string, true> = {
    hashedPassword: true,
}

const userResourceDefinition: ResourceDefinition = {
    name: "User",
    namePlural: "Users",
    createRequestBodySchema: UserCreateInputObjectZodSchema.omit(internalFields).extend({ password: z.string() }),
    readResponseSchema: UserSelectObjectZodSchema.omit(internalFields),
    updateRequestBodySchema: UserUpdateInputObjectZodSchema.omit(internalFields).extend({ password: z.string() }),
}

export default userResourceDefinition;