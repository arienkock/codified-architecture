import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserCreateWithoutInvitationsInputObjectSchema as UserCreateWithoutInvitationsInputObjectSchema } from './UserCreateWithoutInvitationsInput.schema';
import { UserUncheckedCreateWithoutInvitationsInputObjectSchema as UserUncheckedCreateWithoutInvitationsInputObjectSchema } from './UserUncheckedCreateWithoutInvitationsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => UserCreateWithoutInvitationsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutInvitationsInputObjectSchema)])
}).strict();
export const UserCreateOrConnectWithoutInvitationsInputObjectSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutInvitationsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateOrConnectWithoutInvitationsInput>;
export const UserCreateOrConnectWithoutInvitationsInputObjectZodSchema = makeSchema();
