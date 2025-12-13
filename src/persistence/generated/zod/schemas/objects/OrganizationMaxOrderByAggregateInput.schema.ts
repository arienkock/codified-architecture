import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  name: SortOrderSchema.optional()
}).strict();
export const OrganizationMaxOrderByAggregateInputObjectSchema: z.ZodType<Prisma.OrganizationMaxOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.OrganizationMaxOrderByAggregateInput>;
export const OrganizationMaxOrderByAggregateInputObjectZodSchema = makeSchema();
