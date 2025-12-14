import type { Prisma } from '../../prisma';
import { z } from 'zod';
import { OrganizationInvitationSelectObjectSchema as OrganizationInvitationSelectObjectSchema } from './objects/OrganizationInvitationSelect.schema';
import { OrganizationInvitationIncludeObjectSchema as OrganizationInvitationIncludeObjectSchema } from './objects/OrganizationInvitationInclude.schema';
import { OrganizationInvitationWhereUniqueInputObjectSchema as OrganizationInvitationWhereUniqueInputObjectSchema } from './objects/OrganizationInvitationWhereUniqueInput.schema';

export const OrganizationInvitationFindUniqueSchema: z.ZodType<Prisma.OrganizationInvitationFindUniqueArgs> = z.object({ select: OrganizationInvitationSelectObjectSchema.optional(), include: OrganizationInvitationIncludeObjectSchema.optional(), where: OrganizationInvitationWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.OrganizationInvitationFindUniqueArgs>;

export const OrganizationInvitationFindUniqueZodSchema = z.object({ select: OrganizationInvitationSelectObjectSchema.optional(), include: OrganizationInvitationIncludeObjectSchema.optional(), where: OrganizationInvitationWhereUniqueInputObjectSchema }).strict();