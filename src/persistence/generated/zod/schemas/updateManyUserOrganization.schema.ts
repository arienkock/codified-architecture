import type { Prisma } from '../../prisma';
import { z } from 'zod';
import { UserOrganizationUpdateManyMutationInputObjectSchema as UserOrganizationUpdateManyMutationInputObjectSchema } from './objects/UserOrganizationUpdateManyMutationInput.schema';
import { UserOrganizationWhereInputObjectSchema as UserOrganizationWhereInputObjectSchema } from './objects/UserOrganizationWhereInput.schema';

export const UserOrganizationUpdateManySchema: z.ZodType<Prisma.UserOrganizationUpdateManyArgs> = z.object({ data: UserOrganizationUpdateManyMutationInputObjectSchema, where: UserOrganizationWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.UserOrganizationUpdateManyArgs>;

export const UserOrganizationUpdateManyZodSchema = z.object({ data: UserOrganizationUpdateManyMutationInputObjectSchema, where: UserOrganizationWhereInputObjectSchema.optional() }).strict();