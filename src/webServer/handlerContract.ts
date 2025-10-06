import type { AppContext } from '../AppContext.js';

export interface HandlerContract<
  TPathParams = any,
  TQueryParams = any,
  THeaderParams = any,
  TRequestBody = any,
  TResponse = any
> {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'OPTIONS' | 'HEAD' | 'TRACE';
  path: string;
  pathParamsSchema: any;
  queryParamsSchema: any;
  headerParamsSchema: any;
  requestBodySchema: any;
  responseSchemas: Record<string, any>;
  parsePathParams(input: unknown): TPathParams;
  parseQueryParams(input: unknown): TQueryParams;
  parseHeaderParams(input: unknown): THeaderParams;
  parseRequestBody(input: unknown): TRequestBody;
  handle(params: {
    pathParams: TPathParams;
    queryParams: TQueryParams;
    headerParams: THeaderParams;
    requestBody: TRequestBody;
    appContext: AppContext;
  }): Promise<TResponse>;
}
