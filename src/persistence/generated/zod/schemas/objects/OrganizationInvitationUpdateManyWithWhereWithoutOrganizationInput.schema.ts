import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { OrganizationInvitationScalarWhereInputObjectSchema as OrganizationInvitationScalarWhereInputObjectSchema } from './OrganizationInvitationScalarWhereInput.schema';
import { OrganizationInvitationUpdateManyMutationInputObjectSchema as OrganizationInvitationUpdateManyMutationInputObjectSchema } from './OrganizationInvitationUpdateManyMutationInput.schema';
import { OrganizationInvitationUncheckedUpdateManyWithoutOrganizationInputObjectSchema as OrganizationInvitationUncheckedUpdateManyWithoutOrganizationInputObjectSchema } from './OrganizationInvitationUncheckedUpdateManyWithoutOrganizationInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => OrganizationInvitationScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => OrganizationInvitationUpdateManyMutationInputObjectSchema), z.lazy(() => OrganizationInvitationUncheckedUpdateManyWithoutOrganizationInputObjectSchema)])
}).strict();
export const OrganizationInvitationUpdateManyWithWhereWithoutOrganizationInputObjectSchema: z.ZodType<Prisma.OrganizationInvitationUpdateManyWithWhereWithoutOrganizationInput> = makeSchema() as unknown as z.ZodType<Prisma.OrganizationInvitationUpdateManyWithWhereWithoutOrganizationInput>;
export const OrganizationInvitationUpdateManyWithWhereWithoutOrganizationInputObjectZodSchema = makeSchema();
