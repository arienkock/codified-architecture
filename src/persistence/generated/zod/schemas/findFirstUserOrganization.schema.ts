import type { Prisma } from '../../prisma';
import { z } from 'zod';
import { UserOrganizationIncludeObjectSchema as UserOrganizationIncludeObjectSchema } from './objects/UserOrganizationInclude.schema';
import { UserOrganizationOrderByWithRelationInputObjectSchema as UserOrganizationOrderByWithRelationInputObjectSchema } from './objects/UserOrganizationOrderByWithRelationInput.schema';
import { UserOrganizationWhereInputObjectSchema as UserOrganizationWhereInputObjectSchema } from './objects/UserOrganizationWhereInput.schema';
import { UserOrganizationWhereUniqueInputObjectSchema as UserOrganizationWhereUniqueInputObjectSchema } from './objects/UserOrganizationWhereUniqueInput.schema';
import { UserOrganizationScalarFieldEnumSchema as UserOrganizationScalarFieldEnum } from './enums/UserOrganizationScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const UserOrganizationFindFirstSelectSchema: z.ZodType<Prisma.UserOrganizationSelect> = z.object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    organizationId: z.boolean().optional(),
    isCurrent: z.boolean().optional(),
    user: z.boolean().optional(),
    organization: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.UserOrganizationSelect>;

export const UserOrganizationFindFirstSelectZodSchema = z.object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    organizationId: z.boolean().optional(),
    isCurrent: z.boolean().optional(),
    user: z.boolean().optional(),
    organization: z.boolean().optional()
  }).strict();

export const UserOrganizationFindFirstSchema: z.ZodType<Prisma.UserOrganizationFindFirstArgs> = z.object({ select: UserOrganizationFindFirstSelectSchema.optional(), include: z.lazy(() => UserOrganizationIncludeObjectSchema.optional()), orderBy: z.union([UserOrganizationOrderByWithRelationInputObjectSchema, UserOrganizationOrderByWithRelationInputObjectSchema.array()]).optional(), where: UserOrganizationWhereInputObjectSchema.optional(), cursor: UserOrganizationWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([UserOrganizationScalarFieldEnum, UserOrganizationScalarFieldEnum.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.UserOrganizationFindFirstArgs>;

export const UserOrganizationFindFirstZodSchema = z.object({ select: UserOrganizationFindFirstSelectSchema.optional(), include: z.lazy(() => UserOrganizationIncludeObjectSchema.optional()), orderBy: z.union([UserOrganizationOrderByWithRelationInputObjectSchema, UserOrganizationOrderByWithRelationInputObjectSchema.array()]).optional(), where: UserOrganizationWhereInputObjectSchema.optional(), cursor: UserOrganizationWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([UserOrganizationScalarFieldEnum, UserOrganizationScalarFieldEnum.array()]).optional() }).strict();