import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { OrganizationWhereInputObjectSchema as OrganizationWhereInputObjectSchema } from './OrganizationWhereInput.schema';
import { OrganizationUpdateWithoutMembersInputObjectSchema as OrganizationUpdateWithoutMembersInputObjectSchema } from './OrganizationUpdateWithoutMembersInput.schema';
import { OrganizationUncheckedUpdateWithoutMembersInputObjectSchema as OrganizationUncheckedUpdateWithoutMembersInputObjectSchema } from './OrganizationUncheckedUpdateWithoutMembersInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => OrganizationWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => OrganizationUpdateWithoutMembersInputObjectSchema), z.lazy(() => OrganizationUncheckedUpdateWithoutMembersInputObjectSchema)])
}).strict();
export const OrganizationUpdateToOneWithWhereWithoutMembersInputObjectSchema: z.ZodType<Prisma.OrganizationUpdateToOneWithWhereWithoutMembersInput> = makeSchema() as unknown as z.ZodType<Prisma.OrganizationUpdateToOneWithWhereWithoutMembersInput>;
export const OrganizationUpdateToOneWithWhereWithoutMembersInputObjectZodSchema = makeSchema();
