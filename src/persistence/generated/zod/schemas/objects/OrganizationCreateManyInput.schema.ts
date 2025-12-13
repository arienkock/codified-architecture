import { z } from 'zod';
import type { Prisma } from '../../../prisma';


const makeSchema = () => z.object({
  id: z.number().int().optional(),
  name: z.string()
}).strict();
export const OrganizationCreateManyInputObjectSchema: z.ZodType<Prisma.OrganizationCreateManyInput> = makeSchema() as unknown as z.ZodType<Prisma.OrganizationCreateManyInput>;
export const OrganizationCreateManyInputObjectZodSchema = makeSchema();
