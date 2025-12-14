import { z } from 'zod';
export const OrganizationInvitationFindManyResultSchema = z.object({
  data: z.array(z.object({
  id: z.number().int(),
  issuedAt: z.date(),
  accepted: z.boolean(),
  ttlMinutes: z.number().int(),
  userId: z.number().int(),
  organizationId: z.number().int(),
  user: z.unknown(),
  organization: z.unknown()
})),
  pagination: z.object({
  page: z.number().int().min(1),
  pageSize: z.number().int().min(1),
  total: z.number().int().min(0),
  totalPages: z.number().int().min(0),
  hasNext: z.boolean(),
  hasPrev: z.boolean()
})
});