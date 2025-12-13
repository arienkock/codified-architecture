import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { IntFieldUpdateOperationsInputObjectSchema as IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional()
}).strict();
export const OrganizationUncheckedUpdateManyInputObjectSchema: z.ZodType<Prisma.OrganizationUncheckedUpdateManyInput> = makeSchema() as unknown as z.ZodType<Prisma.OrganizationUncheckedUpdateManyInput>;
export const OrganizationUncheckedUpdateManyInputObjectZodSchema = makeSchema();
