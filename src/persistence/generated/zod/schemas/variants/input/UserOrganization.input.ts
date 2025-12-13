import { z } from 'zod';

// prettier-ignore
export const UserOrganizationInputSchema = z.object({
    id: z.number().int(),
    userId: z.number().int(),
    organizationId: z.number().int(),
    isCurrent: z.boolean(),
    user: z.unknown(),
    organization: z.unknown()
}).strict();

export type UserOrganizationInputType = z.infer<typeof UserOrganizationInputSchema>;
