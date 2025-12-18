import z from "zod";
import { ResourceDefinition, IdPathParamSchema } from "../../common/resource-definition.js"
import { UserCreateInputSchema, UserResultSchema, UserUpdateInputSchema } from "../../persistence/schemas/index.js";
import bcrypt from "bcrypt";
import { SecurityContext } from "../../common/security.js";
import { PrismaClient } from "../../persistence/generated/prisma/index.js";

const internalFields: Record<string, true> = {
    hashedPassword: true,
    organizations: true,
}

const userResourceDefinition: ResourceDefinition = {
    name: "user",
    namePlural: "users",
    create: {
        requestBodySchema: UserCreateInputSchema.omit(internalFields).extend({ password: z.string() }).strict(),
        requestBodyTransformer: hashPasswordTransformer,
        validators: [],
        authorizers: [],
        postCreateHook: createPersonalOrganization,
    },
    read: {
        requestParamsSchema: IdPathParamSchema,
        responseSchema: UserResultSchema.omit(internalFields),
        securityFilterGenerator: securityFilterGenerator,
        authorizers: [
            authenticationRequiredAuthorizer,
        ],
    },
    update: {
        requestBodySchema: UserUpdateInputSchema.omit(internalFields).extend({ password: z.string() }).strict().partial(),
        requestParamsSchema: IdPathParamSchema,
        securityFilterGenerator: securityFilterGenerator,
        validators: [],
        authorizers: [
            authenticationRequiredAuthorizer,
        ],
    },
    delete: {
        authorizers: [
            authenticationRequiredAuthorizer,
        ],
        requestParamsSchema: IdPathParamSchema,
        securityFilterGenerator: securityFilterGenerator,
        validators: [],
    },
}

export default userResourceDefinition;

function hashPasswordTransformer(input: any): z.infer<typeof UserCreateInputSchema> {
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
    // For collection endpoint (no id in requestParams), filter by current organization
    const params = requestParams as { id?: number };
    if (!params.id && securityContext.currentOrganizationId) {
        return {
            organizations: {
                some: {
                    organizationId: securityContext.currentOrganizationId,
                },
            },
        };
    }
    // For single resource endpoint, still filter by user ID
    return {
        id: securityContext.currentUserId && parseInt(securityContext.currentUserId),
    };
}

function authenticationRequiredAuthorizer(securityContext: SecurityContext, db: PrismaClient, requestParams: any): Promise<void> {
    if (!securityContext.currentUserId) {
        throw new Error('Authentication required');
    }
    return Promise.resolve();
}

async function createPersonalOrganization(createdUser: any, db: PrismaClient, securityContext: SecurityContext): Promise<void> {
    const organizationName = createdUser.name ? `${createdUser.name}'s Personal` : 'Personal';
    const organization = await db.organization.create({
        data: {
            name: organizationName,
        },
    });
    await db.userOrganization.create({
        data: {
            userId: createdUser.id,
            organizationId: organization.id,
            isCurrent: true,
            isAdmin: true,
        },
    });
}