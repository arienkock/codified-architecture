import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { UserOrganizationWhereUniqueInputObjectSchema as UserOrganizationWhereUniqueInputObjectSchema } from './UserOrganizationWhereUniqueInput.schema';
import { UserOrganizationUpdateWithoutUserInputObjectSchema as UserOrganizationUpdateWithoutUserInputObjectSchema } from './UserOrganizationUpdateWithoutUserInput.schema';
import { UserOrganizationUncheckedUpdateWithoutUserInputObjectSchema as UserOrganizationUncheckedUpdateWithoutUserInputObjectSchema } from './UserOrganizationUncheckedUpdateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserOrganizationWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => UserOrganizationUpdateWithoutUserInputObjectSchema), z.lazy(() => UserOrganizationUncheckedUpdateWithoutUserInputObjectSchema)])
}).strict();
export const UserOrganizationUpdateWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.UserOrganizationUpdateWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.UserOrganizationUpdateWithWhereUniqueWithoutUserInput>;
export const UserOrganizationUpdateWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();
