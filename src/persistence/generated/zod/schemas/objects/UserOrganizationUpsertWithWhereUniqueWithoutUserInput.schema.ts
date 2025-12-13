import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { UserOrganizationWhereUniqueInputObjectSchema as UserOrganizationWhereUniqueInputObjectSchema } from './UserOrganizationWhereUniqueInput.schema';
import { UserOrganizationUpdateWithoutUserInputObjectSchema as UserOrganizationUpdateWithoutUserInputObjectSchema } from './UserOrganizationUpdateWithoutUserInput.schema';
import { UserOrganizationUncheckedUpdateWithoutUserInputObjectSchema as UserOrganizationUncheckedUpdateWithoutUserInputObjectSchema } from './UserOrganizationUncheckedUpdateWithoutUserInput.schema';
import { UserOrganizationCreateWithoutUserInputObjectSchema as UserOrganizationCreateWithoutUserInputObjectSchema } from './UserOrganizationCreateWithoutUserInput.schema';
import { UserOrganizationUncheckedCreateWithoutUserInputObjectSchema as UserOrganizationUncheckedCreateWithoutUserInputObjectSchema } from './UserOrganizationUncheckedCreateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserOrganizationWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => UserOrganizationUpdateWithoutUserInputObjectSchema), z.lazy(() => UserOrganizationUncheckedUpdateWithoutUserInputObjectSchema)]),
  create: z.union([z.lazy(() => UserOrganizationCreateWithoutUserInputObjectSchema), z.lazy(() => UserOrganizationUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const UserOrganizationUpsertWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.UserOrganizationUpsertWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.UserOrganizationUpsertWithWhereUniqueWithoutUserInput>;
export const UserOrganizationUpsertWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();
