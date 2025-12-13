import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { OrganizationCreateWithoutMembersInputObjectSchema as OrganizationCreateWithoutMembersInputObjectSchema } from './OrganizationCreateWithoutMembersInput.schema';
import { OrganizationUncheckedCreateWithoutMembersInputObjectSchema as OrganizationUncheckedCreateWithoutMembersInputObjectSchema } from './OrganizationUncheckedCreateWithoutMembersInput.schema';
import { OrganizationCreateOrConnectWithoutMembersInputObjectSchema as OrganizationCreateOrConnectWithoutMembersInputObjectSchema } from './OrganizationCreateOrConnectWithoutMembersInput.schema';
import { OrganizationWhereUniqueInputObjectSchema as OrganizationWhereUniqueInputObjectSchema } from './OrganizationWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => OrganizationCreateWithoutMembersInputObjectSchema), z.lazy(() => OrganizationUncheckedCreateWithoutMembersInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => OrganizationCreateOrConnectWithoutMembersInputObjectSchema).optional(),
  connect: z.lazy(() => OrganizationWhereUniqueInputObjectSchema).optional()
}).strict();
export const OrganizationCreateNestedOneWithoutMembersInputObjectSchema: z.ZodType<Prisma.OrganizationCreateNestedOneWithoutMembersInput> = makeSchema() as unknown as z.ZodType<Prisma.OrganizationCreateNestedOneWithoutMembersInput>;
export const OrganizationCreateNestedOneWithoutMembersInputObjectZodSchema = makeSchema();
