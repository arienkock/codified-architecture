import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { UserOrganizationWhereUniqueInputObjectSchema as UserOrganizationWhereUniqueInputObjectSchema } from './UserOrganizationWhereUniqueInput.schema';
import { UserOrganizationCreateWithoutOrganizationInputObjectSchema as UserOrganizationCreateWithoutOrganizationInputObjectSchema } from './UserOrganizationCreateWithoutOrganizationInput.schema';
import { UserOrganizationUncheckedCreateWithoutOrganizationInputObjectSchema as UserOrganizationUncheckedCreateWithoutOrganizationInputObjectSchema } from './UserOrganizationUncheckedCreateWithoutOrganizationInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserOrganizationWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => UserOrganizationCreateWithoutOrganizationInputObjectSchema), z.lazy(() => UserOrganizationUncheckedCreateWithoutOrganizationInputObjectSchema)])
}).strict();
export const UserOrganizationCreateOrConnectWithoutOrganizationInputObjectSchema: z.ZodType<Prisma.UserOrganizationCreateOrConnectWithoutOrganizationInput> = makeSchema() as unknown as z.ZodType<Prisma.UserOrganizationCreateOrConnectWithoutOrganizationInput>;
export const UserOrganizationCreateOrConnectWithoutOrganizationInputObjectZodSchema = makeSchema();
