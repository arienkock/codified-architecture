import { z } from 'zod';
import type { Prisma } from '../../../prisma';


const makeSchema = () => z.object({
  id: z.number().int().optional(),
  userId: z.number().int(),
  isCurrent: z.boolean().optional()
}).strict();
export const UserOrganizationCreateManyOrganizationInputObjectSchema: z.ZodType<Prisma.UserOrganizationCreateManyOrganizationInput> = makeSchema() as unknown as z.ZodType<Prisma.UserOrganizationCreateManyOrganizationInput>;
export const UserOrganizationCreateManyOrganizationInputObjectZodSchema = makeSchema();
