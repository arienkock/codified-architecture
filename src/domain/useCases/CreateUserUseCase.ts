import { UseCase, RequestContext, ValidationResults } from "./types";
import { UserCreateInputObjectSchema, UserResultType } from "../../generated/zod/schemas";
import { Prisma } from "../../generated/prisma";


type UserCreateRequest = Prisma.UserUncheckedCreateInput

export const CreateUserUseCase: UseCase<UserCreateRequest, UserResultType> = {
    validateRequest: function (rc: RequestContext, cur: UserCreateRequest): ValidationResults {
        return ValidationResults.OK
    },
    isAuthorized: function (rc: RequestContext, cur: UserCreateRequest): boolean {
        return true
    },
    parseRequest: function (data: any): UserCreateRequest {
        return UserCreateInputObjectSchema.parse(data)
    },
    execute: function (rc: RequestContext, cur: UserCreateRequest): UserResultType {
        throw new Error("Function not implemented.");
    }
};
