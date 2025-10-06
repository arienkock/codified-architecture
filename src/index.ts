import { createServer } from './webServer/server.js';
import { createAppContext, closeAppContext } from './AppContext.js';

async function main(): Promise<void> {
  const appContext = createAppContext();

  const { app, logger } = createServer({ appContext });

  const port = Number.parseInt(process.env.PORT ?? '3000', 10);

  const server = app.listen(port, () => {
    logger.info({ port }, 'HTTP server listening');
  });

  // Graceful shutdown
  const shutdown = async () => {
    logger.info('Shutting down gracefully...');
    server.close(async () => {
      await closeAppContext(appContext);
      logger.info('Server closed');
      process.exit(0);
    });
  };

  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);
}

main().catch((error) => {
  // eslint-disable-next-line no-console
  console.error('Failed to start server', error);
  process.exit(1);
});
