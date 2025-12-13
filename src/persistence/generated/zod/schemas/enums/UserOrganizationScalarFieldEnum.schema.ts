import { z } from 'zod';

export const UserOrganizationScalarFieldEnumSchema = z.enum(['id', 'userId', 'organizationId', 'isCurrent'])

export type UserOrganizationScalarFieldEnum = z.infer<typeof UserOrganizationScalarFieldEnumSchema>;