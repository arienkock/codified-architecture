import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { OrganizationInvitationCreateNestedManyWithoutOrganizationInputObjectSchema as OrganizationInvitationCreateNestedManyWithoutOrganizationInputObjectSchema } from './OrganizationInvitationCreateNestedManyWithoutOrganizationInput.schema'

const makeSchema = () => z.object({
  name: z.string(),
  invitations: z.lazy(() => OrganizationInvitationCreateNestedManyWithoutOrganizationInputObjectSchema).optional()
}).strict();
export const OrganizationCreateWithoutMembersInputObjectSchema: z.ZodType<Prisma.OrganizationCreateWithoutMembersInput> = makeSchema() as unknown as z.ZodType<Prisma.OrganizationCreateWithoutMembersInput>;
export const OrganizationCreateWithoutMembersInputObjectZodSchema = makeSchema();
