import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema';
import { OrganizationArgsObjectSchema as OrganizationArgsObjectSchema } from './OrganizationArgs.schema'

const makeSchema = () => z.object({
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
  organization: z.union([z.boolean(), z.lazy(() => OrganizationArgsObjectSchema)]).optional()
}).strict();
export const UserOrganizationIncludeObjectSchema: z.ZodType<Prisma.UserOrganizationInclude> = makeSchema() as unknown as z.ZodType<Prisma.UserOrganizationInclude>;
export const UserOrganizationIncludeObjectZodSchema = makeSchema();
