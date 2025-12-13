import type { Prisma } from '../../prisma';
import { z } from 'zod';
import { UserOrganizationSelectObjectSchema as UserOrganizationSelectObjectSchema } from './objects/UserOrganizationSelect.schema';
import { UserOrganizationUpdateManyMutationInputObjectSchema as UserOrganizationUpdateManyMutationInputObjectSchema } from './objects/UserOrganizationUpdateManyMutationInput.schema';
import { UserOrganizationWhereInputObjectSchema as UserOrganizationWhereInputObjectSchema } from './objects/UserOrganizationWhereInput.schema';

export const UserOrganizationUpdateManyAndReturnSchema: z.ZodType<Prisma.UserOrganizationUpdateManyAndReturnArgs> = z.object({ select: UserOrganizationSelectObjectSchema.optional(), data: UserOrganizationUpdateManyMutationInputObjectSchema, where: UserOrganizationWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.UserOrganizationUpdateManyAndReturnArgs>;

export const UserOrganizationUpdateManyAndReturnZodSchema = z.object({ select: UserOrganizationSelectObjectSchema.optional(), data: UserOrganizationUpdateManyMutationInputObjectSchema, where: UserOrganizationWhereInputObjectSchema.optional() }).strict();