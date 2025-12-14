import { z } from 'zod';
import type { Prisma } from '../../../prisma';
import { OrganizationWhereInputObjectSchema as OrganizationWhereInputObjectSchema } from './OrganizationWhereInput.schema';
import { OrganizationUpdateWithoutInvitationsInputObjectSchema as OrganizationUpdateWithoutInvitationsInputObjectSchema } from './OrganizationUpdateWithoutInvitationsInput.schema';
import { OrganizationUncheckedUpdateWithoutInvitationsInputObjectSchema as OrganizationUncheckedUpdateWithoutInvitationsInputObjectSchema } from './OrganizationUncheckedUpdateWithoutInvitationsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => OrganizationWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => OrganizationUpdateWithoutInvitationsInputObjectSchema), z.lazy(() => OrganizationUncheckedUpdateWithoutInvitationsInputObjectSchema)])
}).strict();
export const OrganizationUpdateToOneWithWhereWithoutInvitationsInputObjectSchema: z.ZodType<Prisma.OrganizationUpdateToOneWithWhereWithoutInvitationsInput> = makeSchema() as unknown as z.ZodType<Prisma.OrganizationUpdateToOneWithWhereWithoutInvitationsInput>;
export const OrganizationUpdateToOneWithWhereWithoutInvitationsInputObjectZodSchema = makeSchema();
