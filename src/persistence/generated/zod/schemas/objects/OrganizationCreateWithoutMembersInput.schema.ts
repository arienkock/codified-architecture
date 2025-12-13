import { z } from 'zod';
import type { Prisma } from '../../../prisma';


const makeSchema = () => z.object({
  name: z.string()
}).strict();
export const OrganizationCreateWithoutMembersInputObjectSchema: z.ZodType<Prisma.OrganizationCreateWithoutMembersInput> = makeSchema() as unknown as z.ZodType<Prisma.OrganizationCreateWithoutMembersInput>;
export const OrganizationCreateWithoutMembersInputObjectZodSchema = makeSchema();
