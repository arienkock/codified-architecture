import { z } from 'zod';
import type { Prisma } from '../../../prisma';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  name: z.literal(true).optional()
}).strict();
export const OrganizationMinAggregateInputObjectSchema: z.ZodType<Prisma.OrganizationMinAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.OrganizationMinAggregateInputType>;
export const OrganizationMinAggregateInputObjectZodSchema = makeSchema();
