import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { UserOrganizationSelectObjectSchema as UserOrganizationSelectObjectSchema } from './UserOrganizationSelect.schema';
import { UserOrganizationIncludeObjectSchema as UserOrganizationIncludeObjectSchema } from './UserOrganizationInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => UserOrganizationSelectObjectSchema).optional(),
  include: z.lazy(() => UserOrganizationIncludeObjectSchema).optional()
}).strict();
export const UserOrganizationArgsObjectSchema = makeSchema();
export const UserOrganizationArgsObjectZodSchema = makeSchema();
