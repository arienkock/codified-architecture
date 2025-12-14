import { z } from 'zod';
import type { Prisma } from '../../../prisma';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  userId: z.literal(true).optional(),
  organizationId: z.literal(true).optional(),
  isCurrent: z.literal(true).optional(),
  isAdmin: z.literal(true).optional()
}).strict();
export const UserOrganizationMaxAggregateInputObjectSchema: z.ZodType<Prisma.UserOrganizationMaxAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.UserOrganizationMaxAggregateInputType>;
export const UserOrganizationMaxAggregateInputObjectZodSchema = makeSchema();
