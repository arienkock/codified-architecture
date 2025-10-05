import { RequestContext } from '../useCases/types.js';
import { CreateUserUseCase } from '../useCases/CreateUserUseCase.js';
import { UserCreateRequest, UserCreateUseCaseResponse } from '../../domain-seam/types.js';

export interface PostUsersHandlerParams {
  pathParams: Record<string, never>;
  queryParams: Record<string, never>;
  headerParams: Record<string, never>;
  requestBody: UserCreateRequest;
  requestContext: RequestContext;
}

export type PostUsersHandlerResponse = 
  | { status: "201"; body: UserCreateUseCaseResponse }
  | { status: "400"; body: undefined };

export async function handleRequest(
  params: PostUsersHandlerParams
): Promise<PostUsersHandlerResponse> {
  const { requestBody, requestContext } = params;

  // Parse and validate the request using the use case
  const [validationResults, validatedRequest] = CreateUserUseCase.parseAndValidateRequest(
    requestContext,
    requestBody
  );

  if (!validationResults.success) {
    return {
      status: "400",
      body: undefined
    };
  }

  // Check authorization
  if (!CreateUserUseCase.isAuthorized(requestContext, validatedRequest)) {
    return {
      status: "400",
      body: undefined
    };
  }

  // Execute the use case
  const useCaseResponse = CreateUserUseCase.execute(requestContext, validatedRequest);

  // Return the full use case response with meta and data
  return {
    status: "201",
    body: useCaseResponse
  };
}
