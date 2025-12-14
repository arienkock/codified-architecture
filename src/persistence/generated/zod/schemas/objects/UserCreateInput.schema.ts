import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { UserOrganizationCreateNestedManyWithoutUserInputObjectSchema as UserOrganizationCreateNestedManyWithoutUserInputObjectSchema } from './UserOrganizationCreateNestedManyWithoutUserInput.schema';
import { OrganizationInvitationCreateNestedManyWithoutUserInputObjectSchema as OrganizationInvitationCreateNestedManyWithoutUserInputObjectSchema } from './OrganizationInvitationCreateNestedManyWithoutUserInput.schema'

const makeSchema = () => z.object({
  email: z.string(),
  name: z.string().optional().nullable(),
  hashedPassword: z.string(),
  organizations: z.lazy(() => UserOrganizationCreateNestedManyWithoutUserInputObjectSchema),
  invitations: z.lazy(() => OrganizationInvitationCreateNestedManyWithoutUserInputObjectSchema)
}).strict();
export const UserCreateInputObjectSchema: z.ZodType<Prisma.UserCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateInput>;
export const UserCreateInputObjectZodSchema = makeSchema();
