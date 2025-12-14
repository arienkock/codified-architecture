import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  issuedAt: SortOrderSchema.optional(),
  accepted: SortOrderSchema.optional(),
  ttlMinutes: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  organizationId: SortOrderSchema.optional()
}).strict();
export const OrganizationInvitationCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.OrganizationInvitationCountOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.OrganizationInvitationCountOrderByAggregateInput>;
export const OrganizationInvitationCountOrderByAggregateInputObjectZodSchema = makeSchema();
