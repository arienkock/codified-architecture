import { z } from 'zod';
import type { Prisma } from '../../../prisma';


const makeSchema = () => z.object({
  id: z.literal(true).optional()
}).strict();
export const OrganizationAvgAggregateInputObjectSchema: z.ZodType<Prisma.OrganizationAvgAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.OrganizationAvgAggregateInputType>;
export const OrganizationAvgAggregateInputObjectZodSchema = makeSchema();
