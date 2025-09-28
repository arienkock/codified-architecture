import type { Prisma } from '../../prisma';
import { z } from 'zod';
import { UserSelectObjectSchema as UserSelectObjectSchema } from './objects/UserSelect.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './objects/UserWhereUniqueInput.schema';

export const UserDeleteOneSchema: z.ZodType<Prisma.UserDeleteArgs> = z.object({ select: UserSelectObjectSchema.optional(),  where: UserWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.UserDeleteArgs>;

export const UserDeleteOneZodSchema = z.object({ select: UserSelectObjectSchema.optional(),  where: UserWhereUniqueInputObjectSchema }).strict();