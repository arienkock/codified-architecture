import { RequestContext } from './types';
import { UserCreateRequest, UserCreateUseCaseResponse, ErrorResponse } from '../../domain-seam/types';

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
  throw new Error();
}
