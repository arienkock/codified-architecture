import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { UserUpdateWithoutInvitationsInputObjectSchema as UserUpdateWithoutInvitationsInputObjectSchema } from './UserUpdateWithoutInvitationsInput.schema';
import { UserUncheckedUpdateWithoutInvitationsInputObjectSchema as UserUncheckedUpdateWithoutInvitationsInputObjectSchema } from './UserUncheckedUpdateWithoutInvitationsInput.schema';
import { UserCreateWithoutInvitationsInputObjectSchema as UserCreateWithoutInvitationsInputObjectSchema } from './UserCreateWithoutInvitationsInput.schema';
import { UserUncheckedCreateWithoutInvitationsInputObjectSchema as UserUncheckedCreateWithoutInvitationsInputObjectSchema } from './UserUncheckedCreateWithoutInvitationsInput.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => UserUpdateWithoutInvitationsInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutInvitationsInputObjectSchema)]),
  create: z.union([z.lazy(() => UserCreateWithoutInvitationsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutInvitationsInputObjectSchema)]),
  where: z.lazy(() => UserWhereInputObjectSchema).optional()
}).strict();
export const UserUpsertWithoutInvitationsInputObjectSchema: z.ZodType<Prisma.UserUpsertWithoutInvitationsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpsertWithoutInvitationsInput>;
export const UserUpsertWithoutInvitationsInputObjectZodSchema = makeSchema();
