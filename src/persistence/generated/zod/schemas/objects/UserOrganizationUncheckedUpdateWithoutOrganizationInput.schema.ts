import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { IntFieldUpdateOperationsInputObjectSchema as IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema';
import { BoolFieldUpdateOperationsInputObjectSchema as BoolFieldUpdateOperationsInputObjectSchema } from './BoolFieldUpdateOperationsInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)]).optional(),
  userId: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)]).optional(),
  isCurrent: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputObjectSchema)]).optional()
}).strict();
export const UserOrganizationUncheckedUpdateWithoutOrganizationInputObjectSchema: z.ZodType<Prisma.UserOrganizationUncheckedUpdateWithoutOrganizationInput> = makeSchema() as unknown as z.ZodType<Prisma.UserOrganizationUncheckedUpdateWithoutOrganizationInput>;
export const UserOrganizationUncheckedUpdateWithoutOrganizationInputObjectZodSchema = makeSchema();
