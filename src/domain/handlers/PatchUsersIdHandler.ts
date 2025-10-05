import { RequestContext } from '../useCases/types';
import { UpdateUserUseCase } from '../useCases/UpdateUserUseCase';
import { UserUpdateRequest, UserUpdateUseCaseResponse, ErrorResponse } from '../../domain-seam/types';

export interface PatchUsersIdHandlerParams {
  pathParams: { id: number };
  queryParams: Record<string, never>;
  headerParams: Record<string, never>;
  requestBody: UserUpdateRequest;
  requestContext: RequestContext;
}

export type PatchUsersIdHandlerResponse = 
  | { status: "200"; body: UserUpdateUseCaseResponse }
  | { status: "400"; body: ErrorResponse }
  | { status: "401"; body: ErrorResponse }
  | { status: "403"; body: ErrorResponse }
  | { status: "404"; body: ErrorResponse }
  | { status: "422"; body: ErrorResponse }
  | { status: "500"; body: ErrorResponse };

export async function handleRequest(
  params: PatchUsersIdHandlerParams
): Promise<PatchUsersIdHandlerResponse> {
  const { pathParams, requestBody, requestContext } = params;

  try {
    // Parse and validate the request using the use case
    const [validationResults, validatedRequest] = UpdateUserUseCase.parseAndValidateRequest(
      requestContext,
      { id: pathParams.id, ...requestBody }
    );

    if (!validationResults.success) {
      return {
        status: "400",
        body: {
          meta: {
            success: false,
            errors: validationResults.errors
          }
        }
      };
    }

    // Check authorization
    if (!UpdateUserUseCase.isAuthorized(requestContext, validatedRequest)) {
      return {
        status: "403",
        body: {
          meta: {
            success: false,
            errors: [{
              code: "FORBIDDEN",
              message: "You do not have permission to perform this action"
            }]
          }
        }
      };
    }

    // Execute the use case
    const useCaseResponse = UpdateUserUseCase.execute(requestContext, validatedRequest);

    // Check if the use case execution was successful
    if (!useCaseResponse.meta.success) {
      // Check if it's a not found error
      const notFoundError = useCaseResponse.meta.errors?.find((e: { code: string }) => e.code === "NOT_FOUND");
      if (notFoundError) {
        return {
          status: "404",
          body: {
            meta: {
              success: false,
              errors: useCaseResponse.meta.errors || [{
                code: "NOT_FOUND",
                message: "User not found"
              }]
            }
          }
        };
      }

      return {
        status: "422",
        body: {
          meta: {
            success: false,
            errors: useCaseResponse.meta.errors || [{
              code: "BUSINESS_LOGIC_ERROR",
              message: "The request could not be processed"
            }]
          }
        }
      };
    }

    // Return the successful response
    return {
      status: "200",
      body: useCaseResponse
    };
  } catch (error) {
    // Handle unexpected server errors
    console.error('Unexpected error in PatchUsersIdHandler:', error);
    return {
      status: "500",
      body: {
        meta: {
          success: false,
          errors: [{
            code: "INTERNAL_SERVER_ERROR",
            message: "An unexpected error occurred"
          }]
        }
      }
    };
  }
}
