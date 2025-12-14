import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  organizationId: SortOrderSchema.optional(),
  isCurrent: SortOrderSchema.optional(),
  isAdmin: SortOrderSchema.optional()
}).strict();
export const UserOrganizationMaxOrderByAggregateInputObjectSchema: z.ZodType<Prisma.UserOrganizationMaxOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.UserOrganizationMaxOrderByAggregateInput>;
export const UserOrganizationMaxOrderByAggregateInputObjectZodSchema = makeSchema();
