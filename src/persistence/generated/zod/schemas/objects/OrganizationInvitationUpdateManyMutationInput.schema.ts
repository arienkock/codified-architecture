import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { BoolFieldUpdateOperationsInputObjectSchema as BoolFieldUpdateOperationsInputObjectSchema } from './BoolFieldUpdateOperationsInput.schema';
import { IntFieldUpdateOperationsInputObjectSchema as IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema'

const makeSchema = () => z.object({
  issuedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  accepted: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputObjectSchema)]).optional(),
  ttlMinutes: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)]).optional()
}).strict();
export const OrganizationInvitationUpdateManyMutationInputObjectSchema: z.ZodType<Prisma.OrganizationInvitationUpdateManyMutationInput> = makeSchema() as unknown as z.ZodType<Prisma.OrganizationInvitationUpdateManyMutationInput>;
export const OrganizationInvitationUpdateManyMutationInputObjectZodSchema = makeSchema();
