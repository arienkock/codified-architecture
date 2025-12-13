import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { UserOrganizationCreateWithoutOrganizationInputObjectSchema as UserOrganizationCreateWithoutOrganizationInputObjectSchema } from './UserOrganizationCreateWithoutOrganizationInput.schema';
import { UserOrganizationUncheckedCreateWithoutOrganizationInputObjectSchema as UserOrganizationUncheckedCreateWithoutOrganizationInputObjectSchema } from './UserOrganizationUncheckedCreateWithoutOrganizationInput.schema';
import { UserOrganizationCreateOrConnectWithoutOrganizationInputObjectSchema as UserOrganizationCreateOrConnectWithoutOrganizationInputObjectSchema } from './UserOrganizationCreateOrConnectWithoutOrganizationInput.schema';
import { UserOrganizationUpsertWithWhereUniqueWithoutOrganizationInputObjectSchema as UserOrganizationUpsertWithWhereUniqueWithoutOrganizationInputObjectSchema } from './UserOrganizationUpsertWithWhereUniqueWithoutOrganizationInput.schema';
import { OrganizationUserOrganizationCreateManyOrganizationInputEnvelopeObjectSchema as UserOrganizationCreateManyOrganizationInputEnvelopeObjectSchema } from './UserOrganizationCreateManyOrganizationInputEnvelope.schema';
import { UserOrganizationWhereUniqueInputObjectSchema as UserOrganizationWhereUniqueInputObjectSchema } from './UserOrganizationWhereUniqueInput.schema';
import { UserOrganizationUpdateWithWhereUniqueWithoutOrganizationInputObjectSchema as UserOrganizationUpdateWithWhereUniqueWithoutOrganizationInputObjectSchema } from './UserOrganizationUpdateWithWhereUniqueWithoutOrganizationInput.schema';
import { UserOrganizationUpdateManyWithWhereWithoutOrganizationInputObjectSchema as UserOrganizationUpdateManyWithWhereWithoutOrganizationInputObjectSchema } from './UserOrganizationUpdateManyWithWhereWithoutOrganizationInput.schema';
import { UserOrganizationScalarWhereInputObjectSchema as UserOrganizationScalarWhereInputObjectSchema } from './UserOrganizationScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserOrganizationCreateWithoutOrganizationInputObjectSchema), z.lazy(() => UserOrganizationCreateWithoutOrganizationInputObjectSchema).array(), z.lazy(() => UserOrganizationUncheckedCreateWithoutOrganizationInputObjectSchema), z.lazy(() => UserOrganizationUncheckedCreateWithoutOrganizationInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => UserOrganizationCreateOrConnectWithoutOrganizationInputObjectSchema), z.lazy(() => UserOrganizationCreateOrConnectWithoutOrganizationInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => UserOrganizationUpsertWithWhereUniqueWithoutOrganizationInputObjectSchema), z.lazy(() => UserOrganizationUpsertWithWhereUniqueWithoutOrganizationInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => UserOrganizationCreateManyOrganizationInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => UserOrganizationWhereUniqueInputObjectSchema), z.lazy(() => UserOrganizationWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => UserOrganizationWhereUniqueInputObjectSchema), z.lazy(() => UserOrganizationWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => UserOrganizationWhereUniqueInputObjectSchema), z.lazy(() => UserOrganizationWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => UserOrganizationWhereUniqueInputObjectSchema), z.lazy(() => UserOrganizationWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => UserOrganizationUpdateWithWhereUniqueWithoutOrganizationInputObjectSchema), z.lazy(() => UserOrganizationUpdateWithWhereUniqueWithoutOrganizationInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => UserOrganizationUpdateManyWithWhereWithoutOrganizationInputObjectSchema), z.lazy(() => UserOrganizationUpdateManyWithWhereWithoutOrganizationInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => UserOrganizationScalarWhereInputObjectSchema), z.lazy(() => UserOrganizationScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const UserOrganizationUpdateManyWithoutOrganizationNestedInputObjectSchema: z.ZodType<Prisma.UserOrganizationUpdateManyWithoutOrganizationNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.UserOrganizationUpdateManyWithoutOrganizationNestedInput>;
export const UserOrganizationUpdateManyWithoutOrganizationNestedInputObjectZodSchema = makeSchema();
