import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { OrganizationInvitationWhereUniqueInputObjectSchema as OrganizationInvitationWhereUniqueInputObjectSchema } from './OrganizationInvitationWhereUniqueInput.schema';
import { OrganizationInvitationUpdateWithoutOrganizationInputObjectSchema as OrganizationInvitationUpdateWithoutOrganizationInputObjectSchema } from './OrganizationInvitationUpdateWithoutOrganizationInput.schema';
import { OrganizationInvitationUncheckedUpdateWithoutOrganizationInputObjectSchema as OrganizationInvitationUncheckedUpdateWithoutOrganizationInputObjectSchema } from './OrganizationInvitationUncheckedUpdateWithoutOrganizationInput.schema';
import { OrganizationInvitationCreateWithoutOrganizationInputObjectSchema as OrganizationInvitationCreateWithoutOrganizationInputObjectSchema } from './OrganizationInvitationCreateWithoutOrganizationInput.schema';
import { OrganizationInvitationUncheckedCreateWithoutOrganizationInputObjectSchema as OrganizationInvitationUncheckedCreateWithoutOrganizationInputObjectSchema } from './OrganizationInvitationUncheckedCreateWithoutOrganizationInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => OrganizationInvitationWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => OrganizationInvitationUpdateWithoutOrganizationInputObjectSchema), z.lazy(() => OrganizationInvitationUncheckedUpdateWithoutOrganizationInputObjectSchema)]),
  create: z.union([z.lazy(() => OrganizationInvitationCreateWithoutOrganizationInputObjectSchema), z.lazy(() => OrganizationInvitationUncheckedCreateWithoutOrganizationInputObjectSchema)])
}).strict();
export const OrganizationInvitationUpsertWithWhereUniqueWithoutOrganizationInputObjectSchema: z.ZodType<Prisma.OrganizationInvitationUpsertWithWhereUniqueWithoutOrganizationInput> = makeSchema() as unknown as z.ZodType<Prisma.OrganizationInvitationUpsertWithWhereUniqueWithoutOrganizationInput>;
export const OrganizationInvitationUpsertWithWhereUniqueWithoutOrganizationInputObjectZodSchema = makeSchema();
