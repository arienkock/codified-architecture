import { RequestContext } from '../useCases/types.js';
import { CreateUserUseCase } from '../useCases/CreateUserUseCase.js';
import { UserCreateRequest, UserCreateUseCaseResponse, ErrorResponse } from '../../domain-seam/types.js';

export interface PostUsersHandlerParams {
  pathParams: Record<string, never>;
  queryParams: Record<string, never>;
  headerParams: Record<string, never>;
  requestBody: UserCreateRequest;
  requestContext: RequestContext;
}

export type PostUsersHandlerResponse = 
  | { status: "201"; body: UserCreateUseCaseResponse }
  | { status: "400"; body: ErrorResponse }
  | { status: "401"; body: ErrorResponse }
  | { status: "403"; body: ErrorResponse }
  | { status: "422"; body: ErrorResponse }
  | { status: "500"; body: ErrorResponse };

export async function handleRequest(
  params: PostUsersHandlerParams
): Promise<PostUsersHandlerResponse> {
  const { requestBody, requestContext } = params;

  try {
    // Parse and validate the request using the use case
    const [validationResults, validatedRequest] = CreateUserUseCase.parseAndValidateRequest(
      requestContext,
      requestBody
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
    if (!CreateUserUseCase.isAuthorized(requestContext, validatedRequest)) {
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
    const useCaseResponse = CreateUserUseCase.execute(requestContext, validatedRequest);

    // Check if the use case execution was successful
    if (!useCaseResponse.meta.success) {
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
      status: "201",
      body: useCaseResponse
    };
  } catch (error) {
    // Handle unexpected server errors
    console.error('Unexpected error in PostUsersHandler:', error);
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
