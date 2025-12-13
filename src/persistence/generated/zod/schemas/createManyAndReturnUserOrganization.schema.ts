import type { Prisma } from '../../prisma';
import { z } from 'zod';
import { UserOrganizationSelectObjectSchema as UserOrganizationSelectObjectSchema } from './objects/UserOrganizationSelect.schema';
import { UserOrganizationCreateManyInputObjectSchema as UserOrganizationCreateManyInputObjectSchema } from './objects/UserOrganizationCreateManyInput.schema';

export const UserOrganizationCreateManyAndReturnSchema: z.ZodType<Prisma.UserOrganizationCreateManyAndReturnArgs> = z.object({ select: UserOrganizationSelectObjectSchema.optional(), data: z.union([ UserOrganizationCreateManyInputObjectSchema, z.array(UserOrganizationCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.UserOrganizationCreateManyAndReturnArgs>;

export const UserOrganizationCreateManyAndReturnZodSchema = z.object({ select: UserOrganizationSelectObjectSchema.optional(), data: z.union([ UserOrganizationCreateManyInputObjectSchema, z.array(UserOrganizationCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();