import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  name: SortOrderSchema.optional()
}).strict();
export const OrganizationMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.OrganizationMinOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.OrganizationMinOrderByAggregateInput>;
export const OrganizationMinOrderByAggregateInputObjectZodSchema = makeSchema();
