import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { UserCreateWithoutInvitationsInputObjectSchema as UserCreateWithoutInvitationsInputObjectSchema } from './UserCreateWithoutInvitationsInput.schema';
import { UserUncheckedCreateWithoutInvitationsInputObjectSchema as UserUncheckedCreateWithoutInvitationsInputObjectSchema } from './UserUncheckedCreateWithoutInvitationsInput.schema';
import { UserCreateOrConnectWithoutInvitationsInputObjectSchema as UserCreateOrConnectWithoutInvitationsInputObjectSchema } from './UserCreateOrConnectWithoutInvitationsInput.schema';
import { UserUpsertWithoutInvitationsInputObjectSchema as UserUpsertWithoutInvitationsInputObjectSchema } from './UserUpsertWithoutInvitationsInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserUpdateToOneWithWhereWithoutInvitationsInputObjectSchema as UserUpdateToOneWithWhereWithoutInvitationsInputObjectSchema } from './UserUpdateToOneWithWhereWithoutInvitationsInput.schema';
import { UserUpdateWithoutInvitationsInputObjectSchema as UserUpdateWithoutInvitationsInputObjectSchema } from './UserUpdateWithoutInvitationsInput.schema';
import { UserUncheckedUpdateWithoutInvitationsInputObjectSchema as UserUncheckedUpdateWithoutInvitationsInputObjectSchema } from './UserUncheckedUpdateWithoutInvitationsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutInvitationsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutInvitationsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutInvitationsInputObjectSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutInvitationsInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => UserUpdateToOneWithWhereWithoutInvitationsInputObjectSchema), z.lazy(() => UserUpdateWithoutInvitationsInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutInvitationsInputObjectSchema)]).optional()
}).strict();
export const UserUpdateOneRequiredWithoutInvitationsNestedInputObjectSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutInvitationsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateOneRequiredWithoutInvitationsNestedInput>;
export const UserUpdateOneRequiredWithoutInvitationsNestedInputObjectZodSchema = makeSchema();
