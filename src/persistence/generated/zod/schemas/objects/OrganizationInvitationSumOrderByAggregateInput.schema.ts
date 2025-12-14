import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  ttlMinutes: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  organizationId: SortOrderSchema.optional()
}).strict();
export const OrganizationInvitationSumOrderByAggregateInputObjectSchema: z.ZodType<Prisma.OrganizationInvitationSumOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.OrganizationInvitationSumOrderByAggregateInput>;
export const OrganizationInvitationSumOrderByAggregateInputObjectZodSchema = makeSchema();
