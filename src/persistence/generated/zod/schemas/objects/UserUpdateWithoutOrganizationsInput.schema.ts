import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema as NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { OrganizationInvitationUpdateManyWithoutUserNestedInputObjectSchema as OrganizationInvitationUpdateManyWithoutUserNestedInputObjectSchema } from './OrganizationInvitationUpdateManyWithoutUserNestedInput.schema'

const makeSchema = () => z.object({
  email: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  hashedPassword: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  invitations: z.lazy(() => OrganizationInvitationUpdateManyWithoutUserNestedInputObjectSchema).optional()
}).strict();
export const UserUpdateWithoutOrganizationsInputObjectSchema: z.ZodType<Prisma.UserUpdateWithoutOrganizationsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateWithoutOrganizationsInput>;
export const UserUpdateWithoutOrganizationsInputObjectZodSchema = makeSchema();
