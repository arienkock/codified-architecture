import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { OrganizationInvitationScalarWhereInputObjectSchema as OrganizationInvitationScalarWhereInputObjectSchema } from './OrganizationInvitationScalarWhereInput.schema';
import { OrganizationInvitationUpdateManyMutationInputObjectSchema as OrganizationInvitationUpdateManyMutationInputObjectSchema } from './OrganizationInvitationUpdateManyMutationInput.schema';
import { OrganizationInvitationUncheckedUpdateManyWithoutUserInputObjectSchema as OrganizationInvitationUncheckedUpdateManyWithoutUserInputObjectSchema } from './OrganizationInvitationUncheckedUpdateManyWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => OrganizationInvitationScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => OrganizationInvitationUpdateManyMutationInputObjectSchema), z.lazy(() => OrganizationInvitationUncheckedUpdateManyWithoutUserInputObjectSchema)])
}).strict();
export const OrganizationInvitationUpdateManyWithWhereWithoutUserInputObjectSchema: z.ZodType<Prisma.OrganizationInvitationUpdateManyWithWhereWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.OrganizationInvitationUpdateManyWithWhereWithoutUserInput>;
export const OrganizationInvitationUpdateManyWithWhereWithoutUserInputObjectZodSchema = makeSchema();
