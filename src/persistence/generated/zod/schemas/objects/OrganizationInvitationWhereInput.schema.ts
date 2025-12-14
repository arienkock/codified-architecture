import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { IntFilterObjectSchema as IntFilterObjectSchema } from './IntFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { BoolFilterObjectSchema as BoolFilterObjectSchema } from './BoolFilter.schema';
import { UserScalarRelationFilterObjectSchema as UserScalarRelationFilterObjectSchema } from './UserScalarRelationFilter.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { OrganizationScalarRelationFilterObjectSchema as OrganizationScalarRelationFilterObjectSchema } from './OrganizationScalarRelationFilter.schema';
import { OrganizationWhereInputObjectSchema as OrganizationWhereInputObjectSchema } from './OrganizationWhereInput.schema'

const organizationinvitationwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => OrganizationInvitationWhereInputObjectSchema), z.lazy(() => OrganizationInvitationWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => OrganizationInvitationWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => OrganizationInvitationWhereInputObjectSchema), z.lazy(() => OrganizationInvitationWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  issuedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  accepted: z.union([z.lazy(() => BoolFilterObjectSchema), z.boolean()]).optional(),
  ttlMinutes: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  userId: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  organizationId: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  user: z.union([z.lazy(() => UserScalarRelationFilterObjectSchema), z.lazy(() => UserWhereInputObjectSchema)]).optional(),
  organization: z.union([z.lazy(() => OrganizationScalarRelationFilterObjectSchema), z.lazy(() => OrganizationWhereInputObjectSchema)]).optional()
}).strict();
export const OrganizationInvitationWhereInputObjectSchema: z.ZodType<Prisma.OrganizationInvitationWhereInput> = organizationinvitationwhereinputSchema as unknown as z.ZodType<Prisma.OrganizationInvitationWhereInput>;
export const OrganizationInvitationWhereInputObjectZodSchema = organizationinvitationwhereinputSchema;
