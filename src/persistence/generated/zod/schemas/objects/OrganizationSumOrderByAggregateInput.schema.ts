import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional()
}).strict();
export const OrganizationSumOrderByAggregateInputObjectSchema: z.ZodType<Prisma.OrganizationSumOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.OrganizationSumOrderByAggregateInput>;
export const OrganizationSumOrderByAggregateInputObjectZodSchema = makeSchema();
