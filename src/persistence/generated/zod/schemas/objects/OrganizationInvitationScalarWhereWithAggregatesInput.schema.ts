import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { IntWithAggregatesFilterObjectSchema as IntWithAggregatesFilterObjectSchema } from './IntWithAggregatesFilter.schema';
import { DateTimeWithAggregatesFilterObjectSchema as DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema';
import { BoolWithAggregatesFilterObjectSchema as BoolWithAggregatesFilterObjectSchema } from './BoolWithAggregatesFilter.schema'

const organizationinvitationscalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => OrganizationInvitationScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => OrganizationInvitationScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => OrganizationInvitationScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => OrganizationInvitationScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => OrganizationInvitationScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number().int()]).optional(),
  issuedAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional(),
  accepted: z.union([z.lazy(() => BoolWithAggregatesFilterObjectSchema), z.boolean()]).optional(),
  ttlMinutes: z.union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number().int()]).optional(),
  userId: z.union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number().int()]).optional(),
  organizationId: z.union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number().int()]).optional()
}).strict();
export const OrganizationInvitationScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.OrganizationInvitationScalarWhereWithAggregatesInput> = organizationinvitationscalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.OrganizationInvitationScalarWhereWithAggregatesInput>;
export const OrganizationInvitationScalarWhereWithAggregatesInputObjectZodSchema = organizationinvitationscalarwherewithaggregatesinputSchema;
