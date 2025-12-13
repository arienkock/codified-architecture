import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema'

const makeSchema = () => z.object({
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional()
}).strict();
export const OrganizationUpdateManyMutationInputObjectSchema: z.ZodType<Prisma.OrganizationUpdateManyMutationInput> = makeSchema() as unknown as z.ZodType<Prisma.OrganizationUpdateManyMutationInput>;
export const OrganizationUpdateManyMutationInputObjectZodSchema = makeSchema();
