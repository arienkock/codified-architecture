import { z } from 'zod';
import type { Prisma } from '../../../prisma';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  issuedAt: z.literal(true).optional(),
  accepted: z.literal(true).optional(),
  ttlMinutes: z.literal(true).optional(),
  userId: z.literal(true).optional(),
  organizationId: z.literal(true).optional(),
  _all: z.literal(true).optional()
}).strict();
export const OrganizationInvitationCountAggregateInputObjectSchema: z.ZodType<Prisma.OrganizationInvitationCountAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.OrganizationInvitationCountAggregateInputType>;
export const OrganizationInvitationCountAggregateInputObjectZodSchema = makeSchema();
