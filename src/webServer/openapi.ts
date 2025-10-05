import { createDocument } from 'zod-openapi';

import * as TypesAndSchemas from '../domain-seam/types';


const POST_USERS = {
  summary: 'Create a user',
  description: 'Accepts user details and creates a new user record.',
  requestBody: {
    required: true,
    content: createContent("UserCreateRequestSchema"),
  },
  responses: {
    201: {
      description: 'User successfully created.',
      content: createContent("UserCreateUseCaseResponseSchema"),
    },
    400: {
      description: 'Validation error - the request payload was invalid.',
      content: createContent("ErrorResponseSchema"),
    },
    401: {
      description: 'Unauthorized - authentication required.',
      content: createContent("ErrorResponseSchema"),
    },
    403: {
      description: 'Forbidden - insufficient permissions.',
      content: createContent("ErrorResponseSchema"),
    },
    422: {
      description: 'Business logic error - the request was valid but could not be processed.',
      content: createContent("ErrorResponseSchema"),
    },
    500: {
      description: 'Internal server error.',
      content: createContent("ErrorResponseSchema"),
    }
  },
}

const PATCH_USERS_ID = {
  summary: 'Update a user',
  description: 'Updates an existing user record with the provided details.',
  parameters: [
    {
      name: 'id',
      in: 'path' as const,
      required: true,
      schema: {
        type: 'integer' as const,
      },
      description: 'The ID of the user to update',
    },
  ],
  requestBody: {
    required: true,
    content: createContent("UserUpdateRequestSchema"),
  },
  responses: {
    200: {
      description: 'User successfully updated.',
      content: createContent("UserUpdateUseCaseResponseSchema"),
    },
    400: {
      description: 'Validation error - the request payload was invalid.',
      content: createContent("ErrorResponseSchema"),
    },
    401: {
      description: 'Unauthorized - authentication required.',
      content: createContent("ErrorResponseSchema"),
    },
    403: {
      description: 'Forbidden - insufficient permissions.',
      content: createContent("ErrorResponseSchema"),
    },
    404: {
      description: 'Not found - the user does not exist.',
      content: createContent("ErrorResponseSchema"),
    },
    422: {
      description: 'Business logic error - the request was valid but could not be processed.',
      content: createContent("ErrorResponseSchema"),
    },
    500: {
      description: 'Internal server error.',
      content: createContent("ErrorResponseSchema"),
    }
  },
}


export const document: ReturnType<typeof createDocument> = (() => {
  const doc = createDocument({
    openapi: '3.1.0',
    info: {
      title: 'User Service API',
      version: '0.1.0',
      description: 'OpenAPI documentation for user-related endpoints.',
    },
    paths: {
      '/users': {
        post: POST_USERS,
      },
      '/users/{id}': {
        patch: PATCH_USERS_ID,
      }
    },
  });
  return doc;
})();

function createContent(schemaName: keyof typeof TypesAndSchemas) {
  return {
    'application/json': {
      schema: TypesAndSchemas[schemaName].meta({ schemaName: schemaName }),
    }
  }
}
