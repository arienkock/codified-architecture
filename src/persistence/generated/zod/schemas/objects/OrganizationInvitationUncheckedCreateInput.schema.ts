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
export const OrganizationInvitationUncheckedCreateInputObjectSchema: z.ZodType<Prisma.OrganizationInvitationUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.OrganizationInvitationUncheckedCreateInput>;
export const OrganizationInvitationUncheckedCreateInputObjectZodSchema = makeSchema();
