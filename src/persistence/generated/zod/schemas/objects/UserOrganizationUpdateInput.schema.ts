import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { BoolFieldUpdateOperationsInputObjectSchema as BoolFieldUpdateOperationsInputObjectSchema } from './BoolFieldUpdateOperationsInput.schema';
import { UserUpdateOneRequiredWithoutOrganizationsNestedInputObjectSchema as UserUpdateOneRequiredWithoutOrganizationsNestedInputObjectSchema } from './UserUpdateOneRequiredWithoutOrganizationsNestedInput.schema';
import { OrganizationUpdateOneRequiredWithoutMembersNestedInputObjectSchema as OrganizationUpdateOneRequiredWithoutMembersNestedInputObjectSchema } from './OrganizationUpdateOneRequiredWithoutMembersNestedInput.schema'

const makeSchema = () => z.object({
  isCurrent: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputObjectSchema)]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutOrganizationsNestedInputObjectSchema).optional(),
  organization: z.lazy(() => OrganizationUpdateOneRequiredWithoutMembersNestedInputObjectSchema).optional()
}).strict();
export const UserOrganizationUpdateInputObjectSchema: z.ZodType<Prisma.UserOrganizationUpdateInput> = makeSchema() as unknown as z.ZodType<Prisma.UserOrganizationUpdateInput>;
export const UserOrganizationUpdateInputObjectZodSchema = makeSchema();
