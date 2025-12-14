import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { OrganizationCreateWithoutInvitationsInputObjectSchema as OrganizationCreateWithoutInvitationsInputObjectSchema } from './OrganizationCreateWithoutInvitationsInput.schema';
import { OrganizationUncheckedCreateWithoutInvitationsInputObjectSchema as OrganizationUncheckedCreateWithoutInvitationsInputObjectSchema } from './OrganizationUncheckedCreateWithoutInvitationsInput.schema';
import { OrganizationCreateOrConnectWithoutInvitationsInputObjectSchema as OrganizationCreateOrConnectWithoutInvitationsInputObjectSchema } from './OrganizationCreateOrConnectWithoutInvitationsInput.schema';
import { OrganizationUpsertWithoutInvitationsInputObjectSchema as OrganizationUpsertWithoutInvitationsInputObjectSchema } from './OrganizationUpsertWithoutInvitationsInput.schema';
import { OrganizationWhereUniqueInputObjectSchema as OrganizationWhereUniqueInputObjectSchema } from './OrganizationWhereUniqueInput.schema';
import { OrganizationUpdateToOneWithWhereWithoutInvitationsInputObjectSchema as OrganizationUpdateToOneWithWhereWithoutInvitationsInputObjectSchema } from './OrganizationUpdateToOneWithWhereWithoutInvitationsInput.schema';
import { OrganizationUpdateWithoutInvitationsInputObjectSchema as OrganizationUpdateWithoutInvitationsInputObjectSchema } from './OrganizationUpdateWithoutInvitationsInput.schema';
import { OrganizationUncheckedUpdateWithoutInvitationsInputObjectSchema as OrganizationUncheckedUpdateWithoutInvitationsInputObjectSchema } from './OrganizationUncheckedUpdateWithoutInvitationsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => OrganizationCreateWithoutInvitationsInputObjectSchema), z.lazy(() => OrganizationUncheckedCreateWithoutInvitationsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => OrganizationCreateOrConnectWithoutInvitationsInputObjectSchema).optional(),
  upsert: z.lazy(() => OrganizationUpsertWithoutInvitationsInputObjectSchema).optional(),
  connect: z.lazy(() => OrganizationWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => OrganizationUpdateToOneWithWhereWithoutInvitationsInputObjectSchema), z.lazy(() => OrganizationUpdateWithoutInvitationsInputObjectSchema), z.lazy(() => OrganizationUncheckedUpdateWithoutInvitationsInputObjectSchema)]).optional()
}).strict();
export const OrganizationUpdateOneRequiredWithoutInvitationsNestedInputObjectSchema: z.ZodType<Prisma.OrganizationUpdateOneRequiredWithoutInvitationsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.OrganizationUpdateOneRequiredWithoutInvitationsNestedInput>;
export const OrganizationUpdateOneRequiredWithoutInvitationsNestedInputObjectZodSchema = makeSchema();
