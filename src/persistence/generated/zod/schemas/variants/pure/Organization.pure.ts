import { z } from 'zod';

// prettier-ignore
export const OrganizationModelSchema = z.object({
    id: z.number().int(),
    name: z.string(),
    members: z.array(z.unknown())
}).strict();

export type OrganizationModelType = z.infer<typeof OrganizationModelSchema>;
