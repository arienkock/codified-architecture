import z from "zod";
import { IdPathParamSchema, ResourceDefinition } from "../../common/resource-definition";
import {
  OrganizationInvitationCreateInputSchema,
  OrganizationInvitationResultSchema,
  OrganizationInvitationUpdateInputSchema,
} from "../../persistence/schemas";
import { SecurityContext } from "../../common/security";
import { PrismaClient } from "../../persistence/generated/prisma";

const internalFields: Record<string, true> = {
  user: true,
  organization: true,
};

const organizationInvitationResourceDefinition: ResourceDefinition = {
  name: "organizationInvitation",
  namePlural: "invitations",
  create: {
    requestBodySchema: OrganizationInvitationCreateInputSchema.omit({
      ...internalFields,
      issuedAt: true, // is not internal, but should be set by DB default
      accepted: true, // is not internal, but should be set by DB default
    }).strict(),
    validators: [],
    authorizers: [
      authenticationRequiredAuthorizer,
      organizationInvitationCreationAuthorizer,
    ],
  },
  read: {
    requestParamsSchema: IdPathParamSchema,
    responseSchema: OrganizationInvitationResultSchema.omit(internalFields),
    securityFilterGenerator,
    referenceDataLoader: loadAdminOrganizationIds,
    authorizers: [
      authenticationRequiredAuthorizer,
      organizationInvitationReadAuthorizer,
    ],
  },
  update: {
    // Only allow changing the "accepted" flag
    requestBodySchema: z.object({
      accepted: OrganizationInvitationUpdateInputSchema.shape.accepted,
    }).strict(),
    requestParamsSchema: IdPathParamSchema,
    securityFilterGenerator,
    referenceDataLoader: loadAdminOrganizationIds,
    validators: [],
    authorizers: [
      authenticationRequiredAuthorizer,
      organizationInvitationUpdateAuthorizer,
    ],
  },
  delete: {
    authorizers: [
      authenticationRequiredAuthorizer,
      organizationInvitationDeletionAuthorizer,
    ],
    requestParamsSchema: IdPathParamSchema,
    securityFilterGenerator,
    referenceDataLoader: loadAdminOrganizationIds,
    validators: [],
  },
};

export default organizationInvitationResourceDefinition;

const readRequestParamsSchema = organizationInvitationResourceDefinition.read!.requestParamsSchema;
function securityFilterGenerator(
  securityContext: SecurityContext,
  enrichedParams: any,
): any {
  if (securityContext.isAdmin) {
    return {};
  }

  if (!securityContext.currentUserId) {
    // If no user ID, return filter that matches nothing
    return {
      id: -1,
    };
  }

  const adminOrganizationIds = enrichedParams.adminOrganizationIds || [];
  const userId = parseInt(securityContext.currentUserId);

  // Build OR conditions: user's own invitations OR invitations for orgs where user is admin
  const conditions: any[] = [
    { userId },
  ];

  if (adminOrganizationIds.length > 0) {
    conditions.push({
      organizationId: { in: adminOrganizationIds },
    });
  }

  return {
    OR: conditions,
  };
}

async function loadAdminOrganizationIds(
  db: PrismaClient,
  _requestParams: any,
  securityContext: SecurityContext,
): Promise<Record<string, any>> {
  // Global admins don't need org ID filtering
  if (securityContext.isAdmin || !securityContext.currentUserId) {
    return { adminOrganizationIds: [] };
  }

  const userOrganizations = await db.userOrganization.findMany({
    where: {
      userId: parseInt(securityContext.currentUserId),
      isAdmin: true,
    },
    select: {
      organizationId: true,
    },
  });

  return {
    adminOrganizationIds: userOrganizations.map((uo) => uo.organizationId),
  };
}

function authenticationRequiredAuthorizer(
  securityContext: SecurityContext,
  _db: PrismaClient,
  _requestParams: any,
): Promise<void> {
  if (!securityContext.currentUserId) {
    throw new Error("Authentication required");
  }
  return Promise.resolve();
}

