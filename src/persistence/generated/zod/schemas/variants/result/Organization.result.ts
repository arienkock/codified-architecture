import { z } from 'zod';

// prettier-ignore
export const OrganizationResultSchema = z.object({
    id: z.number().int(),
    name: z.string(),
    members: z.array(z.unknown())
}).strict();

export type OrganizationResultType = z.infer<typeof OrganizationResultSchema>;
