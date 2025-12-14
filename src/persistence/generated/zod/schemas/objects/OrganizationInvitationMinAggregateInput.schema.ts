import { z } from 'zod';
import type { Prisma } from '../../../prisma';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  issuedAt: z.literal(true).optional(),
  accepted: z.literal(true).optional(),
  ttlMinutes: z.literal(true).optional(),
  userId: z.literal(true).optional(),
  organizationId: z.literal(true).optional()
}).strict();
export const OrganizationInvitationMinAggregateInputObjectSchema: z.ZodType<Prisma.OrganizationInvitationMinAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.OrganizationInvitationMinAggregateInputType>;
export const OrganizationInvitationMinAggregateInputObjectZodSchema = makeSchema();
