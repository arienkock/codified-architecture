import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { OrganizationInvitationWhereUniqueInputObjectSchema as OrganizationInvitationWhereUniqueInputObjectSchema } from './OrganizationInvitationWhereUniqueInput.schema';
import { OrganizationInvitationCreateWithoutUserInputObjectSchema as OrganizationInvitationCreateWithoutUserInputObjectSchema } from './OrganizationInvitationCreateWithoutUserInput.schema';
import { OrganizationInvitationUncheckedCreateWithoutUserInputObjectSchema as OrganizationInvitationUncheckedCreateWithoutUserInputObjectSchema } from './OrganizationInvitationUncheckedCreateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => OrganizationInvitationWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => OrganizationInvitationCreateWithoutUserInputObjectSchema), z.lazy(() => OrganizationInvitationUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const OrganizationInvitationCreateOrConnectWithoutUserInputObjectSchema: z.ZodType<Prisma.OrganizationInvitationCreateOrConnectWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.OrganizationInvitationCreateOrConnectWithoutUserInput>;
export const OrganizationInvitationCreateOrConnectWithoutUserInputObjectZodSchema = makeSchema();
