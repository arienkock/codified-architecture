import { z } from 'zod';
export const UserOrganizationGroupByResultSchema = z.array(z.object({
  id: z.number().int(),
  userId: z.number().int(),
  organizationId: z.number().int(),
  isCurrent: z.boolean(),
  _count: z.object({
    id: z.number(),
    userId: z.number(),
    organizationId: z.number(),
    isCurrent: z.number(),
    user: z.number(),
    organization: z.number()
  }).optional(),
  _sum: z.object({
    id: z.number().nullable(),
    userId: z.number().nullable(),
    organizationId: z.number().nullable()
  }).nullable().optional(),
  _avg: z.object({
    id: z.number().nullable(),
    userId: z.number().nullable(),
    organizationId: z.number().nullable()
  }).nullable().optional(),
  _min: z.object({
    id: z.number().int().nullable(),
    userId: z.number().int().nullable(),
    organizationId: z.number().int().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.number().int().nullable(),
    userId: z.number().int().nullable(),
    organizationId: z.number().int().nullable()
  }).nullable().optional()
}));