import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { IntFilterObjectSchema as IntFilterObjectSchema } from './IntFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { BoolFilterObjectSchema as BoolFilterObjectSchema } from './BoolFilter.schema'

const organizationinvitationscalarwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => OrganizationInvitationScalarWhereInputObjectSchema), z.lazy(() => OrganizationInvitationScalarWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => OrganizationInvitationScalarWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => OrganizationInvitationScalarWhereInputObjectSchema), z.lazy(() => OrganizationInvitationScalarWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  issuedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  accepted: z.union([z.lazy(() => BoolFilterObjectSchema), z.boolean()]).optional(),
  ttlMinutes: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  userId: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  organizationId: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional()
}).strict();
export const OrganizationInvitationScalarWhereInputObjectSchema: z.ZodType<Prisma.OrganizationInvitationScalarWhereInput> = organizationinvitationscalarwhereinputSchema as unknown as z.ZodType<Prisma.OrganizationInvitationScalarWhereInput>;
export const OrganizationInvitationScalarWhereInputObjectZodSchema = organizationinvitationscalarwhereinputSchema;
