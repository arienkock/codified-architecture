import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { UserOrganizationUncheckedCreateNestedManyWithoutUserInputObjectSchema as UserOrganizationUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './UserOrganizationUncheckedCreateNestedManyWithoutUserInput.schema';
import { OrganizationInvitationUncheckedCreateNestedManyWithoutUserInputObjectSchema as OrganizationInvitationUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './OrganizationInvitationUncheckedCreateNestedManyWithoutUserInput.schema'

const makeSchema = () => z.object({
  id: z.number().int().optional(),
  email: z.string(),
  name: z.string().optional().nullable(),
  hashedPassword: z.string(),
  organizations: z.lazy(() => UserOrganizationUncheckedCreateNestedManyWithoutUserInputObjectSchema),
  invitations: z.lazy(() => OrganizationInvitationUncheckedCreateNestedManyWithoutUserInputObjectSchema)
}).strict();
export const UserUncheckedCreateInputObjectSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUncheckedCreateInput>;
export const UserUncheckedCreateInputObjectZodSchema = makeSchema();
