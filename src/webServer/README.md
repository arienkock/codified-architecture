# Web Server Layer

This directory contains the Express.js web server implementation with dynamic route registration.

## Dynamic Route Registration

Routes are automatically registered from generated handlers in `src/webServer/generated/handlers/`. The system:

1. **Imports all handlers** from the generated index file
2. **Filters for valid handler contracts** (objects with method, path, and schema properties)
3. **Registers routes** on the Express app using the handler's declared HTTP method and path
4. **Provides standardized middleware** that:
   - Parses and validates request parameters using Zod schemas
   - Handles errors through the existing error middleware
   - Returns typed responses

## Adding New Routes

To add new routes:

1. **Update the OpenAPI specification** in `src/webServer/openapi.ts`
2. **Run code generation**: `npm run generate:domain-handlers`
3. **Routes are automatically registered** on server startup

The system will detect new handlers in `src/webServer/generated/handlers/index.ts` and register them without manual intervention.

## Handler Contract

Generated handlers must conform to the `HandlerContract` interface:

```typescript
interface HandlerContract {
  method: HTTP_METHOD;
  path: string;
  pathParamsSchema: ZodSchema;
  queryParamsSchema: ZodSchema;
  headerParamsSchema: ZodSchema;
  requestBodySchema: ZodSchema;
  responseSchemas: Record<string, ZodSchema>;
  parsePathParams(input: unknown): ParsedType;
  parseQueryParams(input: unknown): ParsedType;
  parseHeaderParams(input: unknown): ParsedType;
  parseRequestBody(input: unknown): ParsedType;
  parseResponse(status: string, payload: unknown): ParsedType;
}
```

## Future Extensions

- **Domain Use Case Integration**: Currently returns placeholder responses. Wire up actual domain use cases in `createHandlerMiddleware`.
- **Middleware Customization**: Add support for route-specific middleware via handler metadata.
- **Authentication/Authorization**: Integrate auth checks before domain invocation.
- **Response Status Mapping**: Map domain results to appropriate HTTP status codes.
- **Request Context**: Pass Express request context to domain layer for logging/tracing.
