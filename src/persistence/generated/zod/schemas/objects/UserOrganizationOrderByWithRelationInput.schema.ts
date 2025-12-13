import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { UserOrderByWithRelationInputObjectSchema as UserOrderByWithRelationInputObjectSchema } from './UserOrderByWithRelationInput.schema';
import { OrganizationOrderByWithRelationInputObjectSchema as OrganizationOrderByWithRelationInputObjectSchema } from './OrganizationOrderByWithRelationInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  organizationId: SortOrderSchema.optional(),
  isCurrent: SortOrderSchema.optional(),
  user: z.lazy(() => UserOrderByWithRelationInputObjectSchema).optional(),
  organization: z.lazy(() => OrganizationOrderByWithRelationInputObjectSchema).optional()
}).strict();
export const UserOrganizationOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.UserOrganizationOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.UserOrganizationOrderByWithRelationInput>;
export const UserOrganizationOrderByWithRelationInputObjectZodSchema = makeSchema();
