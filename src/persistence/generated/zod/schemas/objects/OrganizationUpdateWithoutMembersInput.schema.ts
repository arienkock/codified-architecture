import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { OrganizationInvitationUpdateManyWithoutOrganizationNestedInputObjectSchema as OrganizationInvitationUpdateManyWithoutOrganizationNestedInputObjectSchema } from './OrganizationInvitationUpdateManyWithoutOrganizationNestedInput.schema'

const makeSchema = () => z.object({
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  invitations: z.lazy(() => OrganizationInvitationUpdateManyWithoutOrganizationNestedInputObjectSchema).optional()
}).strict();
export const OrganizationUpdateWithoutMembersInputObjectSchema: z.ZodType<Prisma.OrganizationUpdateWithoutMembersInput> = makeSchema() as unknown as z.ZodType<Prisma.OrganizationUpdateWithoutMembersInput>;
export const OrganizationUpdateWithoutMembersInputObjectZodSchema = makeSchema();
