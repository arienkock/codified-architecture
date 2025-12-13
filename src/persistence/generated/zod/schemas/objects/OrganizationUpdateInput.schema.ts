import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { UserOrganizationUpdateManyWithoutOrganizationNestedInputObjectSchema as UserOrganizationUpdateManyWithoutOrganizationNestedInputObjectSchema } from './UserOrganizationUpdateManyWithoutOrganizationNestedInput.schema'

const makeSchema = () => z.object({
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  members: z.lazy(() => UserOrganizationUpdateManyWithoutOrganizationNestedInputObjectSchema).optional()
}).strict();
export const OrganizationUpdateInputObjectSchema: z.ZodType<Prisma.OrganizationUpdateInput> = makeSchema() as unknown as z.ZodType<Prisma.OrganizationUpdateInput>;
export const OrganizationUpdateInputObjectZodSchema = makeSchema();
