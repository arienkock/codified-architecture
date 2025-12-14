import type { Prisma } from '../../prisma';
import { z } from 'zod';
import { OrganizationInvitationCreateManyInputObjectSchema as OrganizationInvitationCreateManyInputObjectSchema } from './objects/OrganizationInvitationCreateManyInput.schema';

export const OrganizationInvitationCreateManySchema: z.ZodType<Prisma.OrganizationInvitationCreateManyArgs> = z.object({ data: z.union([ OrganizationInvitationCreateManyInputObjectSchema, z.array(OrganizationInvitationCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.OrganizationInvitationCreateManyArgs>;

export const OrganizationInvitationCreateManyZodSchema = z.object({ data: z.union([ OrganizationInvitationCreateManyInputObjectSchema, z.array(OrganizationInvitationCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();