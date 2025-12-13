import { z } from 'zod';
import type { Prisma } from '../../../prisma';


const makeSchema = () => z.object({
  id: z.number().int().optional(),
  userId: z.number().int(),
  organizationId: z.number().int(),
  isCurrent: z.boolean().optional()
}).strict();
export const UserOrganizationCreateManyInputObjectSchema: z.ZodType<Prisma.UserOrganizationCreateManyInput> = makeSchema() as unknown as z.ZodType<Prisma.UserOrganizationCreateManyInput>;
export const UserOrganizationCreateManyInputObjectZodSchema = makeSchema();
