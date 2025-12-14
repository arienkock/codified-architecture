import { z } from 'zod';
export const OrganizationAggregateResultSchema = z.object({  _count: z.object({
    id: z.number(),
    name: z.number(),
    members: z.number(),
    invitations: z.number()
  }).optional(),
  _sum: z.object({
    id: z.number().nullable()
  }).nullable().optional(),
  _avg: z.object({
    id: z.number().nullable()
  }).nullable().optional(),
  _min: z.object({
    id: z.number().int().nullable(),
    name: z.string().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.number().int().nullable(),
    name: z.string().nullable()
  }).nullable().optional()});