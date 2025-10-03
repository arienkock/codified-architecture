import express, {
  Express,
  NextFunction,
  Request,
  RequestHandler,
  Response,
} from 'express';
import pino from 'pino';
import pinoHttp from 'pino-http';

export interface ServerOptions {
  /**
   * Injectable logger instance. If not provided a default pino logger is created.
   */
  logger?: pino.Logger;
  /**
   * Optional array of additional middleware that should run before routing.
   */
  middleware?: RequestHandler[];
}

export interface ServerInstance {
  app: Express;
  logger: pino.Logger;
}

export function createServer(options: ServerOptions = {}): ServerInstance {
  const transport =
    process.env.NODE_ENV === 'development'
      ? {
          target: 'pino-pretty',
          options: {
            colorize: true,
            translateTime: 'SYS:standard',
          },
        }
      : undefined;

  const logger =
    options.logger ??
    pino({
      level: process.env.LOG_LEVEL ?? 'info',
      ...(transport ? { transport } : {}),
    });

  const app = express();

  app.use(
    pinoHttp({
      logger,
      autoLogging: true,
      wrapSerializers: true,
    })
  );

  app.use(express.json({ limit: '1mb' }));
  app.use(
    express.text({
      type: ['text/plain', 'text/*'],
      limit: '1mb',
    })
  );

  for (const middleware of options.middleware ?? []) {
    app.use(middleware);
  }

  app.get('/healthz', (_req: Request, res: Response) => {
    res.status(200).json({ status: 'ok' });
  });

  app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
    logger.error({ err }, 'Unhandled error');
    res.status(500).json({ error: 'internal_server_error' });
  });

  return { app, logger };
}
