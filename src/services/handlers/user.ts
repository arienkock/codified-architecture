import z from "zod";
import { ResourceDefinition } from "../../common/resource-definition.js"
import { UserCreateInputObjectZodSchema, UserCreateResultSchema, UserUpdateInputObjectZodSchema } from "../../persistence/generated/zod/schemas/index.js";
import bcrypt from "bcrypt";
import { SecurityContext } from "../../common/security.js";

const internalFields: Record<string, true> = {
    hashedPassword: true,
}

const userResourceDefinition: ResourceDefinition = {
    name: "User",
    namePlural: "Users",
    create: {
        requestBodySchema: UserCreateInputObjectZodSchema.omit(internalFields).extend({ password: z.string() }).strict(),
        requestBodyTransformer: hashPasswordTransformer,
        validators: [],
        authorizers: [],
    },
    read: {
        responseSchema: UserCreateResultSchema.omit(internalFields),
        requestParamsSchema: z.object({ id: z.coerce.number().int() }),
        securityFilterGenerator: securityFilterGenerator,
        authorizers: [],
    },
    update: {
        requestBodySchema: UserUpdateInputObjectZodSchema.omit(internalFields).extend({ password: z.string() }).strict(),
        validators: [],
        authorizers: [],
    },
    delete: {
        authorizers: [],
        validators: [],
    },
}

export default userResourceDefinition;

function hashPasswordTransformer(input: any): z.infer<typeof UserCreateInputObjectZodSchema> {
    const result = {
        ...input,
        hashedPassword: bcrypt.hashSync(input.password, 10),
    };
    delete result.password;
    return result;
}

function securityFilterGenerator(securityContext: SecurityContext, requestParams: z.infer<typeof userResourceDefinition.read.requestParamsSchema>): any {
    if (securityContext.isAdmin) {
        return {};
    }
    if (!securityContext.currentUserId) {
        return {};
    }
    return {
        id: securityContext.currentUserId,
    };
}