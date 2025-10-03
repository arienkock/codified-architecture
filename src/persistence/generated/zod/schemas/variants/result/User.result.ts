import { z } from 'zod';

// prettier-ignore
export const UserResultSchema = z.object({
    id: z.number().int(),
    email: z.string(),
    name: z.string().nullable(),
    hashedPassword: z.string()
}).strict();

export type UserResultType = z.infer<typeof UserResultSchema>;
