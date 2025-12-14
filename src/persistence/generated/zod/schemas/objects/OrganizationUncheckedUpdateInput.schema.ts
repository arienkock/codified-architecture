import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { IntFieldUpdateOperationsInputObjectSchema as IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { UserOrganizationUncheckedUpdateManyWithoutOrganizationNestedInputObjectSchema as UserOrganizationUncheckedUpdateManyWithoutOrganizationNestedInputObjectSchema } from './UserOrganizationUncheckedUpdateManyWithoutOrganizationNestedInput.schema';
import { OrganizationInvitationUncheckedUpdateManyWithoutOrganizationNestedInputObjectSchema as OrganizationInvitationUncheckedUpdateManyWithoutOrganizationNestedInputObjectSchema } from './OrganizationInvitationUncheckedUpdateManyWithoutOrganizationNestedInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  members: z.lazy(() => UserOrganizationUncheckedUpdateManyWithoutOrganizationNestedInputObjectSchema).optional(),
  invitations: z.lazy(() => OrganizationInvitationUncheckedUpdateManyWithoutOrganizationNestedInputObjectSchema).optional()
}).strict();
export const OrganizationUncheckedUpdateInputObjectSchema: z.ZodType<Prisma.OrganizationUncheckedUpdateInput> = makeSchema() as unknown as z.ZodType<Prisma.OrganizationUncheckedUpdateInput>;
export const OrganizationUncheckedUpdateInputObjectZodSchema = makeSchema();
