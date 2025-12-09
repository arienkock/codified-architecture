import { dropTestDatabase, getTestDatabaseUrl } from './test-db';

export default async function globalTeardown() {
  const dbUrl = getTestDatabaseUrl();
  process.env.DATABASE_URL = dbUrl;
  await dropTestDatabase(dbUrl);
}

