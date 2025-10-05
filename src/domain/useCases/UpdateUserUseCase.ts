import { UseCase, RequestContext, ValidationResults, UseCaseResponse } from "./types";
import { UserUpdateRequest, UserUpdateResponse } from "../../domain-seam/types";
import { UserUpdateRequestSchema } from "../../domain-seam/types";

interface UpdateUserRequest extends UserUpdateRequest {
    id: number;
}

export const UpdateUserUseCase: UseCase<UpdateUserRequest, UserUpdateResponse> = {
    parseAndValidateRequest: function (rc: RequestContext, data: any): [ValidationResults, UpdateUserRequest] {
        throw new Error("Function not implemented.");
    },

    isAuthorized: function (rc: RequestContext, req: UpdateUserRequest): boolean {
       throw new Error("Function not implemented.");
    },

    execute: function (rc: RequestContext, req: UpdateUserRequest): UseCaseResponse<UserUpdateResponse> {
        throw new Error("Function not implemented.");
    }
};
