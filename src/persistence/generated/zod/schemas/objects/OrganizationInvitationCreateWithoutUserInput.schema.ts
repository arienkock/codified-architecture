import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { OrganizationCreateNestedOneWithoutInvitationsInputObjectSchema as OrganizationCreateNestedOneWithoutInvitationsInputObjectSchema } from './OrganizationCreateNestedOneWithoutInvitationsInput.schema'

const makeSchema = () => z.object({
  issuedAt: z.coerce.date().optional(),
  accepted: z.boolean().optional(),
  ttlMinutes: z.number().int().optional(),
  organization: z.lazy(() => OrganizationCreateNestedOneWithoutInvitationsInputObjectSchema)
}).strict();
export const OrganizationInvitationCreateWithoutUserInputObjectSchema: z.ZodType<Prisma.OrganizationInvitationCreateWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.OrganizationInvitationCreateWithoutUserInput>;
export const OrganizationInvitationCreateWithoutUserInputObjectZodSchema = makeSchema();
