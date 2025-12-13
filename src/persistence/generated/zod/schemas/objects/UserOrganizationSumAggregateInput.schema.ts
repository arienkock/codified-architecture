import { z } from 'zod';
import type { Prisma } from '../../../prisma';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  userId: z.literal(true).optional(),
  organizationId: z.literal(true).optional()
}).strict();
export const UserOrganizationSumAggregateInputObjectSchema: z.ZodType<Prisma.UserOrganizationSumAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.UserOrganizationSumAggregateInputType>;
export const UserOrganizationSumAggregateInputObjectZodSchema = makeSchema();
