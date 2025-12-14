import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { UserOrganizationFindManySchema as UserOrganizationFindManySchema } from '../findManyUserOrganization.schema';
import { OrganizationInvitationFindManySchema as OrganizationInvitationFindManySchema } from '../findManyOrganizationInvitation.schema';
import { OrganizationCountOutputTypeArgsObjectSchema as OrganizationCountOutputTypeArgsObjectSchema } from './OrganizationCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  members: z.union([z.boolean(), z.lazy(() => UserOrganizationFindManySchema)]).optional(),
  invitations: z.union([z.boolean(), z.lazy(() => OrganizationInvitationFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => OrganizationCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const OrganizationSelectObjectSchema: z.ZodType<Prisma.OrganizationSelect> = makeSchema() as unknown as z.ZodType<Prisma.OrganizationSelect>;
export const OrganizationSelectObjectZodSchema = makeSchema();
