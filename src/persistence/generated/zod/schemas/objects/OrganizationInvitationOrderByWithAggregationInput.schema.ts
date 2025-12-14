import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { OrganizationInvitationCountOrderByAggregateInputObjectSchema as OrganizationInvitationCountOrderByAggregateInputObjectSchema } from './OrganizationInvitationCountOrderByAggregateInput.schema';
import { OrganizationInvitationAvgOrderByAggregateInputObjectSchema as OrganizationInvitationAvgOrderByAggregateInputObjectSchema } from './OrganizationInvitationAvgOrderByAggregateInput.schema';
import { OrganizationInvitationMaxOrderByAggregateInputObjectSchema as OrganizationInvitationMaxOrderByAggregateInputObjectSchema } from './OrganizationInvitationMaxOrderByAggregateInput.schema';
import { OrganizationInvitationMinOrderByAggregateInputObjectSchema as OrganizationInvitationMinOrderByAggregateInputObjectSchema } from './OrganizationInvitationMinOrderByAggregateInput.schema';
import { OrganizationInvitationSumOrderByAggregateInputObjectSchema as OrganizationInvitationSumOrderByAggregateInputObjectSchema } from './OrganizationInvitationSumOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  issuedAt: SortOrderSchema.optional(),
  accepted: SortOrderSchema.optional(),
  ttlMinutes: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  organizationId: SortOrderSchema.optional(),
  _count: z.lazy(() => OrganizationInvitationCountOrderByAggregateInputObjectSchema).optional(),
  _avg: z.lazy(() => OrganizationInvitationAvgOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => OrganizationInvitationMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => OrganizationInvitationMinOrderByAggregateInputObjectSchema).optional(),
  _sum: z.lazy(() => OrganizationInvitationSumOrderByAggregateInputObjectSchema).optional()
}).strict();
export const OrganizationInvitationOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.OrganizationInvitationOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.OrganizationInvitationOrderByWithAggregationInput>;
export const OrganizationInvitationOrderByWithAggregationInputObjectZodSchema = makeSchema();
