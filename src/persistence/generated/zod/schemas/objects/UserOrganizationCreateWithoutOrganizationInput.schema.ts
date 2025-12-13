import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { UserCreateNestedOneWithoutOrganizationsInputObjectSchema as UserCreateNestedOneWithoutOrganizationsInputObjectSchema } from './UserCreateNestedOneWithoutOrganizationsInput.schema'

const makeSchema = () => z.object({
  isCurrent: z.boolean().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutOrganizationsInputObjectSchema)
}).strict();
export const UserOrganizationCreateWithoutOrganizationInputObjectSchema: z.ZodType<Prisma.UserOrganizationCreateWithoutOrganizationInput> = makeSchema() as unknown as z.ZodType<Prisma.UserOrganizationCreateWithoutOrganizationInput>;
export const UserOrganizationCreateWithoutOrganizationInputObjectZodSchema = makeSchema();
