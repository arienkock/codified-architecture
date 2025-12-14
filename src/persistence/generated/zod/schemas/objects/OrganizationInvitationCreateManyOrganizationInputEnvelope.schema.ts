import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { OrganizationInvitationCreateManyOrganizationInputObjectSchema as OrganizationInvitationCreateManyOrganizationInputObjectSchema } from './OrganizationInvitationCreateManyOrganizationInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => OrganizationInvitationCreateManyOrganizationInputObjectSchema), z.lazy(() => OrganizationInvitationCreateManyOrganizationInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const OrganizationInvitationCreateManyOrganizationInputEnvelopeObjectSchema: z.ZodType<Prisma.OrganizationInvitationCreateManyOrganizationInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.OrganizationInvitationCreateManyOrganizationInputEnvelope>;
export const OrganizationInvitationCreateManyOrganizationInputEnvelopeObjectZodSchema = makeSchema();
