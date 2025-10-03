import { Express, Request, Response, NextFunction } from 'express';
import pino from 'pino';
import * as handlers from './generated/handlers/index.js';
import { HandlerContract } from './handlerContract.js';

export function registerGeneratedHandlers(app: Express, logger: pino.Logger): void {
  // Get all exported values from the generated handlers
  const exportedValues = Object.values(handlers);

  logger.info({ count: exportedValues.length }, 'Registering generated handlers');

  for (const handler of exportedValues) {
    registerHandler(app, handler, logger);
  }
}

function registerHandler(app: Express, handler: HandlerContract, logger: pino.Logger): void {
  const method = handler.method.toLowerCase() as keyof Express;
  const path = handler.path;

  logger.debug({ method: handler.method, path }, 'Registering handler');

  app[method](path, createHandlerMiddleware(handler, logger));
}

function createHandlerMiddleware(handler: HandlerContract, logger: pino.Logger) {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // Parse and validate path parameters
      const pathParams = handler.parsePathParams(req.params);

      // Parse and validate query parameters
      const queryParams = handler.parseQueryParams(req.query);

      // Parse and validate header parameters
      const headerParams = handler.parseHeaderParams(req.headers);

      // Parse and validate request body
      const requestBody = handler.parseRequestBody(req.body);

      // TODO: Here we would invoke the domain use case
      // For now, return a placeholder response
      const responseData = {
        message: 'Handler registered successfully',
        path: handler.path,
        method: handler.method,
        parsedParams: {
          path: pathParams,
          query: queryParams,
          headers: headerParams,
          body: requestBody,
        },
      };

      // Parse response through schema (for type safety)
      const validatedResponse = handler.parseResponse('200', responseData);

      res.status(200).json(validatedResponse);
    } catch (error) {
      logger.error({ error, path: handler.path, method: handler.method }, 'Handler execution failed');

      // Check if it's a Zod validation error
      if (error instanceof Error && 'issues' in error) {
        // Zod validation error
        const statusCode = handler.responseSchemas['400'] ? 400 : 500;
        const errorResponse = handler.parseResponse(statusCode.toString(), undefined);
        res.status(statusCode).json(errorResponse);
        return;
      }

      // Pass to global error handler
      next(error);
    }
  };
}
