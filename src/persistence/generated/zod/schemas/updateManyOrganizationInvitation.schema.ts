import type { Prisma } from '../../prisma';
import { z } from 'zod';
import { OrganizationInvitationUpdateManyMutationInputObjectSchema as OrganizationInvitationUpdateManyMutationInputObjectSchema } from './objects/OrganizationInvitationUpdateManyMutationInput.schema';
import { OrganizationInvitationWhereInputObjectSchema as OrganizationInvitationWhereInputObjectSchema } from './objects/OrganizationInvitationWhereInput.schema';

export const OrganizationInvitationUpdateManySchema: z.ZodType<Prisma.OrganizationInvitationUpdateManyArgs> = z.object({ data: OrganizationInvitationUpdateManyMutationInputObjectSchema, where: OrganizationInvitationWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.OrganizationInvitationUpdateManyArgs>;

export const OrganizationInvitationUpdateManyZodSchema = z.object({ data: OrganizationInvitationUpdateManyMutationInputObjectSchema, where: OrganizationInvitationWhereInputObjectSchema.optional() }).strict();