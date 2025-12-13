import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  organizationId: SortOrderSchema.optional(),
  isCurrent: SortOrderSchema.optional()
}).strict();
export const UserOrganizationCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.UserOrganizationCountOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.UserOrganizationCountOrderByAggregateInput>;
export const UserOrganizationCountOrderByAggregateInputObjectZodSchema = makeSchema();
