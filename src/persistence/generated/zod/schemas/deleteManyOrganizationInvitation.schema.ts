import type { Prisma } from '../../prisma';
import { z } from 'zod';
import { OrganizationInvitationWhereInputObjectSchema as OrganizationInvitationWhereInputObjectSchema } from './objects/OrganizationInvitationWhereInput.schema';

export const OrganizationInvitationDeleteManySchema: z.ZodType<Prisma.OrganizationInvitationDeleteManyArgs> = z.object({ where: OrganizationInvitationWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.OrganizationInvitationDeleteManyArgs>;

export const OrganizationInvitationDeleteManyZodSchema = z.object({ where: OrganizationInvitationWhereInputObjectSchema.optional() }).strict();