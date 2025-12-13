import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { UserOrganizationScalarWhereInputObjectSchema as UserOrganizationScalarWhereInputObjectSchema } from './UserOrganizationScalarWhereInput.schema';
import { UserOrganizationUpdateManyMutationInputObjectSchema as UserOrganizationUpdateManyMutationInputObjectSchema } from './UserOrganizationUpdateManyMutationInput.schema';
import { UserOrganizationUncheckedUpdateManyWithoutOrganizationInputObjectSchema as UserOrganizationUncheckedUpdateManyWithoutOrganizationInputObjectSchema } from './UserOrganizationUncheckedUpdateManyWithoutOrganizationInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserOrganizationScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => UserOrganizationUpdateManyMutationInputObjectSchema), z.lazy(() => UserOrganizationUncheckedUpdateManyWithoutOrganizationInputObjectSchema)])
}).strict();
export const UserOrganizationUpdateManyWithWhereWithoutOrganizationInputObjectSchema: z.ZodType<Prisma.UserOrganizationUpdateManyWithWhereWithoutOrganizationInput> = makeSchema() as unknown as z.ZodType<Prisma.UserOrganizationUpdateManyWithWhereWithoutOrganizationInput>;
export const UserOrganizationUpdateManyWithWhereWithoutOrganizationInputObjectZodSchema = makeSchema();
