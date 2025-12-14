import { z } from 'zod';
import type { Prisma } from '../../../prisma';


const makeSchema = () => z.object({
  id: z.number().int().optional(),
  issuedAt: z.coerce.date().optional(),
  accepted: z.boolean().optional(),
  ttlMinutes: z.number().int().optional(),
  organizationId: z.number().int()
}).strict();
export const OrganizationInvitationCreateManyUserInputObjectSchema: z.ZodType<Prisma.OrganizationInvitationCreateManyUserInput> = makeSchema() as unknown as z.ZodType<Prisma.OrganizationInvitationCreateManyUserInput>;
export const OrganizationInvitationCreateManyUserInputObjectZodSchema = makeSchema();
