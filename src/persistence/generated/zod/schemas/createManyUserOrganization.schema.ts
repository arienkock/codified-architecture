import type { Prisma } from '../../prisma';
import { z } from 'zod';
import { UserOrganizationCreateManyInputObjectSchema as UserOrganizationCreateManyInputObjectSchema } from './objects/UserOrganizationCreateManyInput.schema';

export const UserOrganizationCreateManySchema: z.ZodType<Prisma.UserOrganizationCreateManyArgs> = z.object({ data: z.union([ UserOrganizationCreateManyInputObjectSchema, z.array(UserOrganizationCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.UserOrganizationCreateManyArgs>;

export const UserOrganizationCreateManyZodSchema = z.object({ data: z.union([ UserOrganizationCreateManyInputObjectSchema, z.array(UserOrganizationCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();