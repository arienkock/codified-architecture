import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { UserOrganizationWhereUniqueInputObjectSchema as UserOrganizationWhereUniqueInputObjectSchema } from './UserOrganizationWhereUniqueInput.schema';
import { UserOrganizationUpdateWithoutOrganizationInputObjectSchema as UserOrganizationUpdateWithoutOrganizationInputObjectSchema } from './UserOrganizationUpdateWithoutOrganizationInput.schema';
import { UserOrganizationUncheckedUpdateWithoutOrganizationInputObjectSchema as UserOrganizationUncheckedUpdateWithoutOrganizationInputObjectSchema } from './UserOrganizationUncheckedUpdateWithoutOrganizationInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserOrganizationWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => UserOrganizationUpdateWithoutOrganizationInputObjectSchema), z.lazy(() => UserOrganizationUncheckedUpdateWithoutOrganizationInputObjectSchema)])
}).strict();
export const UserOrganizationUpdateWithWhereUniqueWithoutOrganizationInputObjectSchema: z.ZodType<Prisma.UserOrganizationUpdateWithWhereUniqueWithoutOrganizationInput> = makeSchema() as unknown as z.ZodType<Prisma.UserOrganizationUpdateWithWhereUniqueWithoutOrganizationInput>;
export const UserOrganizationUpdateWithWhereUniqueWithoutOrganizationInputObjectZodSchema = makeSchema();
