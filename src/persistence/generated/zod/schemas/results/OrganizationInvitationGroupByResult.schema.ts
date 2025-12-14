import { z } from 'zod';
export const OrganizationInvitationGroupByResultSchema = z.array(z.object({
  id: z.number().int(),
  issuedAt: z.date(),
  accepted: z.boolean(),
  ttlMinutes: z.number().int(),
  userId: z.number().int(),
  organizationId: z.number().int(),
  _count: z.object({
    id: z.number(),
    issuedAt: z.number(),
    accepted: z.number(),
    ttlMinutes: z.number(),
    userId: z.number(),
    organizationId: z.number(),
    user: z.number(),
    organization: z.number()
  }).optional(),
  _sum: z.object({
    id: z.number().nullable(),
    ttlMinutes: z.number().nullable(),
    userId: z.number().nullable(),
    organizationId: z.number().nullable()
  }).nullable().optional(),
  _avg: z.object({
    id: z.number().nullable(),
    ttlMinutes: z.number().nullable(),
    userId: z.number().nullable(),
    organizationId: z.number().nullable()
  }).nullable().optional(),
  _min: z.object({
    id: z.number().int().nullable(),
    issuedAt: z.date().nullable(),
    ttlMinutes: z.number().int().nullable(),
    userId: z.number().int().nullable(),
    organizationId: z.number().int().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.number().int().nullable(),
    issuedAt: z.date().nullable(),
    ttlMinutes: z.number().int().nullable(),
    userId: z.number().int().nullable(),
    organizationId: z.number().int().nullable()
  }).nullable().optional()
}));