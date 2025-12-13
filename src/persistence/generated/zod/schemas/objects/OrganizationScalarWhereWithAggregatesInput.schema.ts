import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { IntWithAggregatesFilterObjectSchema as IntWithAggregatesFilterObjectSchema } from './IntWithAggregatesFilter.schema';
import { StringWithAggregatesFilterObjectSchema as StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema'

const organizationscalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => OrganizationScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => OrganizationScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => OrganizationScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => OrganizationScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => OrganizationScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number().int()]).optional(),
  name: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional()
}).strict();
export const OrganizationScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.OrganizationScalarWhereWithAggregatesInput> = organizationscalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.OrganizationScalarWhereWithAggregatesInput>;
export const OrganizationScalarWhereWithAggregatesInputObjectZodSchema = organizationscalarwherewithaggregatesinputSchema;
