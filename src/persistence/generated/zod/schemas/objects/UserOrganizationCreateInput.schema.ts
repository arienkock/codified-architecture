import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { UserCreateNestedOneWithoutOrganizationsInputObjectSchema as UserCreateNestedOneWithoutOrganizationsInputObjectSchema } from './UserCreateNestedOneWithoutOrganizationsInput.schema';
import { OrganizationCreateNestedOneWithoutMembersInputObjectSchema as OrganizationCreateNestedOneWithoutMembersInputObjectSchema } from './OrganizationCreateNestedOneWithoutMembersInput.schema'

const makeSchema = () => z.object({
  isCurrent: z.boolean().optional(),
  isAdmin: z.boolean().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutOrganizationsInputObjectSchema),
  organization: z.lazy(() => OrganizationCreateNestedOneWithoutMembersInputObjectSchema)
}).strict();
export const UserOrganizationCreateInputObjectSchema: z.ZodType<Prisma.UserOrganizationCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.UserOrganizationCreateInput>;
export const UserOrganizationCreateInputObjectZodSchema = makeSchema();
