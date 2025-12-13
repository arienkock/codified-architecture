import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  name: SortOrderSchema.optional()
}).strict();
export const OrganizationCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.OrganizationCountOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.OrganizationCountOrderByAggregateInput>;
export const OrganizationCountOrderByAggregateInputObjectZodSchema = makeSchema();
