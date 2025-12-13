import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { UserOrganizationCreateManyUserInputObjectSchema as UserOrganizationCreateManyUserInputObjectSchema } from './UserOrganizationCreateManyUserInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => UserOrganizationCreateManyUserInputObjectSchema), z.lazy(() => UserOrganizationCreateManyUserInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const UserOrganizationCreateManyUserInputEnvelopeObjectSchema: z.ZodType<Prisma.UserOrganizationCreateManyUserInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.UserOrganizationCreateManyUserInputEnvelope>;
export const UserOrganizationCreateManyUserInputEnvelopeObjectZodSchema = makeSchema();
