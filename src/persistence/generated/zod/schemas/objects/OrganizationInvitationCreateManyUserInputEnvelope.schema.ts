import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { UserOrganizationInvitationCreateManyUserInputObjectSchema as OrganizationInvitationCreateManyUserInputObjectSchema } from './OrganizationInvitationCreateManyUserInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => OrganizationInvitationCreateManyUserInputObjectSchema), z.lazy(() => OrganizationInvitationCreateManyUserInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const OrganizationInvitationCreateManyUserInputEnvelopeObjectSchema: z.ZodType<Prisma.OrganizationInvitationCreateManyUserInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.OrganizationInvitationCreateManyUserInputEnvelope>;
export const OrganizationInvitationCreateManyUserInputEnvelopeObjectZodSchema = makeSchema();
