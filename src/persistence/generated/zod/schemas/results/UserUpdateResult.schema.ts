import { z } from 'zod';
export const UserUpdateResultSchema = z.nullable(z.object({
  id: z.number().int(),
  email: z.string(),
  name: z.string().optional(),
  hashedPassword: z.string()
}));