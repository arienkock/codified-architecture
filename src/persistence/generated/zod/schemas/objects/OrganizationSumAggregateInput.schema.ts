import { z } from 'zod';
import type { Prisma } from '../../../prisma';


const makeSchema = () => z.object({
  id: z.literal(true).optional()
}).strict();
export const OrganizationSumAggregateInputObjectSchema: z.ZodType<Prisma.OrganizationSumAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.OrganizationSumAggregateInputType>;
export const OrganizationSumAggregateInputObjectZodSchema = makeSchema();
