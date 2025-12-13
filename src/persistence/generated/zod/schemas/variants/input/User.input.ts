import { z } from 'zod';

// prettier-ignore
export const UserInputSchema = z.object({
    id: z.number().int(),
    email: z.string(),
    name: z.string().optional().nullable(),
    hashedPassword: z.string(),
    organizations: z.array(z.unknown())
}).strict();

export type UserInputType = z.infer<typeof UserInputSchema>;
