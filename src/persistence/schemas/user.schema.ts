import { z } from "zod";
import type { Prisma, User } from "../generated/prisma/index.js";
import { assertSchema } from "./type-utils.js";

// Result schema - matches fields returned by Prisma
// Includes relation fields so handlers can use .omit() on them
export const UserResultSchema = z.object({
  id: z.number().int(),
  email: z.string(),
  name: z.string().nullable(),
  hashedPassword: z.string(),
  organizations: z.array(z.unknown()).optional(),
  invitations: z.array(z.unknown()).optional(),
});

// Type check: will error if schema doesn't match Prisma User type
assertSchema<User, typeof UserResultSchema>(UserResultSchema, true);

// Create input schema
export const UserCreateInputSchema = z.object({
  email: z.string(),
  name: z.string().nullable().optional(),
  hashedPassword: z.string(),
  organizations: z.unknown().optional(),
  invitations: z.unknown().optional(),
});

// Type check: will error if schema doesn't match Prisma.UserCreateInput
assertSchema<Prisma.UserCreateInput, typeof UserCreateInputSchema>(UserCreateInputSchema, true);

// Update input schema
export const UserUpdateInputSchema = z.object({
  email: z.union([z.string(), z.unknown()]).optional(),
  name: z.union([z.string().nullable(), z.unknown()]).optional(),
  hashedPassword: z.union([z.string(), z.unknown()]).optional(),
  organizations: z.unknown().optional(),
  invitations: z.unknown().optional(),
});

// Type check: will error if schema doesn't match Prisma.UserUpdateInput
assertSchema<Prisma.UserUpdateInput, typeof UserUpdateInputSchema>(UserUpdateInputSchema, true);
