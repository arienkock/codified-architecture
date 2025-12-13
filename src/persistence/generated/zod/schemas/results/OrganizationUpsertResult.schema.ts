import { z } from 'zod';
export const OrganizationUpsertResultSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  members: z.array(z.unknown())
});