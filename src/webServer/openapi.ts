import { createDocument } from 'zod-openapi';

import * as TypesAndSchemas from '../domain-seam/types';

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
        post: {
          summary: 'Create a user',
          description: 'Accepts user details and creates a new user record.',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: TypesAndSchemas["UserCreateRequestSchema"].meta({schemaName: "UserCreateRequestSchema"}),
              },
            },
          },
          responses: {
            201: {
              description: 'User successfully created.',
              content: {
                'application/json': {
                  schema: TypesAndSchemas["UserCreateResponseSchema"].meta({schemaName: "UserCreateResponseSchema"}),
                },
              },
            },
            400: {
              description: 'The request payload was invalid.',
            }
          },
        },
      },
    },
  });
  return doc;
})();
