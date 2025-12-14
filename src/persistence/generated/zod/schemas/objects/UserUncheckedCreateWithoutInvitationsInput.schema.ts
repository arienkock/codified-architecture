import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { UserOrganizationUncheckedCreateNestedManyWithoutUserInputObjectSchema as UserOrganizationUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './UserOrganizationUncheckedCreateNestedManyWithoutUserInput.schema'

const makeSchema = () => z.object({
  id: z.number().int().optional(),
  email: z.string(),
  name: z.string().optional().nullable(),
  hashedPassword: z.string(),
  organizations: z.lazy(() => UserOrganizationUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional()
}).strict();
export const UserUncheckedCreateWithoutInvitationsInputObjectSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutInvitationsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUncheckedCreateWithoutInvitationsInput>;
export const UserUncheckedCreateWithoutInvitationsInputObjectZodSchema = makeSchema();
