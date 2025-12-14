import { z } from 'zod';
export const OrganizationInvitationFindUniqueResultSchema = z.nullable(z.object({
  id: z.number().int(),
  issuedAt: z.date(),
  accepted: z.boolean(),
  ttlMinutes: z.number().int(),
  userId: z.number().int(),
  organizationId: z.number().int(),
  user: z.unknown(),
  organization: z.unknown()
}));