import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { UserOrganizationFindManySchema as UserOrganizationFindManySchema } from '../findManyUserOrganization.schema';
import { OrganizationInvitationFindManySchema as OrganizationInvitationFindManySchema } from '../findManyOrganizationInvitation.schema';
import { UserCountOutputTypeArgsObjectSchema as UserCountOutputTypeArgsObjectSchema } from './UserCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  organizations: z.union([z.boolean(), z.lazy(() => UserOrganizationFindManySchema)]).optional(),
  invitations: z.union([z.boolean(), z.lazy(() => OrganizationInvitationFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const UserIncludeObjectSchema: z.ZodType<Prisma.UserInclude> = makeSchema() as unknown as z.ZodType<Prisma.UserInclude>;
export const UserIncludeObjectZodSchema = makeSchema();
