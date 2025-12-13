import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { OrganizationUserOrganizationCreateManyOrganizationInputObjectSchema as UserOrganizationCreateManyOrganizationInputObjectSchema } from './UserOrganizationCreateManyOrganizationInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => UserOrganizationCreateManyOrganizationInputObjectSchema), z.lazy(() => UserOrganizationCreateManyOrganizationInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const UserOrganizationCreateManyOrganizationInputEnvelopeObjectSchema: z.ZodType<Prisma.UserOrganizationCreateManyOrganizationInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.UserOrganizationCreateManyOrganizationInputEnvelope>;
export const UserOrganizationCreateManyOrganizationInputEnvelopeObjectZodSchema = makeSchema();
