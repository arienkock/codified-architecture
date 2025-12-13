import { z } from 'zod';

export const OrganizationScalarFieldEnumSchema = z.enum(['id', 'name'])

export type OrganizationScalarFieldEnum = z.infer<typeof OrganizationScalarFieldEnumSchema>;