import { z } from "zod";
import type { Prisma, OrganizationInvitation } from "../generated/prisma/index.js";
import { assertSchema } from "./type-utils.js";

// Result schema - matches fields returned by Prisma
// Includes relation fields so handlers can use .omit() on them
export const OrganizationInvitationResultSchema = z.object({
  id: z.number().int(),
  issuedAt: z.date(),
  accepted: z.boolean(),
  ttlMinutes: z.number().int(),
  userId: z.number().int(),
  organizationId: z.number().int(),
  user: z.unknown().optional(),
  organization: z.unknown().optional(),
});

// Type check: will error if schema doesn't match Prisma OrganizationInvitation type
assertSchema<OrganizationInvitation, typeof OrganizationInvitationResultSchema>(OrganizationInvitationResultSchema, true);

// Create input schema
export const OrganizationInvitationCreateInputSchema = z.object({
  issuedAt: z.date().optional(),
  accepted: z.boolean().optional(),
  ttlMinutes: z.number().int().optional(),
  userId: z.number().int(),
  organizationId: z.number().int(),
  user: z.unknown().optional(),
  organization: z.unknown().optional(),
});

// Type check: will error if schema doesn't match Prisma.OrganizationInvitationCreateInput
assertSchema<Prisma.OrganizationInvitationCreateInput, typeof OrganizationInvitationCreateInputSchema>(OrganizationInvitationCreateInputSchema, true);

// Update input schema
export const OrganizationInvitationUpdateInputSchema = z.object({
  issuedAt: z.union([z.date(), z.unknown()]).optional(),
  accepted: z.union([z.boolean(), z.unknown()]).optional(),
  ttlMinutes: z.union([z.number().int(), z.unknown()]).optional(),
  userId: z.union([z.number().int(), z.unknown()]).optional(),
  organizationId: z.union([z.number().int(), z.unknown()]).optional(),
  user: z.unknown().optional(),
  organization: z.unknown().optional(),
});

// Type check: will error if schema doesn't match Prisma.OrganizationInvitationUpdateInput
assertSchema<Prisma.OrganizationInvitationUpdateInput, typeof OrganizationInvitationUpdateInputSchema>(OrganizationInvitationUpdateInputSchema, true);


