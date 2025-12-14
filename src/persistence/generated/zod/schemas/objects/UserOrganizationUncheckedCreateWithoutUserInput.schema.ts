import { z } from 'zod';
import type { Prisma } from '../../../prisma';


const makeSchema = () => z.object({
  id: z.number().int().optional(),
  organizationId: z.number().int(),
  isCurrent: z.boolean().optional(),
  isAdmin: z.boolean().optional()
}).strict();
export const UserOrganizationUncheckedCreateWithoutUserInputObjectSchema: z.ZodType<Prisma.UserOrganizationUncheckedCreateWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.UserOrganizationUncheckedCreateWithoutUserInput>;
export const UserOrganizationUncheckedCreateWithoutUserInputObjectZodSchema = makeSchema();
