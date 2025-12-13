import { z } from 'zod';
export const OrganizationUpdateResultSchema = z.nullable(z.object({
  id: z.number().int(),
  name: z.string(),
  members: z.array(z.unknown())
}));