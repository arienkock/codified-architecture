import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  _count: SortOrderSchema.optional()
}).strict();
export const OrganizationInvitationOrderByRelationAggregateInputObjectSchema: z.ZodType<Prisma.OrganizationInvitationOrderByRelationAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.OrganizationInvitationOrderByRelationAggregateInput>;
export const OrganizationInvitationOrderByRelationAggregateInputObjectZodSchema = makeSchema();
