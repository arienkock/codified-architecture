import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { UserOrderByWithRelationInputObjectSchema as UserOrderByWithRelationInputObjectSchema } from './UserOrderByWithRelationInput.schema';
import { OrganizationOrderByWithRelationInputObjectSchema as OrganizationOrderByWithRelationInputObjectSchema } from './OrganizationOrderByWithRelationInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  issuedAt: SortOrderSchema.optional(),
  accepted: SortOrderSchema.optional(),
  ttlMinutes: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  organizationId: SortOrderSchema.optional(),
  user: z.lazy(() => UserOrderByWithRelationInputObjectSchema).optional(),
  organization: z.lazy(() => OrganizationOrderByWithRelationInputObjectSchema).optional()
}).strict();
export const OrganizationInvitationOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.OrganizationInvitationOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.OrganizationInvitationOrderByWithRelationInput>;
export const OrganizationInvitationOrderByWithRelationInputObjectZodSchema = makeSchema();
