import { z } from 'zod';
import type { Prisma } from '../../../prisma';


const makeSchema = () => z.object({
  id: z.number().int().optional(),
  issuedAt: z.coerce.date().optional(),
  accepted: z.boolean().optional(),
  ttlMinutes: z.number().int().optional(),
  userId: z.number().int(),
  organizationId: z.number().int()
}).strict();
export const OrganizationInvitationCreateManyInputObjectSchema: z.ZodType<Prisma.OrganizationInvitationCreateManyInput> = makeSchema() as unknown as z.ZodType<Prisma.OrganizationInvitationCreateManyInput>;
export const OrganizationInvitationCreateManyInputObjectZodSchema = makeSchema();
