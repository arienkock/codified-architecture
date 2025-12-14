import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { OrganizationInvitationWhereUniqueInputObjectSchema as OrganizationInvitationWhereUniqueInputObjectSchema } from './OrganizationInvitationWhereUniqueInput.schema';
import { OrganizationInvitationUpdateWithoutOrganizationInputObjectSchema as OrganizationInvitationUpdateWithoutOrganizationInputObjectSchema } from './OrganizationInvitationUpdateWithoutOrganizationInput.schema';
import { OrganizationInvitationUncheckedUpdateWithoutOrganizationInputObjectSchema as OrganizationInvitationUncheckedUpdateWithoutOrganizationInputObjectSchema } from './OrganizationInvitationUncheckedUpdateWithoutOrganizationInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => OrganizationInvitationWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => OrganizationInvitationUpdateWithoutOrganizationInputObjectSchema), z.lazy(() => OrganizationInvitationUncheckedUpdateWithoutOrganizationInputObjectSchema)])
}).strict();
export const OrganizationInvitationUpdateWithWhereUniqueWithoutOrganizationInputObjectSchema: z.ZodType<Prisma.OrganizationInvitationUpdateWithWhereUniqueWithoutOrganizationInput> = makeSchema() as unknown as z.ZodType<Prisma.OrganizationInvitationUpdateWithWhereUniqueWithoutOrganizationInput>;
export const OrganizationInvitationUpdateWithWhereUniqueWithoutOrganizationInputObjectZodSchema = makeSchema();
