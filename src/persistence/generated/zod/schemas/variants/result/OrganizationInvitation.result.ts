import { z } from 'zod';

// prettier-ignore
export const OrganizationInvitationResultSchema = z.object({
    id: z.number().int(),
    issuedAt: z.date(),
    accepted: z.boolean(),
    ttlMinutes: z.number().int(),
    userId: z.number().int(),
    organizationId: z.number().int(),
    user: z.unknown(),
    organization: z.unknown()
}).strict();

export type OrganizationInvitationResultType = z.infer<typeof OrganizationInvitationResultSchema>;
