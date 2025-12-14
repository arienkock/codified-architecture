import { z } from 'zod';

// prettier-ignore
export const UserResultSchema = z.object({
    id: z.number().int(),
    email: z.string(),
    name: z.string().nullable(),
    hashedPassword: z.string(),
    organizations: z.array(z.unknown()),
    invitations: z.array(z.unknown())
}).strict();

export type UserResultType = z.infer<typeof UserResultSchema>;
