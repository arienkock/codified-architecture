import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { OrganizationWhereUniqueInputObjectSchema as OrganizationWhereUniqueInputObjectSchema } from './OrganizationWhereUniqueInput.schema';
import { OrganizationCreateWithoutMembersInputObjectSchema as OrganizationCreateWithoutMembersInputObjectSchema } from './OrganizationCreateWithoutMembersInput.schema';
import { OrganizationUncheckedCreateWithoutMembersInputObjectSchema as OrganizationUncheckedCreateWithoutMembersInputObjectSchema } from './OrganizationUncheckedCreateWithoutMembersInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => OrganizationWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => OrganizationCreateWithoutMembersInputObjectSchema), z.lazy(() => OrganizationUncheckedCreateWithoutMembersInputObjectSchema)])
}).strict();
export const OrganizationCreateOrConnectWithoutMembersInputObjectSchema: z.ZodType<Prisma.OrganizationCreateOrConnectWithoutMembersInput> = makeSchema() as unknown as z.ZodType<Prisma.OrganizationCreateOrConnectWithoutMembersInput>;
export const OrganizationCreateOrConnectWithoutMembersInputObjectZodSchema = makeSchema();
