import { Prisma } from "../persistence/generated/prisma";
import { UserResultType } from "../persistence/generated/zod/schemas";

export type UserCreateRequest = Prisma.UserUncheckedCreateInput

export type UserCreateResponse = UserResultType