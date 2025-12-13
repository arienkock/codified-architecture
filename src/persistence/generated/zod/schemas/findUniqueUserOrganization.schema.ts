import type { Prisma } from '../../prisma';
import { z } from 'zod';
import { UserOrganizationSelectObjectSchema as UserOrganizationSelectObjectSchema } from './objects/UserOrganizationSelect.schema';
import { UserOrganizationIncludeObjectSchema as UserOrganizationIncludeObjectSchema } from './objects/UserOrganizationInclude.schema';
import { UserOrganizationWhereUniqueInputObjectSchema as UserOrganizationWhereUniqueInputObjectSchema } from './objects/UserOrganizationWhereUniqueInput.schema';

export const UserOrganizationFindUniqueSchema: z.ZodType<Prisma.UserOrganizationFindUniqueArgs> = z.object({ select: UserOrganizationSelectObjectSchema.optional(), include: UserOrganizationIncludeObjectSchema.optional(), where: UserOrganizationWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.UserOrganizationFindUniqueArgs>;

export const UserOrganizationFindUniqueZodSchema = z.object({ select: UserOrganizationSelectObjectSchema.optional(), include: UserOrganizationIncludeObjectSchema.optional(), where: UserOrganizationWhereUniqueInputObjectSchema }).strict();