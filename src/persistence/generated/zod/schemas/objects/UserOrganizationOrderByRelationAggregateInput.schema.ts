import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  _count: SortOrderSchema.optional()
}).strict();
export const UserOrganizationOrderByRelationAggregateInputObjectSchema: z.ZodType<Prisma.UserOrganizationOrderByRelationAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.UserOrganizationOrderByRelationAggregateInput>;
export const UserOrganizationOrderByRelationAggregateInputObjectZodSchema = makeSchema();
