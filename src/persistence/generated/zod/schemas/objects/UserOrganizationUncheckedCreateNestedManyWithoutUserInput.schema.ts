import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { UserOrganizationCreateWithoutUserInputObjectSchema as UserOrganizationCreateWithoutUserInputObjectSchema } from './UserOrganizationCreateWithoutUserInput.schema';
import { UserOrganizationUncheckedCreateWithoutUserInputObjectSchema as UserOrganizationUncheckedCreateWithoutUserInputObjectSchema } from './UserOrganizationUncheckedCreateWithoutUserInput.schema';
import { UserOrganizationCreateOrConnectWithoutUserInputObjectSchema as UserOrganizationCreateOrConnectWithoutUserInputObjectSchema } from './UserOrganizationCreateOrConnectWithoutUserInput.schema';
import { UserOrganizationCreateManyUserInputEnvelopeObjectSchema as UserOrganizationCreateManyUserInputEnvelopeObjectSchema } from './UserOrganizationCreateManyUserInputEnvelope.schema';
import { UserOrganizationWhereUniqueInputObjectSchema as UserOrganizationWhereUniqueInputObjectSchema } from './UserOrganizationWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserOrganizationCreateWithoutUserInputObjectSchema), z.lazy(() => UserOrganizationCreateWithoutUserInputObjectSchema).array(), z.lazy(() => UserOrganizationUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => UserOrganizationUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => UserOrganizationCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => UserOrganizationCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => UserOrganizationCreateManyUserInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => UserOrganizationWhereUniqueInputObjectSchema), z.lazy(() => UserOrganizationWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const UserOrganizationUncheckedCreateNestedManyWithoutUserInputObjectSchema: z.ZodType<Prisma.UserOrganizationUncheckedCreateNestedManyWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.UserOrganizationUncheckedCreateNestedManyWithoutUserInput>;
export const UserOrganizationUncheckedCreateNestedManyWithoutUserInputObjectZodSchema = makeSchema();
