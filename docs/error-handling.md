# Error Handling Implementation

## Overview

This document describes the comprehensive error handling strategy implemented across the application layers.

## Error Response Structure

All error responses follow a consistent structure defined by the `ErrorResponse` schema:

```typescript
{
  meta: {
    success: false,
    errors: [
      {
        code: string,
        message: string,
        field?: string  // Optional field for validation errors
      }
    ]
  }
}
```

## HTTP Status Codes

The application uses the following HTTP status codes for different error scenarios:

- **400 Bad Request**: Validation errors - the request payload failed schema validation
- **401 Unauthorized**: Authentication required but not provided
- **403 Forbidden**: User is authenticated but lacks permission for the requested action
- **422 Unprocessable Entity**: Business logic errors - the request was valid but the use case returned `success: false`
- **500 Internal Server Error**: Unexpected server errors caught by try-catch blocks

## Error Flow

### 1. Validation Errors (400)

When `parseAndValidateRequest` returns `success: false`:

```typescript
const [validationResults, validatedRequest] = UseCase.parseAndValidateRequest(
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
```

The `ValidationResults` class now carries detailed error information:

```typescript
class ValidationResults {
  constructor(
    public success: boolean,
    public errors: ValidationError[] = []
  ) {}
}
```

### 2. Authorization Errors (403)

When `isAuthorized` returns `false`:

```typescript
if (!UseCase.isAuthorized(requestContext, validatedRequest)) {
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
```

### 3. Business Logic Errors (422)

When the use case `execute` method returns `success: false` in the meta:

```typescript
const useCaseResponse = UseCase.execute(requestContext, validatedRequest);

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
```

### 4. Server Errors (500)

Unexpected errors are caught and returned as 500 responses:

```typescript
try {
  // ... handler logic
} catch (error) {
  console.error('Unexpected error:', error);
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
```

## Use Case Response Meta

The `UseCaseResponse` meta object now includes an optional `errors` field:

```typescript
interface UseCaseResponse<T> {
  meta: {
    success: boolean,
    pagination?: PaginationMetadata,
    warnings?: any[],
    errors?: ValidationError[]  // New field
  },
  data?: T,
}
```

This allows use cases to communicate detailed error information when `success: false`.

## OpenAPI Documentation

All endpoints now document the following error responses:

- **201**: Success response with data
- **400**: Validation error with `ErrorResponseSchema`
- **401**: Unauthorized with `ErrorResponseSchema`
- **403**: Forbidden with `ErrorResponseSchema`
- **422**: Business logic error with `ErrorResponseSchema`
- **500**: Server error with `ErrorResponseSchema`

## Example Error Responses

### Validation Error (400)

```json
{
  "meta": {
    "success": false,
    "errors": [
      {
        "code": "INVALID_EMAIL",
        "message": "Email format is invalid",
        "field": "email"
      },
      {
        "code": "PASSWORD_TOO_SHORT",
        "message": "Password must be at least 12 characters",
        "field": "password"
      }
    ]
  }
}
```

### Authorization Error (403)

```json
{
  "meta": {
    "success": false,
    "errors": [
      {
        "code": "FORBIDDEN",
        "message": "You do not have permission to perform this action"
      }
    ]
  }
}
```

### Business Logic Error (422)

```json
{
  "meta": {
    "success": false,
    "errors": [
      {
        "code": "EMAIL_ALREADY_EXISTS",
        "message": "A user with this email already exists"
      }
    ]
  }
}
```

### Server Error (500)

```json
{
  "meta": {
    "success": false,
    "errors": [
      {
        "code": "INTERNAL_SERVER_ERROR",
        "message": "An unexpected error occurred"
      }
    ]
  }
}
```

## Implementation Checklist

When implementing a new use case, ensure:

1. ✅ `parseAndValidateRequest` returns `ValidationResults` with detailed errors
2. ✅ `isAuthorized` is properly implemented
3. ✅ `execute` returns `success: false` with errors for business logic failures
4. ✅ Domain handler wraps execution in try-catch for server errors
5. ✅ OpenAPI document includes all error response codes
6. ✅ Generated handlers are regenerated after OpenAPI changes

## Code Generation

After updating the OpenAPI document, always run:

```bash
npm run codegen
```

This regenerates:
- OpenAPI JSON document
- Handler contracts with proper error types
- Type-safe response unions
