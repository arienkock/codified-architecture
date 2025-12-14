import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { UserCreateWithoutInvitationsInputObjectSchema as UserCreateWithoutInvitationsInputObjectSchema } from './UserCreateWithoutInvitationsInput.schema';
import { UserUncheckedCreateWithoutInvitationsInputObjectSchema as UserUncheckedCreateWithoutInvitationsInputObjectSchema } from './UserUncheckedCreateWithoutInvitationsInput.schema';
import { UserCreateOrConnectWithoutInvitationsInputObjectSchema as UserCreateOrConnectWithoutInvitationsInputObjectSchema } from './UserCreateOrConnectWithoutInvitationsInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutInvitationsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutInvitationsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutInvitationsInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional()
}).strict();
export const UserCreateNestedOneWithoutInvitationsInputObjectSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutInvitationsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateNestedOneWithoutInvitationsInput>;
export const UserCreateNestedOneWithoutInvitationsInputObjectZodSchema = makeSchema();
