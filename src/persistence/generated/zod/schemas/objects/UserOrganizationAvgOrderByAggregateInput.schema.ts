import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  organizationId: SortOrderSchema.optional()
}).strict();
export const UserOrganizationAvgOrderByAggregateInputObjectSchema: z.ZodType<Prisma.UserOrganizationAvgOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.UserOrganizationAvgOrderByAggregateInput>;
export const UserOrganizationAvgOrderByAggregateInputObjectZodSchema = makeSchema();
