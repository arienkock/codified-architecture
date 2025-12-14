import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { UserOrganizationCreateNestedManyWithoutUserInputObjectSchema as UserOrganizationCreateNestedManyWithoutUserInputObjectSchema } from './UserOrganizationCreateNestedManyWithoutUserInput.schema'

const makeSchema = () => z.object({
  email: z.string(),
  name: z.string().optional().nullable(),
  hashedPassword: z.string(),
  organizations: z.lazy(() => UserOrganizationCreateNestedManyWithoutUserInputObjectSchema).optional()
}).strict();
export const UserCreateWithoutInvitationsInputObjectSchema: z.ZodType<Prisma.UserCreateWithoutInvitationsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateWithoutInvitationsInput>;
export const UserCreateWithoutInvitationsInputObjectZodSchema = makeSchema();
