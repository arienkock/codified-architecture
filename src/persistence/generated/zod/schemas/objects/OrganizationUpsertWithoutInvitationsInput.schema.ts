import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { OrganizationUpdateWithoutInvitationsInputObjectSchema as OrganizationUpdateWithoutInvitationsInputObjectSchema } from './OrganizationUpdateWithoutInvitationsInput.schema';
import { OrganizationUncheckedUpdateWithoutInvitationsInputObjectSchema as OrganizationUncheckedUpdateWithoutInvitationsInputObjectSchema } from './OrganizationUncheckedUpdateWithoutInvitationsInput.schema';
import { OrganizationCreateWithoutInvitationsInputObjectSchema as OrganizationCreateWithoutInvitationsInputObjectSchema } from './OrganizationCreateWithoutInvitationsInput.schema';
import { OrganizationUncheckedCreateWithoutInvitationsInputObjectSchema as OrganizationUncheckedCreateWithoutInvitationsInputObjectSchema } from './OrganizationUncheckedCreateWithoutInvitationsInput.schema';
import { OrganizationWhereInputObjectSchema as OrganizationWhereInputObjectSchema } from './OrganizationWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => OrganizationUpdateWithoutInvitationsInputObjectSchema), z.lazy(() => OrganizationUncheckedUpdateWithoutInvitationsInputObjectSchema)]),
  create: z.union([z.lazy(() => OrganizationCreateWithoutInvitationsInputObjectSchema), z.lazy(() => OrganizationUncheckedCreateWithoutInvitationsInputObjectSchema)]),
  where: z.lazy(() => OrganizationWhereInputObjectSchema).optional()
}).strict();
export const OrganizationUpsertWithoutInvitationsInputObjectSchema: z.ZodType<Prisma.OrganizationUpsertWithoutInvitationsInput> = makeSchema() as unknown as z.ZodType<Prisma.OrganizationUpsertWithoutInvitationsInput>;
export const OrganizationUpsertWithoutInvitationsInputObjectZodSchema = makeSchema();
