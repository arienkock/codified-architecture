import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { UserOrganizationOrderByRelationAggregateInputObjectSchema as UserOrganizationOrderByRelationAggregateInputObjectSchema } from './UserOrganizationOrderByRelationAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  members: z.lazy(() => UserOrganizationOrderByRelationAggregateInputObjectSchema).optional()
}).strict();
export const OrganizationOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.OrganizationOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.OrganizationOrderByWithRelationInput>;
export const OrganizationOrderByWithRelationInputObjectZodSchema = makeSchema();
