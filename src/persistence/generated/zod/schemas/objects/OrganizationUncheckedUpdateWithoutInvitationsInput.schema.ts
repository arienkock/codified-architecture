import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { IntFieldUpdateOperationsInputObjectSchema as IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { UserOrganizationUncheckedUpdateManyWithoutOrganizationNestedInputObjectSchema as UserOrganizationUncheckedUpdateManyWithoutOrganizationNestedInputObjectSchema } from './UserOrganizationUncheckedUpdateManyWithoutOrganizationNestedInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  members: z.lazy(() => UserOrganizationUncheckedUpdateManyWithoutOrganizationNestedInputObjectSchema).optional()
}).strict();
export const OrganizationUncheckedUpdateWithoutInvitationsInputObjectSchema: z.ZodType<Prisma.OrganizationUncheckedUpdateWithoutInvitationsInput> = makeSchema() as unknown as z.ZodType<Prisma.OrganizationUncheckedUpdateWithoutInvitationsInput>;
export const OrganizationUncheckedUpdateWithoutInvitationsInputObjectZodSchema = makeSchema();
