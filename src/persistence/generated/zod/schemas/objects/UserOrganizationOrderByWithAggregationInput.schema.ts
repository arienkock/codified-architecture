import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { UserOrganizationCountOrderByAggregateInputObjectSchema as UserOrganizationCountOrderByAggregateInputObjectSchema } from './UserOrganizationCountOrderByAggregateInput.schema';
import { UserOrganizationAvgOrderByAggregateInputObjectSchema as UserOrganizationAvgOrderByAggregateInputObjectSchema } from './UserOrganizationAvgOrderByAggregateInput.schema';
import { UserOrganizationMaxOrderByAggregateInputObjectSchema as UserOrganizationMaxOrderByAggregateInputObjectSchema } from './UserOrganizationMaxOrderByAggregateInput.schema';
import { UserOrganizationMinOrderByAggregateInputObjectSchema as UserOrganizationMinOrderByAggregateInputObjectSchema } from './UserOrganizationMinOrderByAggregateInput.schema';
import { UserOrganizationSumOrderByAggregateInputObjectSchema as UserOrganizationSumOrderByAggregateInputObjectSchema } from './UserOrganizationSumOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  organizationId: SortOrderSchema.optional(),
  isCurrent: SortOrderSchema.optional(),
  isAdmin: SortOrderSchema.optional(),
  _count: z.lazy(() => UserOrganizationCountOrderByAggregateInputObjectSchema).optional(),
  _avg: z.lazy(() => UserOrganizationAvgOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => UserOrganizationMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => UserOrganizationMinOrderByAggregateInputObjectSchema).optional(),
  _sum: z.lazy(() => UserOrganizationSumOrderByAggregateInputObjectSchema).optional()
}).strict();
export const UserOrganizationOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.UserOrganizationOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.UserOrganizationOrderByWithAggregationInput>;
export const UserOrganizationOrderByWithAggregationInputObjectZodSchema = makeSchema();
