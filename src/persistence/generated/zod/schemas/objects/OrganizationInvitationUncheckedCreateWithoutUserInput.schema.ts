import { z } from 'zod';
import type { Prisma } from '../../../prisma';


const makeSchema = () => z.object({
  id: z.number().int().optional(),
  issuedAt: z.coerce.date().optional(),
  accepted: z.boolean().optional(),
  ttlMinutes: z.number().int().optional(),
  organizationId: z.number().int()
}).strict();
export const OrganizationInvitationUncheckedCreateWithoutUserInputObjectSchema: z.ZodType<Prisma.OrganizationInvitationUncheckedCreateWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.OrganizationInvitationUncheckedCreateWithoutUserInput>;
export const OrganizationInvitationUncheckedCreateWithoutUserInputObjectZodSchema = makeSchema();
