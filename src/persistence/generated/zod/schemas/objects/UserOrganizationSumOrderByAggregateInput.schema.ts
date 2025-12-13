import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  organizationId: SortOrderSchema.optional()
}).strict();
export const UserOrganizationSumOrderByAggregateInputObjectSchema: z.ZodType<Prisma.UserOrganizationSumOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.UserOrganizationSumOrderByAggregateInput>;
export const UserOrganizationSumOrderByAggregateInputObjectZodSchema = makeSchema();
