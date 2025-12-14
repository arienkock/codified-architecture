import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { BoolFieldUpdateOperationsInputObjectSchema as BoolFieldUpdateOperationsInputObjectSchema } from './BoolFieldUpdateOperationsInput.schema';
import { IntFieldUpdateOperationsInputObjectSchema as IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema';
import { UserUpdateOneRequiredWithoutInvitationsNestedInputObjectSchema as UserUpdateOneRequiredWithoutInvitationsNestedInputObjectSchema } from './UserUpdateOneRequiredWithoutInvitationsNestedInput.schema'

const makeSchema = () => z.object({
  issuedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  accepted: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputObjectSchema)]).optional(),
  ttlMinutes: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutInvitationsNestedInputObjectSchema).optional()
}).strict();
export const OrganizationInvitationUpdateWithoutOrganizationInputObjectSchema: z.ZodType<Prisma.OrganizationInvitationUpdateWithoutOrganizationInput> = makeSchema() as unknown as z.ZodType<Prisma.OrganizationInvitationUpdateWithoutOrganizationInput>;
export const OrganizationInvitationUpdateWithoutOrganizationInputObjectZodSchema = makeSchema();
