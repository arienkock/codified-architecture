import { RequestContext } from './types';
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
    throw new Error();
}
