import { z } from 'zod';
import type { Prisma } from '../../../prisma';


const makeSchema = () => z.object({
  id: z.number().int().optional(),
  userId: z.number().int(),
  isCurrent: z.boolean().optional(),
  isAdmin: z.boolean().optional()
}).strict();
export const UserOrganizationUncheckedCreateWithoutOrganizationInputObjectSchema: z.ZodType<Prisma.UserOrganizationUncheckedCreateWithoutOrganizationInput> = makeSchema() as unknown as z.ZodType<Prisma.UserOrganizationUncheckedCreateWithoutOrganizationInput>;
export const UserOrganizationUncheckedCreateWithoutOrganizationInputObjectZodSchema = makeSchema();
