import type { Prisma } from '../../prisma';
import { z } from 'zod';
import { UserOrganizationWhereInputObjectSchema as UserOrganizationWhereInputObjectSchema } from './objects/UserOrganizationWhereInput.schema';

export const UserOrganizationDeleteManySchema: z.ZodType<Prisma.UserOrganizationDeleteManyArgs> = z.object({ where: UserOrganizationWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.UserOrganizationDeleteManyArgs>;

export const UserOrganizationDeleteManyZodSchema = z.object({ where: UserOrganizationWhereInputObjectSchema.optional() }).strict();