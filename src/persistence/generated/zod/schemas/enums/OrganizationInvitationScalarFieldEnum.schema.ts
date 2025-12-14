import { z } from 'zod';

export const OrganizationInvitationScalarFieldEnumSchema = z.enum(['id', 'issuedAt', 'accepted', 'ttlMinutes', 'userId', 'organizationId'])

export type OrganizationInvitationScalarFieldEnum = z.infer<typeof OrganizationInvitationScalarFieldEnumSchema>;