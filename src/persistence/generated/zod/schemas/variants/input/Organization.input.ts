import { z } from 'zod';

// prettier-ignore
export const OrganizationInputSchema = z.object({
    id: z.number().int(),
    name: z.string(),
    members: z.array(z.unknown()),
    invitations: z.array(z.unknown())
}).strict();

export type OrganizationInputType = z.infer<typeof OrganizationInputSchema>;
