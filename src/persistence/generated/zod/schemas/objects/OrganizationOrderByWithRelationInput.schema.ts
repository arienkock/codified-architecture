import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { UserOrganizationOrderByRelationAggregateInputObjectSchema as UserOrganizationOrderByRelationAggregateInputObjectSchema } from './UserOrganizationOrderByRelationAggregateInput.schema';
import { OrganizationInvitationOrderByRelationAggregateInputObjectSchema as OrganizationInvitationOrderByRelationAggregateInputObjectSchema } from './OrganizationInvitationOrderByRelationAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  members: z.lazy(() => UserOrganizationOrderByRelationAggregateInputObjectSchema).optional(),
  invitations: z.lazy(() => OrganizationInvitationOrderByRelationAggregateInputObjectSchema).optional()
}).strict();
export const OrganizationOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.OrganizationOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.OrganizationOrderByWithRelationInput>;
export const OrganizationOrderByWithRelationInputObjectZodSchema = makeSchema();
