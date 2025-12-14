import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { OrganizationInvitationCreateWithoutUserInputObjectSchema as OrganizationInvitationCreateWithoutUserInputObjectSchema } from './OrganizationInvitationCreateWithoutUserInput.schema';
import { OrganizationInvitationUncheckedCreateWithoutUserInputObjectSchema as OrganizationInvitationUncheckedCreateWithoutUserInputObjectSchema } from './OrganizationInvitationUncheckedCreateWithoutUserInput.schema';
import { OrganizationInvitationCreateOrConnectWithoutUserInputObjectSchema as OrganizationInvitationCreateOrConnectWithoutUserInputObjectSchema } from './OrganizationInvitationCreateOrConnectWithoutUserInput.schema';
import { UserOrganizationInvitationCreateManyUserInputEnvelopeObjectSchema as OrganizationInvitationCreateManyUserInputEnvelopeObjectSchema } from './OrganizationInvitationCreateManyUserInputEnvelope.schema';
import { OrganizationInvitationWhereUniqueInputObjectSchema as OrganizationInvitationWhereUniqueInputObjectSchema } from './OrganizationInvitationWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => OrganizationInvitationCreateWithoutUserInputObjectSchema), z.lazy(() => OrganizationInvitationCreateWithoutUserInputObjectSchema).array(), z.lazy(() => OrganizationInvitationUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => OrganizationInvitationUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => OrganizationInvitationCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => OrganizationInvitationCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => OrganizationInvitationCreateManyUserInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => OrganizationInvitationWhereUniqueInputObjectSchema), z.lazy(() => OrganizationInvitationWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const OrganizationInvitationCreateNestedManyWithoutUserInputObjectSchema: z.ZodType<Prisma.OrganizationInvitationCreateNestedManyWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.OrganizationInvitationCreateNestedManyWithoutUserInput>;
export const OrganizationInvitationCreateNestedManyWithoutUserInputObjectZodSchema = makeSchema();
