import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { OrganizationInvitationWhereUniqueInputObjectSchema as OrganizationInvitationWhereUniqueInputObjectSchema } from './OrganizationInvitationWhereUniqueInput.schema';
import { OrganizationInvitationUpdateWithoutUserInputObjectSchema as OrganizationInvitationUpdateWithoutUserInputObjectSchema } from './OrganizationInvitationUpdateWithoutUserInput.schema';
import { OrganizationInvitationUncheckedUpdateWithoutUserInputObjectSchema as OrganizationInvitationUncheckedUpdateWithoutUserInputObjectSchema } from './OrganizationInvitationUncheckedUpdateWithoutUserInput.schema';
import { OrganizationInvitationCreateWithoutUserInputObjectSchema as OrganizationInvitationCreateWithoutUserInputObjectSchema } from './OrganizationInvitationCreateWithoutUserInput.schema';
import { OrganizationInvitationUncheckedCreateWithoutUserInputObjectSchema as OrganizationInvitationUncheckedCreateWithoutUserInputObjectSchema } from './OrganizationInvitationUncheckedCreateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => OrganizationInvitationWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => OrganizationInvitationUpdateWithoutUserInputObjectSchema), z.lazy(() => OrganizationInvitationUncheckedUpdateWithoutUserInputObjectSchema)]),
  create: z.union([z.lazy(() => OrganizationInvitationCreateWithoutUserInputObjectSchema), z.lazy(() => OrganizationInvitationUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const OrganizationInvitationUpsertWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.OrganizationInvitationUpsertWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.OrganizationInvitationUpsertWithWhereUniqueWithoutUserInput>;
export const OrganizationInvitationUpsertWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();
