import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { OrganizationInvitationCreateWithoutUserInputObjectSchema as OrganizationInvitationCreateWithoutUserInputObjectSchema } from './OrganizationInvitationCreateWithoutUserInput.schema';
import { OrganizationInvitationUncheckedCreateWithoutUserInputObjectSchema as OrganizationInvitationUncheckedCreateWithoutUserInputObjectSchema } from './OrganizationInvitationUncheckedCreateWithoutUserInput.schema';
import { OrganizationInvitationCreateOrConnectWithoutUserInputObjectSchema as OrganizationInvitationCreateOrConnectWithoutUserInputObjectSchema } from './OrganizationInvitationCreateOrConnectWithoutUserInput.schema';
import { OrganizationInvitationUpsertWithWhereUniqueWithoutUserInputObjectSchema as OrganizationInvitationUpsertWithWhereUniqueWithoutUserInputObjectSchema } from './OrganizationInvitationUpsertWithWhereUniqueWithoutUserInput.schema';
import { UserOrganizationInvitationCreateManyUserInputEnvelopeObjectSchema as OrganizationInvitationCreateManyUserInputEnvelopeObjectSchema } from './OrganizationInvitationCreateManyUserInputEnvelope.schema';
import { OrganizationInvitationWhereUniqueInputObjectSchema as OrganizationInvitationWhereUniqueInputObjectSchema } from './OrganizationInvitationWhereUniqueInput.schema';
import { OrganizationInvitationUpdateWithWhereUniqueWithoutUserInputObjectSchema as OrganizationInvitationUpdateWithWhereUniqueWithoutUserInputObjectSchema } from './OrganizationInvitationUpdateWithWhereUniqueWithoutUserInput.schema';
import { OrganizationInvitationUpdateManyWithWhereWithoutUserInputObjectSchema as OrganizationInvitationUpdateManyWithWhereWithoutUserInputObjectSchema } from './OrganizationInvitationUpdateManyWithWhereWithoutUserInput.schema';
import { OrganizationInvitationScalarWhereInputObjectSchema as OrganizationInvitationScalarWhereInputObjectSchema } from './OrganizationInvitationScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => OrganizationInvitationCreateWithoutUserInputObjectSchema), z.lazy(() => OrganizationInvitationCreateWithoutUserInputObjectSchema).array(), z.lazy(() => OrganizationInvitationUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => OrganizationInvitationUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => OrganizationInvitationCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => OrganizationInvitationCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => OrganizationInvitationUpsertWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => OrganizationInvitationUpsertWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => OrganizationInvitationCreateManyUserInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => OrganizationInvitationWhereUniqueInputObjectSchema), z.lazy(() => OrganizationInvitationWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => OrganizationInvitationWhereUniqueInputObjectSchema), z.lazy(() => OrganizationInvitationWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => OrganizationInvitationWhereUniqueInputObjectSchema), z.lazy(() => OrganizationInvitationWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => OrganizationInvitationWhereUniqueInputObjectSchema), z.lazy(() => OrganizationInvitationWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => OrganizationInvitationUpdateWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => OrganizationInvitationUpdateWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => OrganizationInvitationUpdateManyWithWhereWithoutUserInputObjectSchema), z.lazy(() => OrganizationInvitationUpdateManyWithWhereWithoutUserInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => OrganizationInvitationScalarWhereInputObjectSchema), z.lazy(() => OrganizationInvitationScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const OrganizationInvitationUpdateManyWithoutUserNestedInputObjectSchema: z.ZodType<Prisma.OrganizationInvitationUpdateManyWithoutUserNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.OrganizationInvitationUpdateManyWithoutUserNestedInput>;
export const OrganizationInvitationUpdateManyWithoutUserNestedInputObjectZodSchema = makeSchema();
