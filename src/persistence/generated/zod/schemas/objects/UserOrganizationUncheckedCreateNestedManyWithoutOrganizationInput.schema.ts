import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { UserOrganizationCreateWithoutOrganizationInputObjectSchema as UserOrganizationCreateWithoutOrganizationInputObjectSchema } from './UserOrganizationCreateWithoutOrganizationInput.schema';
import { UserOrganizationUncheckedCreateWithoutOrganizationInputObjectSchema as UserOrganizationUncheckedCreateWithoutOrganizationInputObjectSchema } from './UserOrganizationUncheckedCreateWithoutOrganizationInput.schema';
import { UserOrganizationCreateOrConnectWithoutOrganizationInputObjectSchema as UserOrganizationCreateOrConnectWithoutOrganizationInputObjectSchema } from './UserOrganizationCreateOrConnectWithoutOrganizationInput.schema';
import { OrganizationUserOrganizationCreateManyOrganizationInputEnvelopeObjectSchema as UserOrganizationCreateManyOrganizationInputEnvelopeObjectSchema } from './UserOrganizationCreateManyOrganizationInputEnvelope.schema';
import { UserOrganizationWhereUniqueInputObjectSchema as UserOrganizationWhereUniqueInputObjectSchema } from './UserOrganizationWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserOrganizationCreateWithoutOrganizationInputObjectSchema), z.lazy(() => UserOrganizationCreateWithoutOrganizationInputObjectSchema).array(), z.lazy(() => UserOrganizationUncheckedCreateWithoutOrganizationInputObjectSchema), z.lazy(() => UserOrganizationUncheckedCreateWithoutOrganizationInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => UserOrganizationCreateOrConnectWithoutOrganizationInputObjectSchema), z.lazy(() => UserOrganizationCreateOrConnectWithoutOrganizationInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => UserOrganizationCreateManyOrganizationInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => UserOrganizationWhereUniqueInputObjectSchema), z.lazy(() => UserOrganizationWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const UserOrganizationUncheckedCreateNestedManyWithoutOrganizationInputObjectSchema: z.ZodType<Prisma.UserOrganizationUncheckedCreateNestedManyWithoutOrganizationInput> = makeSchema() as unknown as z.ZodType<Prisma.UserOrganizationUncheckedCreateNestedManyWithoutOrganizationInput>;
export const UserOrganizationUncheckedCreateNestedManyWithoutOrganizationInputObjectZodSchema = makeSchema();
