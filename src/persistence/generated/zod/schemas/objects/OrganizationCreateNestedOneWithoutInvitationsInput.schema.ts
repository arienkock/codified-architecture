import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { OrganizationCreateWithoutInvitationsInputObjectSchema as OrganizationCreateWithoutInvitationsInputObjectSchema } from './OrganizationCreateWithoutInvitationsInput.schema';
import { OrganizationUncheckedCreateWithoutInvitationsInputObjectSchema as OrganizationUncheckedCreateWithoutInvitationsInputObjectSchema } from './OrganizationUncheckedCreateWithoutInvitationsInput.schema';
import { OrganizationCreateOrConnectWithoutInvitationsInputObjectSchema as OrganizationCreateOrConnectWithoutInvitationsInputObjectSchema } from './OrganizationCreateOrConnectWithoutInvitationsInput.schema';
import { OrganizationWhereUniqueInputObjectSchema as OrganizationWhereUniqueInputObjectSchema } from './OrganizationWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => OrganizationCreateWithoutInvitationsInputObjectSchema), z.lazy(() => OrganizationUncheckedCreateWithoutInvitationsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => OrganizationCreateOrConnectWithoutInvitationsInputObjectSchema).optional(),
  connect: z.lazy(() => OrganizationWhereUniqueInputObjectSchema).optional()
}).strict();
export const OrganizationCreateNestedOneWithoutInvitationsInputObjectSchema: z.ZodType<Prisma.OrganizationCreateNestedOneWithoutInvitationsInput> = makeSchema() as unknown as z.ZodType<Prisma.OrganizationCreateNestedOneWithoutInvitationsInput>;
export const OrganizationCreateNestedOneWithoutInvitationsInputObjectZodSchema = makeSchema();
