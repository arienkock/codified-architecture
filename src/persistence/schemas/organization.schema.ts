import { z } from "zod";
import type { Prisma, Organization } from "../generated/prisma/index.js";
import { assertSchema } from "./type-utils.js";

// Result schema - matches fields returned by Prisma
// Includes relation fields so handlers can use .omit() on them
export const OrganizationResultSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  members: z.array(z.unknown()).optional(),
  invitations: z.array(z.unknown()).optional(),
});

// Type check: will error if schema doesn't match Prisma Organization type
assertSchema<Organization, typeof OrganizationResultSchema>(OrganizationResultSchema, true);

// Create input schema
export const OrganizationCreateInputSchema = z.object({
  name: z.string(),
  members: z.unknown().optional(),
  invitations: z.unknown().optional(),
});

// Type check: will error if schema doesn't match Prisma.OrganizationCreateInput
assertSchema<Prisma.OrganizationCreateInput, typeof OrganizationCreateInputSchema>(OrganizationCreateInputSchema, true);

// Update input schema
export const OrganizationUpdateInputSchema = z.object({
  name: z.union([z.string(), z.unknown()]).optional(),
  members: z.unknown().optional(),
  invitations: z.unknown().optional(),
});

// Type check: will error if schema doesn't match Prisma.OrganizationUpdateInput
assertSchema<Prisma.OrganizationUpdateInput, typeof OrganizationUpdateInputSchema>(OrganizationUpdateInputSchema, true);
