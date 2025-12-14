import type { Prisma } from '../../prisma';
import { z } from 'zod';
import { OrganizationInvitationIncludeObjectSchema as OrganizationInvitationIncludeObjectSchema } from './objects/OrganizationInvitationInclude.schema';
import { OrganizationInvitationOrderByWithRelationInputObjectSchema as OrganizationInvitationOrderByWithRelationInputObjectSchema } from './objects/OrganizationInvitationOrderByWithRelationInput.schema';
import { OrganizationInvitationWhereInputObjectSchema as OrganizationInvitationWhereInputObjectSchema } from './objects/OrganizationInvitationWhereInput.schema';
import { OrganizationInvitationWhereUniqueInputObjectSchema as OrganizationInvitationWhereUniqueInputObjectSchema } from './objects/OrganizationInvitationWhereUniqueInput.schema';
import { OrganizationInvitationScalarFieldEnumSchema as OrganizationInvitationScalarFieldEnum } from './enums/OrganizationInvitationScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const OrganizationInvitationFindManySelectSchema: z.ZodType<Prisma.OrganizationInvitationSelect> = z.object({
    id: z.boolean().optional(),
    issuedAt: z.boolean().optional(),
    accepted: z.boolean().optional(),
    ttlMinutes: z.boolean().optional(),
    userId: z.boolean().optional(),
    organizationId: z.boolean().optional(),
    user: z.boolean().optional(),
    organization: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.OrganizationInvitationSelect>;

export const OrganizationInvitationFindManySelectZodSchema = z.object({
    id: z.boolean().optional(),
    issuedAt: z.boolean().optional(),
    accepted: z.boolean().optional(),
    ttlMinutes: z.boolean().optional(),
    userId: z.boolean().optional(),
    organizationId: z.boolean().optional(),
    user: z.boolean().optional(),
    organization: z.boolean().optional()
  }).strict();

export const OrganizationInvitationFindManySchema: z.ZodType<Prisma.OrganizationInvitationFindManyArgs> = z.object({ select: OrganizationInvitationFindManySelectSchema.optional(), include: z.lazy(() => OrganizationInvitationIncludeObjectSchema.optional()), orderBy: z.union([OrganizationInvitationOrderByWithRelationInputObjectSchema, OrganizationInvitationOrderByWithRelationInputObjectSchema.array()]).optional(), where: OrganizationInvitationWhereInputObjectSchema.optional(), cursor: OrganizationInvitationWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([OrganizationInvitationScalarFieldEnum, OrganizationInvitationScalarFieldEnum.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.OrganizationInvitationFindManyArgs>;

export const OrganizationInvitationFindManyZodSchema = z.object({ select: OrganizationInvitationFindManySelectSchema.optional(), include: z.lazy(() => OrganizationInvitationIncludeObjectSchema.optional()), orderBy: z.union([OrganizationInvitationOrderByWithRelationInputObjectSchema, OrganizationInvitationOrderByWithRelationInputObjectSchema.array()]).optional(), where: OrganizationInvitationWhereInputObjectSchema.optional(), cursor: OrganizationInvitationWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([OrganizationInvitationScalarFieldEnum, OrganizationInvitationScalarFieldEnum.array()]).optional() }).strict();