import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional()
}).strict();
export const OrganizationAvgOrderByAggregateInputObjectSchema: z.ZodType<Prisma.OrganizationAvgOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.OrganizationAvgOrderByAggregateInput>;
export const OrganizationAvgOrderByAggregateInputObjectZodSchema = makeSchema();
