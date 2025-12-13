import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { UserOrganizationWhereUniqueInputObjectSchema as UserOrganizationWhereUniqueInputObjectSchema } from './UserOrganizationWhereUniqueInput.schema';
import { UserOrganizationCreateWithoutUserInputObjectSchema as UserOrganizationCreateWithoutUserInputObjectSchema } from './UserOrganizationCreateWithoutUserInput.schema';
import { UserOrganizationUncheckedCreateWithoutUserInputObjectSchema as UserOrganizationUncheckedCreateWithoutUserInputObjectSchema } from './UserOrganizationUncheckedCreateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserOrganizationWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => UserOrganizationCreateWithoutUserInputObjectSchema), z.lazy(() => UserOrganizationUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const UserOrganizationCreateOrConnectWithoutUserInputObjectSchema: z.ZodType<Prisma.UserOrganizationCreateOrConnectWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.UserOrganizationCreateOrConnectWithoutUserInput>;
export const UserOrganizationCreateOrConnectWithoutUserInputObjectZodSchema = makeSchema();
