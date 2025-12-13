import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { UserOrganizationUncheckedCreateNestedManyWithoutOrganizationInputObjectSchema as UserOrganizationUncheckedCreateNestedManyWithoutOrganizationInputObjectSchema } from './UserOrganizationUncheckedCreateNestedManyWithoutOrganizationInput.schema'

const makeSchema = () => z.object({
  id: z.number().int().optional(),
  name: z.string(),
  members: z.lazy(() => UserOrganizationUncheckedCreateNestedManyWithoutOrganizationInputObjectSchema)
}).strict();
export const OrganizationUncheckedCreateInputObjectSchema: z.ZodType<Prisma.OrganizationUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.OrganizationUncheckedCreateInput>;
export const OrganizationUncheckedCreateInputObjectZodSchema = makeSchema();
