import { z } from 'zod';

// prettier-ignore
export const UserModelSchema = z.object({
    id: z.number().int(),
    email: z.string(),
    name: z.string().nullable(),
    hashedPassword: z.string()
}).strict();

export type UserModelType = z.infer<typeof UserModelSchema>;
