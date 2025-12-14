import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { UserCreateNestedOneWithoutInvitationsInputObjectSchema as UserCreateNestedOneWithoutInvitationsInputObjectSchema } from './UserCreateNestedOneWithoutInvitationsInput.schema';
import { OrganizationCreateNestedOneWithoutInvitationsInputObjectSchema as OrganizationCreateNestedOneWithoutInvitationsInputObjectSchema } from './OrganizationCreateNestedOneWithoutInvitationsInput.schema'

const makeSchema = () => z.object({
  issuedAt: z.coerce.date().optional(),
  accepted: z.boolean().optional(),
  ttlMinutes: z.number().int().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutInvitationsInputObjectSchema),
  organization: z.lazy(() => OrganizationCreateNestedOneWithoutInvitationsInputObjectSchema)
}).strict();
export const OrganizationInvitationCreateInputObjectSchema: z.ZodType<Prisma.OrganizationInvitationCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.OrganizationInvitationCreateInput>;
export const OrganizationInvitationCreateInputObjectZodSchema = makeSchema();
