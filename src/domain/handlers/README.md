# Domain Handlers

This directory contains domain-layer handlers that implement the business logic for web server endpoints.

## Convention-Based Invocation

Domain handlers are automatically invoked by generated web server handlers using a convention-based approach:

### Naming Convention

For a generated handler named `PostUsersHandler`:
- **File location**: `src/domain/handlers/PostUsersHandler.ts`
- **Export name**: `handlePostUsersHandler`

The pattern is:
1. Handler name matches the PascalCase name from the generated handler
2. File is located in `src/domain/handlers/`
3. Exported function is named `handle{HandlerName}`

### Handler Signature

Each domain handler receives a params object with:

```typescript
{
  pathParams: ParsedPathParams,
  queryParams: ParsedQueryParams,
  headerParams: ParsedHeaderParams,
  requestBody: ParsedRequestBody,
  requestContext: RequestContext
}
```

And returns a discriminated union response:

```typescript
{ status: "201"; body: ResponseBody } | { status: "400"; body: undefined }
```

### Example

See `PostUsersHandler.ts` for a complete example that:
- Validates the request using a use case
- Checks authorization
- Executes the use case
- Returns a properly typed response

## Architecture Benefits

1. **Decoupling**: Domain handlers live in the domain layer and have no dependencies on the webServer layer
2. **Type Safety**: Full type inference from OpenAPI through to domain handlers
3. **Convention over Configuration**: No manual wiring needed - just follow the naming convention
4. **Clear Separation**: Generated code stays in `src/webServer/generated/`, domain logic stays in `src/domain/`

## Creating a New Handler

When you add a new endpoint to `src/webServer/openapi.ts` and run `npm run codegen`:

1. A handler will be generated in `src/webServer/generated/handlers/`
2. Create a corresponding file in `src/domain/handlers/` following the naming convention
3. Export a function with the correct signature
4. The generated handler will automatically invoke your domain handler

If the domain handler doesn't exist, you'll get a clear error message indicating which file to create.
