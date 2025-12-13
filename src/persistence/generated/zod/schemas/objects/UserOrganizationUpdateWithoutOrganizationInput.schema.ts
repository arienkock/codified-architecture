import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { BoolFieldUpdateOperationsInputObjectSchema as BoolFieldUpdateOperationsInputObjectSchema } from './BoolFieldUpdateOperationsInput.schema';
import { UserUpdateOneRequiredWithoutOrganizationsNestedInputObjectSchema as UserUpdateOneRequiredWithoutOrganizationsNestedInputObjectSchema } from './UserUpdateOneRequiredWithoutOrganizationsNestedInput.schema'

const makeSchema = () => z.object({
  isCurrent: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputObjectSchema)]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutOrganizationsNestedInputObjectSchema).optional()
}).strict();
export const UserOrganizationUpdateWithoutOrganizationInputObjectSchema: z.ZodType<Prisma.UserOrganizationUpdateWithoutOrganizationInput> = makeSchema() as unknown as z.ZodType<Prisma.UserOrganizationUpdateWithoutOrganizationInput>;
export const UserOrganizationUpdateWithoutOrganizationInputObjectZodSchema = makeSchema();
