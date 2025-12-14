import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { UserOrganizationFindManySchema as UserOrganizationFindManySchema } from '../findManyUserOrganization.schema';
import { OrganizationInvitationFindManySchema as OrganizationInvitationFindManySchema } from '../findManyOrganizationInvitation.schema';
import { UserCountOutputTypeArgsObjectSchema as UserCountOutputTypeArgsObjectSchema } from './UserCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  email: z.boolean().optional(),
  name: z.boolean().optional(),
  hashedPassword: z.boolean().optional(),
  organizations: z.union([z.boolean(), z.lazy(() => UserOrganizationFindManySchema)]).optional(),
  invitations: z.union([z.boolean(), z.lazy(() => OrganizationInvitationFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const UserSelectObjectSchema: z.ZodType<Prisma.UserSelect> = makeSchema() as unknown as z.ZodType<Prisma.UserSelect>;
export const UserSelectObjectZodSchema = makeSchema();
