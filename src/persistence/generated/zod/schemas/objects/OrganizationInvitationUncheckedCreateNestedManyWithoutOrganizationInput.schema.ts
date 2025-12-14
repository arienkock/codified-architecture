import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { OrganizationInvitationCreateWithoutOrganizationInputObjectSchema as OrganizationInvitationCreateWithoutOrganizationInputObjectSchema } from './OrganizationInvitationCreateWithoutOrganizationInput.schema';
import { OrganizationInvitationUncheckedCreateWithoutOrganizationInputObjectSchema as OrganizationInvitationUncheckedCreateWithoutOrganizationInputObjectSchema } from './OrganizationInvitationUncheckedCreateWithoutOrganizationInput.schema';
import { OrganizationInvitationCreateOrConnectWithoutOrganizationInputObjectSchema as OrganizationInvitationCreateOrConnectWithoutOrganizationInputObjectSchema } from './OrganizationInvitationCreateOrConnectWithoutOrganizationInput.schema';
import { OrganizationInvitationCreateManyOrganizationInputEnvelopeObjectSchema as OrganizationInvitationCreateManyOrganizationInputEnvelopeObjectSchema } from './OrganizationInvitationCreateManyOrganizationInputEnvelope.schema';
import { OrganizationInvitationWhereUniqueInputObjectSchema as OrganizationInvitationWhereUniqueInputObjectSchema } from './OrganizationInvitationWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => OrganizationInvitationCreateWithoutOrganizationInputObjectSchema), z.lazy(() => OrganizationInvitationCreateWithoutOrganizationInputObjectSchema).array(), z.lazy(() => OrganizationInvitationUncheckedCreateWithoutOrganizationInputObjectSchema), z.lazy(() => OrganizationInvitationUncheckedCreateWithoutOrganizationInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => OrganizationInvitationCreateOrConnectWithoutOrganizationInputObjectSchema), z.lazy(() => OrganizationInvitationCreateOrConnectWithoutOrganizationInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => OrganizationInvitationCreateManyOrganizationInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => OrganizationInvitationWhereUniqueInputObjectSchema), z.lazy(() => OrganizationInvitationWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const OrganizationInvitationUncheckedCreateNestedManyWithoutOrganizationInputObjectSchema: z.ZodType<Prisma.OrganizationInvitationUncheckedCreateNestedManyWithoutOrganizationInput> = makeSchema() as unknown as z.ZodType<Prisma.OrganizationInvitationUncheckedCreateNestedManyWithoutOrganizationInput>;
export const OrganizationInvitationUncheckedCreateNestedManyWithoutOrganizationInputObjectZodSchema = makeSchema();
