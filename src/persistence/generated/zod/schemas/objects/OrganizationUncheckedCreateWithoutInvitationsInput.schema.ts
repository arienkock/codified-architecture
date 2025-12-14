import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { UserOrganizationUncheckedCreateNestedManyWithoutOrganizationInputObjectSchema as UserOrganizationUncheckedCreateNestedManyWithoutOrganizationInputObjectSchema } from './UserOrganizationUncheckedCreateNestedManyWithoutOrganizationInput.schema'

const makeSchema = () => z.object({
  id: z.number().int().optional(),
  name: z.string(),
  members: z.lazy(() => UserOrganizationUncheckedCreateNestedManyWithoutOrganizationInputObjectSchema).optional()
}).strict();
export const OrganizationUncheckedCreateWithoutInvitationsInputObjectSchema: z.ZodType<Prisma.OrganizationUncheckedCreateWithoutInvitationsInput> = makeSchema() as unknown as z.ZodType<Prisma.OrganizationUncheckedCreateWithoutInvitationsInput>;
export const OrganizationUncheckedCreateWithoutInvitationsInputObjectZodSchema = makeSchema();
