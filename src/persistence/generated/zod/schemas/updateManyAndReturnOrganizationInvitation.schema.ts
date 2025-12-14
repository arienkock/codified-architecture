import type { Prisma } from '../../prisma';
import { z } from 'zod';
import { OrganizationInvitationSelectObjectSchema as OrganizationInvitationSelectObjectSchema } from './objects/OrganizationInvitationSelect.schema';
import { OrganizationInvitationUpdateManyMutationInputObjectSchema as OrganizationInvitationUpdateManyMutationInputObjectSchema } from './objects/OrganizationInvitationUpdateManyMutationInput.schema';
import { OrganizationInvitationWhereInputObjectSchema as OrganizationInvitationWhereInputObjectSchema } from './objects/OrganizationInvitationWhereInput.schema';

export const OrganizationInvitationUpdateManyAndReturnSchema: z.ZodType<Prisma.OrganizationInvitationUpdateManyAndReturnArgs> = z.object({ select: OrganizationInvitationSelectObjectSchema.optional(), data: OrganizationInvitationUpdateManyMutationInputObjectSchema, where: OrganizationInvitationWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.OrganizationInvitationUpdateManyAndReturnArgs>;

export const OrganizationInvitationUpdateManyAndReturnZodSchema = z.object({ select: OrganizationInvitationSelectObjectSchema.optional(), data: OrganizationInvitationUpdateManyMutationInputObjectSchema, where: OrganizationInvitationWhereInputObjectSchema.optional() }).strict();