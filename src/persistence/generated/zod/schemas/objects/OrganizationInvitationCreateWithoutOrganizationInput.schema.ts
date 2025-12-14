import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { UserCreateNestedOneWithoutInvitationsInputObjectSchema as UserCreateNestedOneWithoutInvitationsInputObjectSchema } from './UserCreateNestedOneWithoutInvitationsInput.schema'

const makeSchema = () => z.object({
  issuedAt: z.coerce.date().optional(),
  accepted: z.boolean().optional(),
  ttlMinutes: z.number().int().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutInvitationsInputObjectSchema)
}).strict();
export const OrganizationInvitationCreateWithoutOrganizationInputObjectSchema: z.ZodType<Prisma.OrganizationInvitationCreateWithoutOrganizationInput> = makeSchema() as unknown as z.ZodType<Prisma.OrganizationInvitationCreateWithoutOrganizationInput>;
export const OrganizationInvitationCreateWithoutOrganizationInputObjectZodSchema = makeSchema();
