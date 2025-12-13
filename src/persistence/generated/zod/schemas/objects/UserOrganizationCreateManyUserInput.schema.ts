import { z } from 'zod';
import type { Prisma } from '../../../prisma';


const makeSchema = () => z.object({
  id: z.number().int().optional(),
  organizationId: z.number().int(),
  isCurrent: z.boolean().optional()
}).strict();
export const UserOrganizationCreateManyUserInputObjectSchema: z.ZodType<Prisma.UserOrganizationCreateManyUserInput> = makeSchema() as unknown as z.ZodType<Prisma.UserOrganizationCreateManyUserInput>;
export const UserOrganizationCreateManyUserInputObjectZodSchema = makeSchema();
