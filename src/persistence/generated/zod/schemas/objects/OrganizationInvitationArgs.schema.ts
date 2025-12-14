import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { OrganizationInvitationSelectObjectSchema as OrganizationInvitationSelectObjectSchema } from './OrganizationInvitationSelect.schema';
import { OrganizationInvitationIncludeObjectSchema as OrganizationInvitationIncludeObjectSchema } from './OrganizationInvitationInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => OrganizationInvitationSelectObjectSchema).optional(),
  include: z.lazy(() => OrganizationInvitationIncludeObjectSchema).optional()
}).strict();
export const OrganizationInvitationArgsObjectSchema = makeSchema();
export const OrganizationInvitationArgsObjectZodSchema = makeSchema();
