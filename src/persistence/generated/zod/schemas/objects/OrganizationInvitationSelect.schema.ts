import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema';
import { OrganizationArgsObjectSchema as OrganizationArgsObjectSchema } from './OrganizationArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  issuedAt: z.boolean().optional(),
  accepted: z.boolean().optional(),
  ttlMinutes: z.boolean().optional(),
  userId: z.boolean().optional(),
  organizationId: z.boolean().optional(),
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
  organization: z.union([z.boolean(), z.lazy(() => OrganizationArgsObjectSchema)]).optional()
}).strict();
export const OrganizationInvitationSelectObjectSchema: z.ZodType<Prisma.OrganizationInvitationSelect> = makeSchema() as unknown as z.ZodType<Prisma.OrganizationInvitationSelect>;
export const OrganizationInvitationSelectObjectZodSchema = makeSchema();
