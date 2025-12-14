import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { IntFilterObjectSchema as IntFilterObjectSchema } from './IntFilter.schema';
import { BoolFilterObjectSchema as BoolFilterObjectSchema } from './BoolFilter.schema';
import { UserScalarRelationFilterObjectSchema as UserScalarRelationFilterObjectSchema } from './UserScalarRelationFilter.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { OrganizationScalarRelationFilterObjectSchema as OrganizationScalarRelationFilterObjectSchema } from './OrganizationScalarRelationFilter.schema';
import { OrganizationWhereInputObjectSchema as OrganizationWhereInputObjectSchema } from './OrganizationWhereInput.schema'

const userorganizationwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => UserOrganizationWhereInputObjectSchema), z.lazy(() => UserOrganizationWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => UserOrganizationWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => UserOrganizationWhereInputObjectSchema), z.lazy(() => UserOrganizationWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  userId: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  organizationId: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  isCurrent: z.union([z.lazy(() => BoolFilterObjectSchema), z.boolean()]).optional(),
  isAdmin: z.union([z.lazy(() => BoolFilterObjectSchema), z.boolean()]).optional(),
  user: z.union([z.lazy(() => UserScalarRelationFilterObjectSchema), z.lazy(() => UserWhereInputObjectSchema)]).optional(),
  organization: z.union([z.lazy(() => OrganizationScalarRelationFilterObjectSchema), z.lazy(() => OrganizationWhereInputObjectSchema)]).optional()
}).strict();
export const UserOrganizationWhereInputObjectSchema: z.ZodType<Prisma.UserOrganizationWhereInput> = userorganizationwhereinputSchema as unknown as z.ZodType<Prisma.UserOrganizationWhereInput>;
export const UserOrganizationWhereInputObjectZodSchema = userorganizationwhereinputSchema;
