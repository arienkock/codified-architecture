import { z } from 'zod';

export const UserScalarFieldEnumSchema = z.enum(['id', 'email', 'name', 'hashedPassword'])

export type UserScalarFieldEnum = z.infer<typeof UserScalarFieldEnumSchema>;