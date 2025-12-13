import type { Prisma } from '../../prisma';
import { z } from 'zod';
import { UserOrganizationSelectObjectSchema as UserOrganizationSelectObjectSchema } from './objects/UserOrganizationSelect.schema';
import { UserOrganizationIncludeObjectSchema as UserOrganizationIncludeObjectSchema } from './objects/UserOrganizationInclude.schema';
import { UserOrganizationCreateInputObjectSchema as UserOrganizationCreateInputObjectSchema } from './objects/UserOrganizationCreateInput.schema';
import { UserOrganizationUncheckedCreateInputObjectSchema as UserOrganizationUncheckedCreateInputObjectSchema } from './objects/UserOrganizationUncheckedCreateInput.schema';

export const UserOrganizationCreateOneSchema: z.ZodType<Prisma.UserOrganizationCreateArgs> = z.object({ select: UserOrganizationSelectObjectSchema.optional(), include: UserOrganizationIncludeObjectSchema.optional(), data: z.union([UserOrganizationCreateInputObjectSchema, UserOrganizationUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.UserOrganizationCreateArgs>;

export const UserOrganizationCreateOneZodSchema = z.object({ select: UserOrganizationSelectObjectSchema.optional(), include: UserOrganizationIncludeObjectSchema.optional(), data: z.union([UserOrganizationCreateInputObjectSchema, UserOrganizationUncheckedCreateInputObjectSchema]) }).strict();