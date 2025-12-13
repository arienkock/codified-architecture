import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { OrganizationCreateWithoutMembersInputObjectSchema as OrganizationCreateWithoutMembersInputObjectSchema } from './OrganizationCreateWithoutMembersInput.schema';
import { OrganizationUncheckedCreateWithoutMembersInputObjectSchema as OrganizationUncheckedCreateWithoutMembersInputObjectSchema } from './OrganizationUncheckedCreateWithoutMembersInput.schema';
import { OrganizationCreateOrConnectWithoutMembersInputObjectSchema as OrganizationCreateOrConnectWithoutMembersInputObjectSchema } from './OrganizationCreateOrConnectWithoutMembersInput.schema';
import { OrganizationUpsertWithoutMembersInputObjectSchema as OrganizationUpsertWithoutMembersInputObjectSchema } from './OrganizationUpsertWithoutMembersInput.schema';
import { OrganizationWhereUniqueInputObjectSchema as OrganizationWhereUniqueInputObjectSchema } from './OrganizationWhereUniqueInput.schema';
import { OrganizationUpdateToOneWithWhereWithoutMembersInputObjectSchema as OrganizationUpdateToOneWithWhereWithoutMembersInputObjectSchema } from './OrganizationUpdateToOneWithWhereWithoutMembersInput.schema';
import { OrganizationUpdateWithoutMembersInputObjectSchema as OrganizationUpdateWithoutMembersInputObjectSchema } from './OrganizationUpdateWithoutMembersInput.schema';
import { OrganizationUncheckedUpdateWithoutMembersInputObjectSchema as OrganizationUncheckedUpdateWithoutMembersInputObjectSchema } from './OrganizationUncheckedUpdateWithoutMembersInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => OrganizationCreateWithoutMembersInputObjectSchema), z.lazy(() => OrganizationUncheckedCreateWithoutMembersInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => OrganizationCreateOrConnectWithoutMembersInputObjectSchema).optional(),
  upsert: z.lazy(() => OrganizationUpsertWithoutMembersInputObjectSchema).optional(),
  connect: z.lazy(() => OrganizationWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => OrganizationUpdateToOneWithWhereWithoutMembersInputObjectSchema), z.lazy(() => OrganizationUpdateWithoutMembersInputObjectSchema), z.lazy(() => OrganizationUncheckedUpdateWithoutMembersInputObjectSchema)]).optional()
}).strict();
export const OrganizationUpdateOneRequiredWithoutMembersNestedInputObjectSchema: z.ZodType<Prisma.OrganizationUpdateOneRequiredWithoutMembersNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.OrganizationUpdateOneRequiredWithoutMembersNestedInput>;
export const OrganizationUpdateOneRequiredWithoutMembersNestedInputObjectZodSchema = makeSchema();
