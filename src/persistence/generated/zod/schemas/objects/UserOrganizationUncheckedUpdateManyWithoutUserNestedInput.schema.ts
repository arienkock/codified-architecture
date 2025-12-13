import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { UserOrganizationCreateWithoutUserInputObjectSchema as UserOrganizationCreateWithoutUserInputObjectSchema } from './UserOrganizationCreateWithoutUserInput.schema';
import { UserOrganizationUncheckedCreateWithoutUserInputObjectSchema as UserOrganizationUncheckedCreateWithoutUserInputObjectSchema } from './UserOrganizationUncheckedCreateWithoutUserInput.schema';
import { UserOrganizationCreateOrConnectWithoutUserInputObjectSchema as UserOrganizationCreateOrConnectWithoutUserInputObjectSchema } from './UserOrganizationCreateOrConnectWithoutUserInput.schema';
import { UserOrganizationUpsertWithWhereUniqueWithoutUserInputObjectSchema as UserOrganizationUpsertWithWhereUniqueWithoutUserInputObjectSchema } from './UserOrganizationUpsertWithWhereUniqueWithoutUserInput.schema';
import { UserOrganizationCreateManyUserInputEnvelopeObjectSchema as UserOrganizationCreateManyUserInputEnvelopeObjectSchema } from './UserOrganizationCreateManyUserInputEnvelope.schema';
import { UserOrganizationWhereUniqueInputObjectSchema as UserOrganizationWhereUniqueInputObjectSchema } from './UserOrganizationWhereUniqueInput.schema';
import { UserOrganizationUpdateWithWhereUniqueWithoutUserInputObjectSchema as UserOrganizationUpdateWithWhereUniqueWithoutUserInputObjectSchema } from './UserOrganizationUpdateWithWhereUniqueWithoutUserInput.schema';
import { UserOrganizationUpdateManyWithWhereWithoutUserInputObjectSchema as UserOrganizationUpdateManyWithWhereWithoutUserInputObjectSchema } from './UserOrganizationUpdateManyWithWhereWithoutUserInput.schema';
import { UserOrganizationScalarWhereInputObjectSchema as UserOrganizationScalarWhereInputObjectSchema } from './UserOrganizationScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserOrganizationCreateWithoutUserInputObjectSchema), z.lazy(() => UserOrganizationCreateWithoutUserInputObjectSchema).array(), z.lazy(() => UserOrganizationUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => UserOrganizationUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => UserOrganizationCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => UserOrganizationCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => UserOrganizationUpsertWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => UserOrganizationUpsertWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => UserOrganizationCreateManyUserInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => UserOrganizationWhereUniqueInputObjectSchema), z.lazy(() => UserOrganizationWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => UserOrganizationWhereUniqueInputObjectSchema), z.lazy(() => UserOrganizationWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => UserOrganizationWhereUniqueInputObjectSchema), z.lazy(() => UserOrganizationWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => UserOrganizationWhereUniqueInputObjectSchema), z.lazy(() => UserOrganizationWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => UserOrganizationUpdateWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => UserOrganizationUpdateWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => UserOrganizationUpdateManyWithWhereWithoutUserInputObjectSchema), z.lazy(() => UserOrganizationUpdateManyWithWhereWithoutUserInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => UserOrganizationScalarWhereInputObjectSchema), z.lazy(() => UserOrganizationScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const UserOrganizationUncheckedUpdateManyWithoutUserNestedInputObjectSchema: z.ZodType<Prisma.UserOrganizationUncheckedUpdateManyWithoutUserNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.UserOrganizationUncheckedUpdateManyWithoutUserNestedInput>;
export const UserOrganizationUncheckedUpdateManyWithoutUserNestedInputObjectZodSchema = makeSchema();
