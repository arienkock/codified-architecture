import { z } from 'zod';
import type { Prisma } from '../../../prisma';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  name: z.literal(true).optional()
}).strict();
export const OrganizationMaxAggregateInputObjectSchema: z.ZodType<Prisma.OrganizationMaxAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.OrganizationMaxAggregateInputType>;
export const OrganizationMaxAggregateInputObjectZodSchema = makeSchema();
