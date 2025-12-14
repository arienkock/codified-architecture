import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { UserUpdateWithoutInvitationsInputObjectSchema as UserUpdateWithoutInvitationsInputObjectSchema } from './UserUpdateWithoutInvitationsInput.schema';
import { UserUncheckedUpdateWithoutInvitationsInputObjectSchema as UserUncheckedUpdateWithoutInvitationsInputObjectSchema } from './UserUncheckedUpdateWithoutInvitationsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => UserUpdateWithoutInvitationsInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutInvitationsInputObjectSchema)])
}).strict();
export const UserUpdateToOneWithWhereWithoutInvitationsInputObjectSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutInvitationsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutInvitationsInput>;
export const UserUpdateToOneWithWhereWithoutInvitationsInputObjectZodSchema = makeSchema();
