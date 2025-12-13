import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { UserOrganizationWhereInputObjectSchema as UserOrganizationWhereInputObjectSchema } from './UserOrganizationWhereInput.schema'

const makeSchema = () => z.object({
  every: z.lazy(() => UserOrganizationWhereInputObjectSchema).optional(),
  some: z.lazy(() => UserOrganizationWhereInputObjectSchema).optional(),
  none: z.lazy(() => UserOrganizationWhereInputObjectSchema).optional()
}).strict();
export const UserOrganizationListRelationFilterObjectSchema: z.ZodType<Prisma.UserOrganizationListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.UserOrganizationListRelationFilter>;
export const UserOrganizationListRelationFilterObjectZodSchema = makeSchema();
