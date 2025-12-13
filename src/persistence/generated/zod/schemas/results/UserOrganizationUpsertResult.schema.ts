import { z } from 'zod';
export const UserOrganizationUpsertResultSchema = z.object({
  id: z.number().int(),
  userId: z.number().int(),
  organizationId: z.number().int(),
  isCurrent: z.boolean(),
  user: z.unknown(),
  organization: z.unknown()
});