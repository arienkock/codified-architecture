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
  name: "invitation",
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
    authorizers: [
      authenticationRequiredAuthorizer,
    ],
  },
  update: {
    // Only allow changing the "accepted" flag
    requestBodySchema: z.object({
      accepted: OrganizationInvitationUpdateInputSchema.shape.accepted,
    }).strict(),
    requestParamsSchema: IdPathParamSchema,
    securityFilterGenerator,
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
    validators: [],
  },
};

export default organizationInvitationResourceDefinition;

function securityFilterGenerator(
  securityContext: SecurityContext,
  _requestParams: z.infer<typeof organizationInvitationResourceDefinition.read.requestParamsSchema>,
): any {
  if (securityContext.isAdmin) {
    return {};
  }
  if (securityContext.currentUserId && securityContext.currentOrganizationId) {
    // Org admins can see their own invitations plus all invitations for their current org
    return {
      OR: [
        { userId: parseInt(securityContext.currentUserId) },
        { organizationId: securityContext.currentOrganizationId },
      ],
    };
  }
  if (securityContext.currentUserId) {
    // Regular users only see their own invitations
    return {
      userId: parseInt(securityContext.currentUserId),
    };
  }
  // If no user ID, return filter that matches nothing
  return {
    id: -1,
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
  requestParams: { id: number },
): Promise<void> {
  // Global admins can update any invitation
  if (securityContext.isAdmin) {
    return;
  }

  if (!securityContext.currentUserId) {
    throw new Error("Authentication required");
  }

  const invitation = await db.organizationInvitation.findUnique({
    where: { id: requestParams.id },
  });

  if (!invitation) {
    // Let the handler surface 404 based on affected row count
    return;
  }

  // Allow the invited user to update (accept) their own invitation
  if (invitation.userId === parseInt(securityContext.currentUserId)) {
    return;
  }

  throw new Error("Not allowed to update this invitation");
}

async function organizationInvitationDeletionAuthorizer(
  securityContext: SecurityContext,
  db: PrismaClient,
  requestParams: { id: number },
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
    where: { id: requestParams.id },
  });

  if (!invitation) {
    throw new Error("Invitation not found");
  }

  const userOrganization = await db.userOrganization.findFirst({
    where: {
      userId: parseInt(securityContext.currentUserId),
      organizationId: invitation.organizationId,
      isAdmin: true,
    },
  });

  if (!userOrganization) {
    throw new Error("Admin access required for this organization");
  }
}


