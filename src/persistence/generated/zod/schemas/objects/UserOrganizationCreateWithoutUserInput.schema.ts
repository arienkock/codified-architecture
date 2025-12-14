import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { OrganizationCreateNestedOneWithoutMembersInputObjectSchema as OrganizationCreateNestedOneWithoutMembersInputObjectSchema } from './OrganizationCreateNestedOneWithoutMembersInput.schema'

const makeSchema = () => z.object({
  isCurrent: z.boolean().optional(),
  isAdmin: z.boolean().optional(),
  organization: z.lazy(() => OrganizationCreateNestedOneWithoutMembersInputObjectSchema)
}).strict();
export const UserOrganizationCreateWithoutUserInputObjectSchema: z.ZodType<Prisma.UserOrganizationCreateWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.UserOrganizationCreateWithoutUserInput>;
export const UserOrganizationCreateWithoutUserInputObjectZodSchema = makeSchema();
