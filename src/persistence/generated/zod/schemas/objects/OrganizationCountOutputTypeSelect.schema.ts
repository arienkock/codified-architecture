import { z } from 'zod';
import type { Prisma } from '../../../prisma';


const makeSchema = () => z.object({
  members: z.boolean().optional(),
  invitations: z.boolean().optional()
}).strict();
export const OrganizationCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.OrganizationCountOutputTypeSelect> = makeSchema() as unknown as z.ZodType<Prisma.OrganizationCountOutputTypeSelect>;
export const OrganizationCountOutputTypeSelectObjectZodSchema = makeSchema();
