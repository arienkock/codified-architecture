import type { Prisma } from '../../prisma';
import { z } from 'zod';
import { OrganizationInvitationSelectObjectSchema as OrganizationInvitationSelectObjectSchema } from './objects/OrganizationInvitationSelect.schema';
import { OrganizationInvitationCreateManyInputObjectSchema as OrganizationInvitationCreateManyInputObjectSchema } from './objects/OrganizationInvitationCreateManyInput.schema';

export const OrganizationInvitationCreateManyAndReturnSchema: z.ZodType<Prisma.OrganizationInvitationCreateManyAndReturnArgs> = z.object({ select: OrganizationInvitationSelectObjectSchema.optional(), data: z.union([ OrganizationInvitationCreateManyInputObjectSchema, z.array(OrganizationInvitationCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.OrganizationInvitationCreateManyAndReturnArgs>;

export const OrganizationInvitationCreateManyAndReturnZodSchema = z.object({ select: OrganizationInvitationSelectObjectSchema.optional(), data: z.union([ OrganizationInvitationCreateManyInputObjectSchema, z.array(OrganizationInvitationCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();