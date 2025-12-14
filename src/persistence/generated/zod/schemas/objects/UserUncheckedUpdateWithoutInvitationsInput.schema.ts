import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { IntFieldUpdateOperationsInputObjectSchema as IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema as NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { UserOrganizationUncheckedUpdateManyWithoutUserNestedInputObjectSchema as UserOrganizationUncheckedUpdateManyWithoutUserNestedInputObjectSchema } from './UserOrganizationUncheckedUpdateManyWithoutUserNestedInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)]).optional(),
  email: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  hashedPassword: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  organizations: z.lazy(() => UserOrganizationUncheckedUpdateManyWithoutUserNestedInputObjectSchema).optional()
}).strict();
export const UserUncheckedUpdateWithoutInvitationsInputObjectSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutInvitationsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUncheckedUpdateWithoutInvitationsInput>;
export const UserUncheckedUpdateWithoutInvitationsInputObjectZodSchema = makeSchema();
