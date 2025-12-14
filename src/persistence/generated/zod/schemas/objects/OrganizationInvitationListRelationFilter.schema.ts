import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { OrganizationInvitationWhereInputObjectSchema as OrganizationInvitationWhereInputObjectSchema } from './OrganizationInvitationWhereInput.schema'

const makeSchema = () => z.object({
  every: z.lazy(() => OrganizationInvitationWhereInputObjectSchema).optional(),
  some: z.lazy(() => OrganizationInvitationWhereInputObjectSchema).optional(),
  none: z.lazy(() => OrganizationInvitationWhereInputObjectSchema).optional()
}).strict();
export const OrganizationInvitationListRelationFilterObjectSchema: z.ZodType<Prisma.OrganizationInvitationListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.OrganizationInvitationListRelationFilter>;
export const OrganizationInvitationListRelationFilterObjectZodSchema = makeSchema();
