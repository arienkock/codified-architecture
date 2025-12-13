import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { BoolFieldUpdateOperationsInputObjectSchema as BoolFieldUpdateOperationsInputObjectSchema } from './BoolFieldUpdateOperationsInput.schema'

const makeSchema = () => z.object({
  isCurrent: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputObjectSchema)]).optional()
}).strict();
export const UserOrganizationUpdateManyMutationInputObjectSchema: z.ZodType<Prisma.UserOrganizationUpdateManyMutationInput> = makeSchema() as unknown as z.ZodType<Prisma.UserOrganizationUpdateManyMutationInput>;
export const UserOrganizationUpdateManyMutationInputObjectZodSchema = makeSchema();
