import { z } from 'zod';
import type { Prisma } from '../../../prisma';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  userId: z.literal(true).optional(),
  organizationId: z.literal(true).optional()
}).strict();
export const UserOrganizationAvgAggregateInputObjectSchema: z.ZodType<Prisma.UserOrganizationAvgAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.UserOrganizationAvgAggregateInputType>;
export const UserOrganizationAvgAggregateInputObjectZodSchema = makeSchema();
