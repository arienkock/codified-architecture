import { z } from 'zod';
import type { Prisma } from '../../../prisma';


const makeSchema = () => z.object({
  id: z.number().int().optional(),
  email: z.string(),
  name: z.string().optional().nullable(),
  hashedPassword: z.string()
}).strict();
export const UserUncheckedCreateWithoutOrganizationsInputObjectSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutOrganizationsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUncheckedCreateWithoutOrganizationsInput>;
export const UserUncheckedCreateWithoutOrganizationsInputObjectZodSchema = makeSchema();
