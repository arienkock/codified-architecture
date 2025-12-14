import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { IntFilterObjectSchema as IntFilterObjectSchema } from './IntFilter.schema';
import { BoolFilterObjectSchema as BoolFilterObjectSchema } from './BoolFilter.schema'

const userorganizationscalarwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => UserOrganizationScalarWhereInputObjectSchema), z.lazy(() => UserOrganizationScalarWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => UserOrganizationScalarWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => UserOrganizationScalarWhereInputObjectSchema), z.lazy(() => UserOrganizationScalarWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  userId: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  organizationId: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  isCurrent: z.union([z.lazy(() => BoolFilterObjectSchema), z.boolean()]).optional(),
  isAdmin: z.union([z.lazy(() => BoolFilterObjectSchema), z.boolean()]).optional()
}).strict();
export const UserOrganizationScalarWhereInputObjectSchema: z.ZodType<Prisma.UserOrganizationScalarWhereInput> = userorganizationscalarwhereinputSchema as unknown as z.ZodType<Prisma.UserOrganizationScalarWhereInput>;
export const UserOrganizationScalarWhereInputObjectZodSchema = userorganizationscalarwhereinputSchema;
