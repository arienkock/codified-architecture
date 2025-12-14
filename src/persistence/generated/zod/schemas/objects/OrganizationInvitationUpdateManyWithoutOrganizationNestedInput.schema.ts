import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { OrganizationInvitationCreateWithoutOrganizationInputObjectSchema as OrganizationInvitationCreateWithoutOrganizationInputObjectSchema } from './OrganizationInvitationCreateWithoutOrganizationInput.schema';
import { OrganizationInvitationUncheckedCreateWithoutOrganizationInputObjectSchema as OrganizationInvitationUncheckedCreateWithoutOrganizationInputObjectSchema } from './OrganizationInvitationUncheckedCreateWithoutOrganizationInput.schema';
import { OrganizationInvitationCreateOrConnectWithoutOrganizationInputObjectSchema as OrganizationInvitationCreateOrConnectWithoutOrganizationInputObjectSchema } from './OrganizationInvitationCreateOrConnectWithoutOrganizationInput.schema';
import { OrganizationInvitationUpsertWithWhereUniqueWithoutOrganizationInputObjectSchema as OrganizationInvitationUpsertWithWhereUniqueWithoutOrganizationInputObjectSchema } from './OrganizationInvitationUpsertWithWhereUniqueWithoutOrganizationInput.schema';
import { OrganizationInvitationCreateManyOrganizationInputEnvelopeObjectSchema as OrganizationInvitationCreateManyOrganizationInputEnvelopeObjectSchema } from './OrganizationInvitationCreateManyOrganizationInputEnvelope.schema';
import { OrganizationInvitationWhereUniqueInputObjectSchema as OrganizationInvitationWhereUniqueInputObjectSchema } from './OrganizationInvitationWhereUniqueInput.schema';
import { OrganizationInvitationUpdateWithWhereUniqueWithoutOrganizationInputObjectSchema as OrganizationInvitationUpdateWithWhereUniqueWithoutOrganizationInputObjectSchema } from './OrganizationInvitationUpdateWithWhereUniqueWithoutOrganizationInput.schema';
import { OrganizationInvitationUpdateManyWithWhereWithoutOrganizationInputObjectSchema as OrganizationInvitationUpdateManyWithWhereWithoutOrganizationInputObjectSchema } from './OrganizationInvitationUpdateManyWithWhereWithoutOrganizationInput.schema';
import { OrganizationInvitationScalarWhereInputObjectSchema as OrganizationInvitationScalarWhereInputObjectSchema } from './OrganizationInvitationScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => OrganizationInvitationCreateWithoutOrganizationInputObjectSchema), z.lazy(() => OrganizationInvitationCreateWithoutOrganizationInputObjectSchema).array(), z.lazy(() => OrganizationInvitationUncheckedCreateWithoutOrganizationInputObjectSchema), z.lazy(() => OrganizationInvitationUncheckedCreateWithoutOrganizationInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => OrganizationInvitationCreateOrConnectWithoutOrganizationInputObjectSchema), z.lazy(() => OrganizationInvitationCreateOrConnectWithoutOrganizationInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => OrganizationInvitationUpsertWithWhereUniqueWithoutOrganizationInputObjectSchema), z.lazy(() => OrganizationInvitationUpsertWithWhereUniqueWithoutOrganizationInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => OrganizationInvitationCreateManyOrganizationInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => OrganizationInvitationWhereUniqueInputObjectSchema), z.lazy(() => OrganizationInvitationWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => OrganizationInvitationWhereUniqueInputObjectSchema), z.lazy(() => OrganizationInvitationWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => OrganizationInvitationWhereUniqueInputObjectSchema), z.lazy(() => OrganizationInvitationWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => OrganizationInvitationWhereUniqueInputObjectSchema), z.lazy(() => OrganizationInvitationWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => OrganizationInvitationUpdateWithWhereUniqueWithoutOrganizationInputObjectSchema), z.lazy(() => OrganizationInvitationUpdateWithWhereUniqueWithoutOrganizationInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => OrganizationInvitationUpdateManyWithWhereWithoutOrganizationInputObjectSchema), z.lazy(() => OrganizationInvitationUpdateManyWithWhereWithoutOrganizationInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => OrganizationInvitationScalarWhereInputObjectSchema), z.lazy(() => OrganizationInvitationScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const OrganizationInvitationUpdateManyWithoutOrganizationNestedInputObjectSchema: z.ZodType<Prisma.OrganizationInvitationUpdateManyWithoutOrganizationNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.OrganizationInvitationUpdateManyWithoutOrganizationNestedInput>;
export const OrganizationInvitationUpdateManyWithoutOrganizationNestedInputObjectZodSchema = makeSchema();
