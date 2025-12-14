import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema';
import { OrganizationArgsObjectSchema as OrganizationArgsObjectSchema } from './OrganizationArgs.schema'

const makeSchema = () => z.object({
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
  organization: z.union([z.boolean(), z.lazy(() => OrganizationArgsObjectSchema)]).optional()
}).strict();
export const OrganizationInvitationIncludeObjectSchema: z.ZodType<Prisma.OrganizationInvitationInclude> = makeSchema() as unknown as z.ZodType<Prisma.OrganizationInvitationInclude>;
export const OrganizationInvitationIncludeObjectZodSchema = makeSchema();
