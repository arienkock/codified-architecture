import { z } from 'zod';
import type { Prisma } from '../../../prisma';


const makeSchema = () => z.object({
  userId: z.number().int(),
  organizationId: z.number().int()
}).strict();
export const UserOrganizationUserIdOrganizationIdCompoundUniqueInputObjectSchema: z.ZodType<Prisma.UserOrganizationUserIdOrganizationIdCompoundUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.UserOrganizationUserIdOrganizationIdCompoundUniqueInput>;
export const UserOrganizationUserIdOrganizationIdCompoundUniqueInputObjectZodSchema = makeSchema();