async function organizationInvitationReadAuthorizer(
  securityContext: SecurityContext,
  db: PrismaClient,
  enrichedParams: { id: number; adminOrganizationIds?: number[] },
): Promise<void> {
  // Global admins can read any invitation
  if (securityContext.isAdmin) {
    return;
  }

  if (!securityContext.currentUserId) {
    throw new Error("Authentication required");
  }

  const invitation = await db.organizationInvitation.findUnique({
    where: { id: enrichedParams.id },
    select: {
      userId: true,
      organizationId: true,
    },
  });

  if (!invitation) {
    // Let the handler surface 404 based on affected row count
    return;
  }

  // Allow the invited user to read their own invitation
  if (invitation.userId === parseInt(securityContext.currentUserId)) {
    return;
  }

  // Check if user is admin of the invitation's organization
  const adminOrganizationIds = enrichedParams.adminOrganizationIds || [];
  if (adminOrganizationIds.includes(invitation.organizationId)) {
    return;
  }

  throw new Error("Not allowed to read this invitation");
}

async function organizationInvitationCreationAuthorizer(
  securityContext: SecurityContext,
  db: PrismaClient,
  requestBody: z.infer<typeof OrganizationInvitationCreateInputSchema>,
): Promise<void> {
  // Global admins can create invitations for any organization
  if (securityContext.isAdmin) {
    return;
  }

  if (!securityContext.currentUserId) {
    throw new Error("Authentication required");
  }

  if (!requestBody || typeof requestBody.organizationId !== "number") {
    throw new Error("Organization ID is required");
  }
  // Check if the user is an admin of the organization
  const userOrganization = await db.userOrganization.findFirst({
    where: {
      userId: parseInt(securityContext.currentUserId),
      organizationId: requestBody.organizationId,
      isAdmin: true,
    },
  });

  if (!userOrganization) {
    throw new Error("Admin access required for this organization");
  }
}

async function organizationInvitationUpdateAuthorizer(
  securityContext: SecurityContext,
  db: PrismaClient,
  enrichedParams: { id: number; adminOrganizationIds?: number[] },
): Promise<void> {
  // Global admins can update any invitation
  if (securityContext.isAdmin) {
    return;
  }

  if (!securityContext.currentUserId) {
    throw new Error("Authentication required");
  }

  const invitation = await db.organizationInvitation.findUnique({
    where: { id: enrichedParams.id },
    select: {
      userId: true,
      organizationId: true,
    },
  });

  if (!invitation) {
    // Let the handler surface 404 based on affected row count
    return;
  }

  // Allow the invited user to update (accept) their own invitation
  if (invitation.userId === parseInt(securityContext.currentUserId)) {
    return;
  }

  // Check if user is admin of the invitation's organization
  const adminOrganizationIds = enrichedParams.adminOrganizationIds || [];
  if (adminOrganizationIds.includes(invitation.organizationId)) {
    return;
  }

  throw new Error("Not allowed to update this invitation");
}

async function organizationInvitationDeletionAuthorizer(
  securityContext: SecurityContext,
  db: PrismaClient,
  enrichedParams: { id: number; adminOrganizationIds?: number[] },
): Promise<void> {
  // Deletions follow similar rules as creation:
  //  - Global admins can delete any invitation
  //  - Org admins can delete invitations for their own orgs
  if (securityContext.isAdmin) {
    return;
  }

  if (!securityContext.currentUserId) {
    throw new Error("Authentication required");
  }

  const invitation = await db.organizationInvitation.findUnique({
    where: { id: enrichedParams.id },
    select: {
      organizationId: true,
    },
  });

  if (!invitation) {
    throw new Error("Invitation not found");
  }

  // Check if user is admin of the invitation's organization
  const adminOrganizationIds = enrichedParams.adminOrganizationIds || [];
  if (!adminOrganizationIds.includes(invitation.organizationId)) {
    throw new Error("Admin access required for this organization");
  }
}


