import { z } from 'zod';
export const OrganizationCreateResultSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  members: z.array(z.unknown()),
  invitations: z.array(z.unknown())
});