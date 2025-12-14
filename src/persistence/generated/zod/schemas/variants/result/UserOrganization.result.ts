import { z } from 'zod';

// prettier-ignore
export const UserOrganizationResultSchema = z.object({
    id: z.number().int(),
    userId: z.number().int(),
    organizationId: z.number().int(),
    isCurrent: z.boolean(),
    isAdmin: z.boolean(),
    user: z.unknown(),
    organization: z.unknown()
}).strict();

export type UserOrganizationResultType = z.infer<typeof UserOrganizationResultSchema>;
