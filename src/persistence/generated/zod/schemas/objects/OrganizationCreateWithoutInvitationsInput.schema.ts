import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { UserOrganizationCreateNestedManyWithoutOrganizationInputObjectSchema as UserOrganizationCreateNestedManyWithoutOrganizationInputObjectSchema } from './UserOrganizationCreateNestedManyWithoutOrganizationInput.schema'

const makeSchema = () => z.object({
  name: z.string(),
  members: z.lazy(() => UserOrganizationCreateNestedManyWithoutOrganizationInputObjectSchema).optional()
}).strict();
export const OrganizationCreateWithoutInvitationsInputObjectSchema: z.ZodType<Prisma.OrganizationCreateWithoutInvitationsInput> = makeSchema() as unknown as z.ZodType<Prisma.OrganizationCreateWithoutInvitationsInput>;
export const OrganizationCreateWithoutInvitationsInputObjectZodSchema = makeSchema();
