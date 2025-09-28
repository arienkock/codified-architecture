import { z } from 'zod';
export const UserUpsertResultSchema = z.object({
  id: z.number().int(),
  email: z.string(),
  name: z.string().optional(),
  hashedPassword: z.string()
});