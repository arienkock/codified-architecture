import z from "zod";
import { ResourceDefinition } from "../../common/resource-definition.js"
import { OrganizationCreateInputObjectZodSchema, OrganizationCreateResultSchema, OrganizationUpdateInputObjectZodSchema } from "../../persistence/generated/zod/schemas/index.js";
import { SecurityContext } from "../../common/security.js";
import { PrismaClient } from "../../persistence/generated/prisma";

const internalFields: Record<string, true> = {
    members: true,
}

const organizationResourceDefinition: ResourceDefinition = {
    name: "organization",
    namePlural: "organizations",
    create: {
        requestBodySchema: OrganizationCreateInputObjectZodSchema.omit(internalFields).strict(),
        validators: [],
        authorizers: [
            authenticationRequiredAuthorizer,
            adminRequiredAuthorizer,
        ],
        postCreateHook: addCreatorAsAdmin,
    },
    read: {
        requestParamsSchema: z.object({ id: z.coerce.number().int() }),
        responseSchema: OrganizationCreateResultSchema.omit(internalFields),
        securityFilterGenerator: securityFilterGenerator,
        authorizers: [
            authenticationRequiredAuthorizer,
        ],
    },
    update: {
        requestBodySchema: OrganizationUpdateInputObjectZodSchema.omit(internalFields).strict().partial(),
        requestParamsSchema: z.object({ id: z.coerce.number().int() }),
        securityFilterGenerator: securityFilterGenerator,
        validators: [],
        authorizers: [
            authenticationRequiredAuthorizer,
            organizationUpdateAuthorizer,
        ],
    },
    delete: {
        authorizers: [
            authenticationRequiredAuthorizer,
        ],
        requestParamsSchema: z.object({ id: z.coerce.number().int() }),
        securityFilterGenerator: securityFilterGenerator,
        validators: [],
    },
}

export default organizationResourceDefinition;

function securityFilterGenerator(securityContext: SecurityContext, requestParams: z.infer<typeof organizationResourceDefinition.read.requestParamsSchema>): any {
    if (securityContext.isAdmin) {
        return {};
    }
    // Filter by user's organizations - works for both collection and single resource endpoints
    // The route handler will add the id filter for single resource endpoints
    if (securityContext.currentUserId) {
        return {
            members: {
                some: {
                    userId: parseInt(securityContext.currentUserId),
                },
            },
        };
    }
    // If no user ID, return filter that matches nothing
    return {
        id: -1, // This will never match
    };
}

function authenticationRequiredAuthorizer(securityContext: SecurityContext, db: PrismaClient, requestParams: any): Promise<void> {
    if (!securityContext.currentUserId) {
        throw new Error('Authentication required');
    }
    return Promise.resolve();
}

function adminRequiredAuthorizer(securityContext: SecurityContext, db: PrismaClient, requestParams: any): Promise<void> {
    if (!securityContext.isAdmin) {
        throw new Error('Admin access required');
    }
    return Promise.resolve();
}

async function organizationUpdateAuthorizer(
    securityContext: SecurityContext,
    db: PrismaClient,
    requestParams: { id: number }
): Promise<void> {
    // Global admins can update any organization
    if (securityContext.isAdmin) {
        return Promise.resolve();
    }
    
    // Check if user is an admin of the specific organization
    if (!securityContext.currentUserId) {
        throw new Error('Authentication required');
    }
    
    const userOrganization = await db.userOrganization.findFirst({
        where: {
            userId: parseInt(securityContext.currentUserId),
            organizationId: requestParams.id,
            isAdmin: true,
        },
    });
    
    if (!userOrganization) {
        throw new Error('Admin access required for this organization');
    }
    
    return Promise.resolve();
}

async function addCreatorAsAdmin(createdOrganization: any, db: any, securityContext: SecurityContext): Promise<void> {
    if (!securityContext.currentUserId) {
        throw new Error('Authentication required');
    }
    await db.userOrganization.create({
        data: {
            userId: parseInt(securityContext.currentUserId),
            organizationId: createdOrganization.id,
            isCurrent: false,
            isAdmin: true,
        },
    });
}

