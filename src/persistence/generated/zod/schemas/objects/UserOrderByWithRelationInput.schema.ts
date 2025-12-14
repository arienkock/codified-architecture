import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { UserOrganizationOrderByRelationAggregateInputObjectSchema as UserOrganizationOrderByRelationAggregateInputObjectSchema } from './UserOrganizationOrderByRelationAggregateInput.schema';
import { OrganizationInvitationOrderByRelationAggregateInputObjectSchema as OrganizationInvitationOrderByRelationAggregateInputObjectSchema } from './OrganizationInvitationOrderByRelationAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  email: SortOrderSchema.optional(),
  name: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  hashedPassword: SortOrderSchema.optional(),
  organizations: z.lazy(() => UserOrganizationOrderByRelationAggregateInputObjectSchema).optional(),
  invitations: z.lazy(() => OrganizationInvitationOrderByRelationAggregateInputObjectSchema).optional()
}).strict();
export const UserOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.UserOrderByWithRelationInput>;
export const UserOrderByWithRelationInputObjectZodSchema = makeSchema();
