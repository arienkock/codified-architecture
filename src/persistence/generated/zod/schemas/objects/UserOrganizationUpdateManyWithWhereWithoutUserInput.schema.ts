import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { UserOrganizationScalarWhereInputObjectSchema as UserOrganizationScalarWhereInputObjectSchema } from './UserOrganizationScalarWhereInput.schema';
import { UserOrganizationUpdateManyMutationInputObjectSchema as UserOrganizationUpdateManyMutationInputObjectSchema } from './UserOrganizationUpdateManyMutationInput.schema';
import { UserOrganizationUncheckedUpdateManyWithoutUserInputObjectSchema as UserOrganizationUncheckedUpdateManyWithoutUserInputObjectSchema } from './UserOrganizationUncheckedUpdateManyWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserOrganizationScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => UserOrganizationUpdateManyMutationInputObjectSchema), z.lazy(() => UserOrganizationUncheckedUpdateManyWithoutUserInputObjectSchema)])
}).strict();
export const UserOrganizationUpdateManyWithWhereWithoutUserInputObjectSchema: z.ZodType<Prisma.UserOrganizationUpdateManyWithWhereWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.UserOrganizationUpdateManyWithWhereWithoutUserInput>;
export const UserOrganizationUpdateManyWithWhereWithoutUserInputObjectZodSchema = makeSchema();
