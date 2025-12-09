import { applyMigrations, dropTestDatabase, getTestDatabaseUrl } from './test-db';

export default async function globalSetup() {
  process.env.NODE_ENV = 'test';
  process.env.DATABASE_URL = getTestDatabaseUrl();
  await dropTestDatabase();
  applyMigrations();
}

