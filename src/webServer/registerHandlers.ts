import { Express, Request, Response, NextFunction } from 'express';
import pino from 'pino';
import * as handlers from './generated/handlers/index.js';
import { HandlerContract } from './handlerContract.js';
import type { AppContext } from '../AppContext.js';

export function registerGeneratedHandlers(app: Express, logger: pino.Logger, appContext: AppContext): void {
  // Get all exported values from the generated handlers
  const exportedValues = Object.values(handlers);

  logger.info({ count: exportedValues.length }, 'Registering generated handlers');

  for (const handler of exportedValues) {
    registerHandler(app, handler, logger, appContext);
  }
}

function registerHandler(app: Express, handler: HandlerContract, logger: pino.Logger, appContext: AppContext): void {
  const method = handler.method.toLowerCase() as keyof Express;
  const path = handler.path;

  logger.debug({ method: handler.method, path }, 'Registering handler');

  app[method](path, createHandlerMiddleware(handler, logger, appContext));
}

function createHandlerMiddleware(handler: HandlerContract, logger: pino.Logger, appContext: AppContext) {
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

      // Call the handler with parsed parameters
      const response = await handler.handle({
        pathParams,
        queryParams,
        headerParams,
        requestBody,
        appContext,
      });

      // Send the response - TypeScript ensures the body matches the status code schema
      res.status(response.status).json(response.body);
    } catch (error) {
      logger.error({ error, path: handler.path, method: handler.method }, 'Handler execution failed');

      // Check if it's a Zod validation error
      if (error instanceof Error && 'issues' in error) {
        // Zod validation error - return 400 if defined in response schemas
        const statusCode = handler.responseSchemas['400'] ? 400 : 500;
        res.status(statusCode).json(undefined);
        return;
      }

      // Pass to global error handler
      next(error);
    }
  };
}
