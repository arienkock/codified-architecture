import { createServer } from './webServer/server';

async function main(): Promise<void> {
  const { app, logger } = createServer();

  const port = Number.parseInt(process.env.PORT ?? '3000', 10);

  app.listen(port, () => {
    logger.info({ port }, 'HTTP server listening');
  });
}

main().catch((error) => {
  // eslint-disable-next-line no-console
  console.error('Failed to start server', error);
  process.exit(1);
});
