import { applyMigrations, dropTestDatabase, getTestDatabaseUrl } from './test-db';

export default async function globalSetup() {
  const dbUrl = getTestDatabaseUrl();
  process.env.DATABASE_URL = dbUrl;
  await dropTestDatabase(dbUrl);
  applyMigrations(dbUrl);
}

