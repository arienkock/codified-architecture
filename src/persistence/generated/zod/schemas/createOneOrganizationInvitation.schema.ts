import type { Prisma } from '../../prisma';
import { z } from 'zod';
import { OrganizationInvitationSelectObjectSchema as OrganizationInvitationSelectObjectSchema } from './objects/OrganizationInvitationSelect.schema';
import { OrganizationInvitationIncludeObjectSchema as OrganizationInvitationIncludeObjectSchema } from './objects/OrganizationInvitationInclude.schema';
import { OrganizationInvitationCreateInputObjectSchema as OrganizationInvitationCreateInputObjectSchema } from './objects/OrganizationInvitationCreateInput.schema';
import { OrganizationInvitationUncheckedCreateInputObjectSchema as OrganizationInvitationUncheckedCreateInputObjectSchema } from './objects/OrganizationInvitationUncheckedCreateInput.schema';

export const OrganizationInvitationCreateOneSchema: z.ZodType<Prisma.OrganizationInvitationCreateArgs> = z.object({ select: OrganizationInvitationSelectObjectSchema.optional(), include: OrganizationInvitationIncludeObjectSchema.optional(), data: z.union([OrganizationInvitationCreateInputObjectSchema, OrganizationInvitationUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.OrganizationInvitationCreateArgs>;

export const OrganizationInvitationCreateOneZodSchema = z.object({ select: OrganizationInvitationSelectObjectSchema.optional(), include: OrganizationInvitationIncludeObjectSchema.optional(), data: z.union([OrganizationInvitationCreateInputObjectSchema, OrganizationInvitationUncheckedCreateInputObjectSchema]) }).strict();