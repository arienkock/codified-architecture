import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema';
import { OrganizationArgsObjectSchema as OrganizationArgsObjectSchema } from './OrganizationArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  organizationId: z.boolean().optional(),
  isCurrent: z.boolean().optional(),
  isAdmin: z.boolean().optional(),
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
  organization: z.union([z.boolean(), z.lazy(() => OrganizationArgsObjectSchema)]).optional()
}).strict();
export const UserOrganizationSelectObjectSchema: z.ZodType<Prisma.UserOrganizationSelect> = makeSchema() as unknown as z.ZodType<Prisma.UserOrganizationSelect>;
export const UserOrganizationSelectObjectZodSchema = makeSchema();
