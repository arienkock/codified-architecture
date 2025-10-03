import { createDocument } from 'zod-openapi';

import { UserCreateRequestSchema, UserCreateResponseSchema } from '../domain-seam/types';

export const document: ReturnType<typeof createDocument> = createDocument({
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
              schema: UserCreateRequestSchema.meta({
                description: 'User creation payload.',
                example: {
                  email: 'user@example.com',
                  name: 'Taylor',
                },
              }),
            },
          },
        },
        responses: {
          201: {
            description: 'User successfully created.',
            content: {
              'application/json': {
                schema: UserCreateResponseSchema.meta({
                  description: 'Representation of the newly created user.',
                  example: {
                    id: 1,
                    email: 'user@example.com',
                    name: 'Taylor',
                  },
                }),
              },
            },
          },
          400: {
            description: 'The request payload was invalid.',
          },
          401: {
            description: 'The request was not authorized.',
          },
        },
      },
    },
  },
});

