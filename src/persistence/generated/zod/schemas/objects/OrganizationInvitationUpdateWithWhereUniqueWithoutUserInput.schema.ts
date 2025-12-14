import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { OrganizationInvitationWhereUniqueInputObjectSchema as OrganizationInvitationWhereUniqueInputObjectSchema } from './OrganizationInvitationWhereUniqueInput.schema';
import { OrganizationInvitationUpdateWithoutUserInputObjectSchema as OrganizationInvitationUpdateWithoutUserInputObjectSchema } from './OrganizationInvitationUpdateWithoutUserInput.schema';
import { OrganizationInvitationUncheckedUpdateWithoutUserInputObjectSchema as OrganizationInvitationUncheckedUpdateWithoutUserInputObjectSchema } from './OrganizationInvitationUncheckedUpdateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => OrganizationInvitationWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => OrganizationInvitationUpdateWithoutUserInputObjectSchema), z.lazy(() => OrganizationInvitationUncheckedUpdateWithoutUserInputObjectSchema)])
}).strict();
export const OrganizationInvitationUpdateWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.OrganizationInvitationUpdateWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.OrganizationInvitationUpdateWithWhereUniqueWithoutUserInput>;
export const OrganizationInvitationUpdateWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();
