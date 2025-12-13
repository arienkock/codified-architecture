import type { Prisma } from '../../prisma';
import { z } from 'zod';
import { UserOrganizationSelectObjectSchema as UserOrganizationSelectObjectSchema } from './objects/UserOrganizationSelect.schema';
import { UserOrganizationIncludeObjectSchema as UserOrganizationIncludeObjectSchema } from './objects/UserOrganizationInclude.schema';
import { UserOrganizationUpdateInputObjectSchema as UserOrganizationUpdateInputObjectSchema } from './objects/UserOrganizationUpdateInput.schema';
import { UserOrganizationUncheckedUpdateInputObjectSchema as UserOrganizationUncheckedUpdateInputObjectSchema } from './objects/UserOrganizationUncheckedUpdateInput.schema';
import { UserOrganizationWhereUniqueInputObjectSchema as UserOrganizationWhereUniqueInputObjectSchema } from './objects/UserOrganizationWhereUniqueInput.schema';

export const UserOrganizationUpdateOneSchema: z.ZodType<Prisma.UserOrganizationUpdateArgs> = z.object({ select: UserOrganizationSelectObjectSchema.optional(), include: UserOrganizationIncludeObjectSchema.optional(), data: z.union([UserOrganizationUpdateInputObjectSchema, UserOrganizationUncheckedUpdateInputObjectSchema]), where: UserOrganizationWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.UserOrganizationUpdateArgs>;

export const UserOrganizationUpdateOneZodSchema = z.object({ select: UserOrganizationSelectObjectSchema.optional(), include: UserOrganizationIncludeObjectSchema.optional(), data: z.union([UserOrganizationUpdateInputObjectSchema, UserOrganizationUncheckedUpdateInputObjectSchema]), where: UserOrganizationWhereUniqueInputObjectSchema }).strict();