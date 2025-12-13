import { z } from 'zod';
export const OrganizationCreateManyResultSchema = z.object({
  count: z.number()
});