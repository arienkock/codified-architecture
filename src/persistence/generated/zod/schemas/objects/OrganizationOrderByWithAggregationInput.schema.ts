import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { OrganizationCountOrderByAggregateInputObjectSchema as OrganizationCountOrderByAggregateInputObjectSchema } from './OrganizationCountOrderByAggregateInput.schema';
import { OrganizationAvgOrderByAggregateInputObjectSchema as OrganizationAvgOrderByAggregateInputObjectSchema } from './OrganizationAvgOrderByAggregateInput.schema';
import { OrganizationMaxOrderByAggregateInputObjectSchema as OrganizationMaxOrderByAggregateInputObjectSchema } from './OrganizationMaxOrderByAggregateInput.schema';
import { OrganizationMinOrderByAggregateInputObjectSchema as OrganizationMinOrderByAggregateInputObjectSchema } from './OrganizationMinOrderByAggregateInput.schema';
import { OrganizationSumOrderByAggregateInputObjectSchema as OrganizationSumOrderByAggregateInputObjectSchema } from './OrganizationSumOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  _count: z.lazy(() => OrganizationCountOrderByAggregateInputObjectSchema).optional(),
  _avg: z.lazy(() => OrganizationAvgOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => OrganizationMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => OrganizationMinOrderByAggregateInputObjectSchema).optional(),
  _sum: z.lazy(() => OrganizationSumOrderByAggregateInputObjectSchema).optional()
}).strict();
export const OrganizationOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.OrganizationOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.OrganizationOrderByWithAggregationInput>;
export const OrganizationOrderByWithAggregationInputObjectZodSchema = makeSchema();
