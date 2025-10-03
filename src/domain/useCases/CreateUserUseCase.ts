import { UseCase, RequestContext, ValidationResults, UseCaseResponse } from "./types";

import { UserCreateRequest, UserCreateResponse } from "../../domain-seam/types";



export const CreateUserUseCase: UseCase<UserCreateRequest, UserCreateResponse> = {
    parseAndValidateRequest: function (rc: RequestContext, data: any): [ValidationResults, UserCreateRequest] {
        throw new Error("Function not implemented.");
    },
    isAuthorized: function (rc: RequestContext, cur: UserCreateRequest): boolean {
        throw new Error("Function not implemented.");
    },
    execute: function (rc: RequestContext, cur: UserCreateRequest): UseCaseResponse<{ id: number; email: string; name: string | null; hashedPassword: string; }> {
        throw new Error("Function not implemented.");
    }
};

