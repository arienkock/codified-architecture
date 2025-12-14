import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { OrganizationInvitationCreateNestedManyWithoutUserInputObjectSchema as OrganizationInvitationCreateNestedManyWithoutUserInputObjectSchema } from './OrganizationInvitationCreateNestedManyWithoutUserInput.schema'

const makeSchema = () => z.object({
  email: z.string(),
  name: z.string().optional().nullable(),
  hashedPassword: z.string(),
  invitations: z.lazy(() => OrganizationInvitationCreateNestedManyWithoutUserInputObjectSchema).optional()
}).strict();
export const UserCreateWithoutOrganizationsInputObjectSchema: z.ZodType<Prisma.UserCreateWithoutOrganizationsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateWithoutOrganizationsInput>;
export const UserCreateWithoutOrganizationsInputObjectZodSchema = makeSchema();
