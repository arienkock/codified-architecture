import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { UserOrganizationCreateNestedManyWithoutOrganizationInputObjectSchema as UserOrganizationCreateNestedManyWithoutOrganizationInputObjectSchema } from './UserOrganizationCreateNestedManyWithoutOrganizationInput.schema'

const makeSchema = () => z.object({
  name: z.string(),
  members: z.lazy(() => UserOrganizationCreateNestedManyWithoutOrganizationInputObjectSchema)
}).strict();
export const OrganizationCreateInputObjectSchema: z.ZodType<Prisma.OrganizationCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.OrganizationCreateInput>;
export const OrganizationCreateInputObjectZodSchema = makeSchema();
