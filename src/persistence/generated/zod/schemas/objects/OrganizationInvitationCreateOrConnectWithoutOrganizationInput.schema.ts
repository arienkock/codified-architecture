import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { OrganizationInvitationWhereUniqueInputObjectSchema as OrganizationInvitationWhereUniqueInputObjectSchema } from './OrganizationInvitationWhereUniqueInput.schema';
import { OrganizationInvitationCreateWithoutOrganizationInputObjectSchema as OrganizationInvitationCreateWithoutOrganizationInputObjectSchema } from './OrganizationInvitationCreateWithoutOrganizationInput.schema';
import { OrganizationInvitationUncheckedCreateWithoutOrganizationInputObjectSchema as OrganizationInvitationUncheckedCreateWithoutOrganizationInputObjectSchema } from './OrganizationInvitationUncheckedCreateWithoutOrganizationInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => OrganizationInvitationWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => OrganizationInvitationCreateWithoutOrganizationInputObjectSchema), z.lazy(() => OrganizationInvitationUncheckedCreateWithoutOrganizationInputObjectSchema)])
}).strict();
export const OrganizationInvitationCreateOrConnectWithoutOrganizationInputObjectSchema: z.ZodType<Prisma.OrganizationInvitationCreateOrConnectWithoutOrganizationInput> = makeSchema() as unknown as z.ZodType<Prisma.OrganizationInvitationCreateOrConnectWithoutOrganizationInput>;
export const OrganizationInvitationCreateOrConnectWithoutOrganizationInputObjectZodSchema = makeSchema();
