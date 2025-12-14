import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { IntFilterObjectSchema as IntFilterObjectSchema } from './IntFilter.schema';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { UserOrganizationListRelationFilterObjectSchema as UserOrganizationListRelationFilterObjectSchema } from './UserOrganizationListRelationFilter.schema';
import { OrganizationInvitationListRelationFilterObjectSchema as OrganizationInvitationListRelationFilterObjectSchema } from './OrganizationInvitationListRelationFilter.schema'

const organizationwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => OrganizationWhereInputObjectSchema), z.lazy(() => OrganizationWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => OrganizationWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => OrganizationWhereInputObjectSchema), z.lazy(() => OrganizationWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  name: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  members: z.lazy(() => UserOrganizationListRelationFilterObjectSchema).optional(),
  invitations: z.lazy(() => OrganizationInvitationListRelationFilterObjectSchema).optional()
}).strict();
export const OrganizationWhereInputObjectSchema: z.ZodType<Prisma.OrganizationWhereInput> = organizationwhereinputSchema as unknown as z.ZodType<Prisma.OrganizationWhereInput>;
export const OrganizationWhereInputObjectZodSchema = organizationwhereinputSchema;
