import type { Prisma } from '../../prisma';
import { z } from 'zod';
import { UserOrganizationSelectObjectSchema as UserOrganizationSelectObjectSchema } from './objects/UserOrganizationSelect.schema';
import { UserOrganizationIncludeObjectSchema as UserOrganizationIncludeObjectSchema } from './objects/UserOrganizationInclude.schema';
import { UserOrganizationWhereUniqueInputObjectSchema as UserOrganizationWhereUniqueInputObjectSchema } from './objects/UserOrganizationWhereUniqueInput.schema';
import { UserOrganizationCreateInputObjectSchema as UserOrganizationCreateInputObjectSchema } from './objects/UserOrganizationCreateInput.schema';
import { UserOrganizationUncheckedCreateInputObjectSchema as UserOrganizationUncheckedCreateInputObjectSchema } from './objects/UserOrganizationUncheckedCreateInput.schema';
import { UserOrganizationUpdateInputObjectSchema as UserOrganizationUpdateInputObjectSchema } from './objects/UserOrganizationUpdateInput.schema';
import { UserOrganizationUncheckedUpdateInputObjectSchema as UserOrganizationUncheckedUpdateInputObjectSchema } from './objects/UserOrganizationUncheckedUpdateInput.schema';

export const UserOrganizationUpsertOneSchema: z.ZodType<Prisma.UserOrganizationUpsertArgs> = z.object({ select: UserOrganizationSelectObjectSchema.optional(), include: UserOrganizationIncludeObjectSchema.optional(), where: UserOrganizationWhereUniqueInputObjectSchema, create: z.union([ UserOrganizationCreateInputObjectSchema, UserOrganizationUncheckedCreateInputObjectSchema ]), update: z.union([ UserOrganizationUpdateInputObjectSchema, UserOrganizationUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.UserOrganizationUpsertArgs>;

export const UserOrganizationUpsertOneZodSchema = z.object({ select: UserOrganizationSelectObjectSchema.optional(), include: UserOrganizationIncludeObjectSchema.optional(), where: UserOrganizationWhereUniqueInputObjectSchema, create: z.union([ UserOrganizationCreateInputObjectSchema, UserOrganizationUncheckedCreateInputObjectSchema ]), update: z.union([ UserOrganizationUpdateInputObjectSchema, UserOrganizationUncheckedUpdateInputObjectSchema ]) }).strict();