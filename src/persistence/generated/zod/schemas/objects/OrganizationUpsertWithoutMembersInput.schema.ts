import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { OrganizationUpdateWithoutMembersInputObjectSchema as OrganizationUpdateWithoutMembersInputObjectSchema } from './OrganizationUpdateWithoutMembersInput.schema';
import { OrganizationUncheckedUpdateWithoutMembersInputObjectSchema as OrganizationUncheckedUpdateWithoutMembersInputObjectSchema } from './OrganizationUncheckedUpdateWithoutMembersInput.schema';
import { OrganizationCreateWithoutMembersInputObjectSchema as OrganizationCreateWithoutMembersInputObjectSchema } from './OrganizationCreateWithoutMembersInput.schema';
import { OrganizationUncheckedCreateWithoutMembersInputObjectSchema as OrganizationUncheckedCreateWithoutMembersInputObjectSchema } from './OrganizationUncheckedCreateWithoutMembersInput.schema';
import { OrganizationWhereInputObjectSchema as OrganizationWhereInputObjectSchema } from './OrganizationWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => OrganizationUpdateWithoutMembersInputObjectSchema), z.lazy(() => OrganizationUncheckedUpdateWithoutMembersInputObjectSchema)]),
  create: z.union([z.lazy(() => OrganizationCreateWithoutMembersInputObjectSchema), z.lazy(() => OrganizationUncheckedCreateWithoutMembersInputObjectSchema)]),
  where: z.lazy(() => OrganizationWhereInputObjectSchema).optional()
}).strict();
export const OrganizationUpsertWithoutMembersInputObjectSchema: z.ZodType<Prisma.OrganizationUpsertWithoutMembersInput> = makeSchema() as unknown as z.ZodType<Prisma.OrganizationUpsertWithoutMembersInput>;
export const OrganizationUpsertWithoutMembersInputObjectZodSchema = makeSchema();
