import type { Prisma } from '../../prisma';
import { z } from 'zod';
import { OrganizationInvitationSelectObjectSchema as OrganizationInvitationSelectObjectSchema } from './objects/OrganizationInvitationSelect.schema';
import { OrganizationInvitationIncludeObjectSchema as OrganizationInvitationIncludeObjectSchema } from './objects/OrganizationInvitationInclude.schema';
import { OrganizationInvitationUpdateInputObjectSchema as OrganizationInvitationUpdateInputObjectSchema } from './objects/OrganizationInvitationUpdateInput.schema';
import { OrganizationInvitationUncheckedUpdateInputObjectSchema as OrganizationInvitationUncheckedUpdateInputObjectSchema } from './objects/OrganizationInvitationUncheckedUpdateInput.schema';
import { OrganizationInvitationWhereUniqueInputObjectSchema as OrganizationInvitationWhereUniqueInputObjectSchema } from './objects/OrganizationInvitationWhereUniqueInput.schema';

export const OrganizationInvitationUpdateOneSchema: z.ZodType<Prisma.OrganizationInvitationUpdateArgs> = z.object({ select: OrganizationInvitationSelectObjectSchema.optional(), include: OrganizationInvitationIncludeObjectSchema.optional(), data: z.union([OrganizationInvitationUpdateInputObjectSchema, OrganizationInvitationUncheckedUpdateInputObjectSchema]), where: OrganizationInvitationWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.OrganizationInvitationUpdateArgs>;

export const OrganizationInvitationUpdateOneZodSchema = z.object({ select: OrganizationInvitationSelectObjectSchema.optional(), include: OrganizationInvitationIncludeObjectSchema.optional(), data: z.union([OrganizationInvitationUpdateInputObjectSchema, OrganizationInvitationUncheckedUpdateInputObjectSchema]), where: OrganizationInvitationWhereUniqueInputObjectSchema }).strict();