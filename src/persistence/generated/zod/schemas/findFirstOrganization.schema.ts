import type { Prisma } from '../../prisma';
import { z } from 'zod';
import { OrganizationIncludeObjectSchema as OrganizationIncludeObjectSchema } from './objects/OrganizationInclude.schema';
import { OrganizationOrderByWithRelationInputObjectSchema as OrganizationOrderByWithRelationInputObjectSchema } from './objects/OrganizationOrderByWithRelationInput.schema';
import { OrganizationWhereInputObjectSchema as OrganizationWhereInputObjectSchema } from './objects/OrganizationWhereInput.schema';
import { OrganizationWhereUniqueInputObjectSchema as OrganizationWhereUniqueInputObjectSchema } from './objects/OrganizationWhereUniqueInput.schema';
import { OrganizationScalarFieldEnumSchema as OrganizationScalarFieldEnum } from './enums/OrganizationScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const OrganizationFindFirstSelectSchema: z.ZodType<Prisma.OrganizationSelect> = z.object({
    id: z.boolean().optional(),
    name: z.boolean().optional(),
    members: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.OrganizationSelect>;

export const OrganizationFindFirstSelectZodSchema = z.object({
    id: z.boolean().optional(),
    name: z.boolean().optional(),
    members: z.boolean().optional(),
    _count: z.boolean().optional()
  }).strict();

export const OrganizationFindFirstSchema: z.ZodType<Prisma.OrganizationFindFirstArgs> = z.object({ select: OrganizationFindFirstSelectSchema.optional(), include: z.lazy(() => OrganizationIncludeObjectSchema.optional()), orderBy: z.union([OrganizationOrderByWithRelationInputObjectSchema, OrganizationOrderByWithRelationInputObjectSchema.array()]).optional(), where: OrganizationWhereInputObjectSchema.optional(), cursor: OrganizationWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([OrganizationScalarFieldEnum, OrganizationScalarFieldEnum.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.OrganizationFindFirstArgs>;

export const OrganizationFindFirstZodSchema = z.object({ select: OrganizationFindFirstSelectSchema.optional(), include: z.lazy(() => OrganizationIncludeObjectSchema.optional()), orderBy: z.union([OrganizationOrderByWithRelationInputObjectSchema, OrganizationOrderByWithRelationInputObjectSchema.array()]).optional(), where: OrganizationWhereInputObjectSchema.optional(), cursor: OrganizationWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([OrganizationScalarFieldEnum, OrganizationScalarFieldEnum.array()]).optional() }).strict();