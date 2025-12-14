import { z } from 'zod';
import type { Prisma } from '../../../prisma';


const makeSchema = () => z.object({
  id: z.number().int().optional(),
  userId: z.number().int(),
  organizationId: z.number().int(),
  isCurrent: z.boolean().optional(),
  isAdmin: z.boolean().optional()
}).strict();
export const UserOrganizationUncheckedCreateInputObjectSchema: z.ZodType<Prisma.UserOrganizationUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.UserOrganizationUncheckedCreateInput>;
export const UserOrganizationUncheckedCreateInputObjectZodSchema = makeSchema();
