import { z } from 'zod';
import type { Prisma } from '../../../prisma';


const makeSchema = () => z.object({
  id: z.literal(true).optional()
}).strict();
export const UserSumAggregateInputObjectSchema: z.ZodType<Prisma.UserSumAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.UserSumAggregateInputType>;
export const UserSumAggregateInputObjectZodSchema = makeSchema();
