export interface HandlerContract {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'OPTIONS' | 'HEAD' | 'TRACE';
  path: string;
  pathParamsSchema: any;
  queryParamsSchema: any;
  headerParamsSchema: any;
  requestBodySchema: any;
  responseSchemas: Record<string, any>;
  parsePathParams(input: unknown): any;
  parseQueryParams(input: unknown): any;
  parseHeaderParams(input: unknown): any;
  parseRequestBody(input: unknown): any;
  parseResponse: any;
}