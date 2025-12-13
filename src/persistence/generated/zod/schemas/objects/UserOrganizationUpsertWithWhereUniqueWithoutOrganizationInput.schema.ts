import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { UserOrganizationWhereUniqueInputObjectSchema as UserOrganizationWhereUniqueInputObjectSchema } from './UserOrganizationWhereUniqueInput.schema';
import { UserOrganizationUpdateWithoutOrganizationInputObjectSchema as UserOrganizationUpdateWithoutOrganizationInputObjectSchema } from './UserOrganizationUpdateWithoutOrganizationInput.schema';
import { UserOrganizationUncheckedUpdateWithoutOrganizationInputObjectSchema as UserOrganizationUncheckedUpdateWithoutOrganizationInputObjectSchema } from './UserOrganizationUncheckedUpdateWithoutOrganizationInput.schema';
import { UserOrganizationCreateWithoutOrganizationInputObjectSchema as UserOrganizationCreateWithoutOrganizationInputObjectSchema } from './UserOrganizationCreateWithoutOrganizationInput.schema';
import { UserOrganizationUncheckedCreateWithoutOrganizationInputObjectSchema as UserOrganizationUncheckedCreateWithoutOrganizationInputObjectSchema } from './UserOrganizationUncheckedCreateWithoutOrganizationInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserOrganizationWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => UserOrganizationUpdateWithoutOrganizationInputObjectSchema), z.lazy(() => UserOrganizationUncheckedUpdateWithoutOrganizationInputObjectSchema)]),
  create: z.union([z.lazy(() => UserOrganizationCreateWithoutOrganizationInputObjectSchema), z.lazy(() => UserOrganizationUncheckedCreateWithoutOrganizationInputObjectSchema)])
}).strict();
export const UserOrganizationUpsertWithWhereUniqueWithoutOrganizationInputObjectSchema: z.ZodType<Prisma.UserOrganizationUpsertWithWhereUniqueWithoutOrganizationInput> = makeSchema() as unknown as z.ZodType<Prisma.UserOrganizationUpsertWithWhereUniqueWithoutOrganizationInput>;
export const UserOrganizationUpsertWithWhereUniqueWithoutOrganizationInputObjectZodSchema = makeSchema();
