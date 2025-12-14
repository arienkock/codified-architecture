import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { OrganizationWhereUniqueInputObjectSchema as OrganizationWhereUniqueInputObjectSchema } from './OrganizationWhereUniqueInput.schema';
import { OrganizationCreateWithoutInvitationsInputObjectSchema as OrganizationCreateWithoutInvitationsInputObjectSchema } from './OrganizationCreateWithoutInvitationsInput.schema';
import { OrganizationUncheckedCreateWithoutInvitationsInputObjectSchema as OrganizationUncheckedCreateWithoutInvitationsInputObjectSchema } from './OrganizationUncheckedCreateWithoutInvitationsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => OrganizationWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => OrganizationCreateWithoutInvitationsInputObjectSchema), z.lazy(() => OrganizationUncheckedCreateWithoutInvitationsInputObjectSchema)])
}).strict();
export const OrganizationCreateOrConnectWithoutInvitationsInputObjectSchema: z.ZodType<Prisma.OrganizationCreateOrConnectWithoutInvitationsInput> = makeSchema() as unknown as z.ZodType<Prisma.OrganizationCreateOrConnectWithoutInvitationsInput>;
export const OrganizationCreateOrConnectWithoutInvitationsInputObjectZodSchema = makeSchema();
