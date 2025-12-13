import type { Prisma } from '../../prisma';
import { z } from 'zod';
import { UserOrganizationSelectObjectSchema as UserOrganizationSelectObjectSchema } from './objects/UserOrganizationSelect.schema';
import { UserOrganizationIncludeObjectSchema as UserOrganizationIncludeObjectSchema } from './objects/UserOrganizationInclude.schema';
import { UserOrganizationWhereUniqueInputObjectSchema as UserOrganizationWhereUniqueInputObjectSchema } from './objects/UserOrganizationWhereUniqueInput.schema';

export const UserOrganizationFindUniqueOrThrowSchema: z.ZodType<Prisma.UserOrganizationFindUniqueOrThrowArgs> = z.object({ select: UserOrganizationSelectObjectSchema.optional(), include: UserOrganizationIncludeObjectSchema.optional(), where: UserOrganizationWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.UserOrganizationFindUniqueOrThrowArgs>;

export const UserOrganizationFindUniqueOrThrowZodSchema = z.object({ select: UserOrganizationSelectObjectSchema.optional(), include: UserOrganizationIncludeObjectSchema.optional(), where: UserOrganizationWhereUniqueInputObjectSchema }).strict();