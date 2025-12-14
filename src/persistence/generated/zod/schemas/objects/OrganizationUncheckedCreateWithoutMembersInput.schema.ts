import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { OrganizationInvitationUncheckedCreateNestedManyWithoutOrganizationInputObjectSchema as OrganizationInvitationUncheckedCreateNestedManyWithoutOrganizationInputObjectSchema } from './OrganizationInvitationUncheckedCreateNestedManyWithoutOrganizationInput.schema'

const makeSchema = () => z.object({
  id: z.number().int().optional(),
  name: z.string(),
  invitations: z.lazy(() => OrganizationInvitationUncheckedCreateNestedManyWithoutOrganizationInputObjectSchema).optional()
}).strict();
export const OrganizationUncheckedCreateWithoutMembersInputObjectSchema: z.ZodType<Prisma.OrganizationUncheckedCreateWithoutMembersInput> = makeSchema() as unknown as z.ZodType<Prisma.OrganizationUncheckedCreateWithoutMembersInput>;
export const OrganizationUncheckedCreateWithoutMembersInputObjectZodSchema = makeSchema();
