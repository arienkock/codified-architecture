# AppContext Usage Guide

## Overview

The `AppContext` object provides shared application resources (like the Prisma database client) to all domain handlers throughout the application.

## Architecture Flow

The AppContext flows through the application layers as follows:

1. **Application Entry Point** (`src/index.ts`)
   - Creates the AppContext using `createAppContext()`
   - Passes it to `createServer()`
   - Handles graceful shutdown with `closeAppContext()`

2. **Web Server Layer** (`src/webServer/server.ts`)
   - Receives AppContext in `ServerOptions`
   - Passes it to `registerGeneratedHandlers()`

3. **Handler Registration** (`src/webServer/registerHandlers.ts`)
   - Threads AppContext through to each handler middleware
   - Includes it in the handler's `params` object

4. **Generated Handlers** (`src/webServer/generated/handlers/*.handler.ts`)
   - Receive AppContext from middleware
   - Create `RequestContext` with the AppContext
   - Pass it to domain handlers

5. **Domain Handlers** (`src/domain/handlers/*.ts`)
   - Receive `RequestContext` containing the AppContext
   - Access Prisma client via `params.requestContext.app.prisma`

## Using Prisma in Domain Handlers

Here's an example of how to use the Prisma client in a domain handler:

```typescript
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
  | { status: "500"; body: ErrorResponse };

export async function handleRequest(
  params: PostUsersHandlerParams
): Promise<PostUsersHandlerResponse> {
  const { requestContext, requestBody } = params;
  
  // Access Prisma client from the AppContext
  const prisma = requestContext.app.prisma;
  
  try {
    // Use Prisma to create a user
    const user = await prisma.user.create({
      data: {
        name: requestBody.name,
        email: requestBody.email,
      },
    });
    
    return {
      status: "201",
      body: {
        meta: { success: true },
        data: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      },
    };
  } catch (error) {
    return {
      status: "500",
      body: {
        code: "internal_error",
        message: "Failed to create user",
      },
    };
  }
}
```

## AppContext Interface

The `AppContext` interface is defined in `src/AppContext.ts`:

```typescript
export interface AppContext {
  prisma: PrismaClient;
}
```

You can extend this interface to include additional shared resources as needed (e.g., Redis client, external API clients, configuration, etc.).

## Type Safety

The AppContext is fully typed throughout the application:

- `src/AppContext.ts` - Defines the interface and creation function
- `src/domain/handlers/types.ts` - Re-exports the type for domain layer use
- `src/webServer/handlerContract.ts` - Includes AppContext in handler contract
- All generated handlers automatically receive the typed AppContext

## Graceful Shutdown

The application properly handles graceful shutdown:

```typescript
const shutdown = async () => {
  logger.info('Shutting down gracefully...');
  server.close(async () => {
    await closeAppContext(appContext);  // Disconnects Prisma
    logger.info('Server closed');
    process.exit(0);
  });
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
```

This ensures that database connections are properly closed when the application shuts down.
