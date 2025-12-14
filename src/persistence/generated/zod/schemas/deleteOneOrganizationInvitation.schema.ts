import type { Prisma } from '../../prisma';
import { z } from 'zod';
import { OrganizationInvitationSelectObjectSchema as OrganizationInvitationSelectObjectSchema } from './objects/OrganizationInvitationSelect.schema';
import { OrganizationInvitationIncludeObjectSchema as OrganizationInvitationIncludeObjectSchema } from './objects/OrganizationInvitationInclude.schema';
import { OrganizationInvitationWhereUniqueInputObjectSchema as OrganizationInvitationWhereUniqueInputObjectSchema } from './objects/OrganizationInvitationWhereUniqueInput.schema';

export const OrganizationInvitationDeleteOneSchema: z.ZodType<Prisma.OrganizationInvitationDeleteArgs> = z.object({ select: OrganizationInvitationSelectObjectSchema.optional(), include: OrganizationInvitationIncludeObjectSchema.optional(), where: OrganizationInvitationWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.OrganizationInvitationDeleteArgs>;

export const OrganizationInvitationDeleteOneZodSchema = z.object({ select: OrganizationInvitationSelectObjectSchema.optional(), include: OrganizationInvitationIncludeObjectSchema.optional(), where: OrganizationInvitationWhereUniqueInputObjectSchema }).strict();