import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { IntWithAggregatesFilterObjectSchema as IntWithAggregatesFilterObjectSchema } from './IntWithAggregatesFilter.schema';
import { BoolWithAggregatesFilterObjectSchema as BoolWithAggregatesFilterObjectSchema } from './BoolWithAggregatesFilter.schema'

const userorganizationscalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => UserOrganizationScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => UserOrganizationScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => UserOrganizationScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => UserOrganizationScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => UserOrganizationScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number().int()]).optional(),
  userId: z.union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number().int()]).optional(),
  organizationId: z.union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number().int()]).optional(),
  isCurrent: z.union([z.lazy(() => BoolWithAggregatesFilterObjectSchema), z.boolean()]).optional()
}).strict();
export const UserOrganizationScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.UserOrganizationScalarWhereWithAggregatesInput> = userorganizationscalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.UserOrganizationScalarWhereWithAggregatesInput>;
export const UserOrganizationScalarWhereWithAggregatesInputObjectZodSchema = userorganizationscalarwherewithaggregatesinputSchema;
