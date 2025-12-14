import { z } from 'zod';
import type { Prisma } from '../../../prisma';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  ttlMinutes: z.literal(true).optional(),
  userId: z.literal(true).optional(),
  organizationId: z.literal(true).optional()
}).strict();
export const OrganizationInvitationSumAggregateInputObjectSchema: z.ZodType<Prisma.OrganizationInvitationSumAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.OrganizationInvitationSumAggregateInputType>;
export const OrganizationInvitationSumAggregateInputObjectZodSchema = makeSchema();
