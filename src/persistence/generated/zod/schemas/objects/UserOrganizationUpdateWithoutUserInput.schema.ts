import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { BoolFieldUpdateOperationsInputObjectSchema as BoolFieldUpdateOperationsInputObjectSchema } from './BoolFieldUpdateOperationsInput.schema';
import { OrganizationUpdateOneRequiredWithoutMembersNestedInputObjectSchema as OrganizationUpdateOneRequiredWithoutMembersNestedInputObjectSchema } from './OrganizationUpdateOneRequiredWithoutMembersNestedInput.schema'

const makeSchema = () => z.object({
  isCurrent: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputObjectSchema)]).optional(),
  isAdmin: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputObjectSchema)]).optional(),
  organization: z.lazy(() => OrganizationUpdateOneRequiredWithoutMembersNestedInputObjectSchema).optional()
}).strict();
export const UserOrganizationUpdateWithoutUserInputObjectSchema: z.ZodType<Prisma.UserOrganizationUpdateWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.UserOrganizationUpdateWithoutUserInput>;
export const UserOrganizationUpdateWithoutUserInputObjectZodSchema = makeSchema();
