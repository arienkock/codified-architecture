import { PrismaClient } from '../../src/persistence/generated/prisma/index.js';
import { execSync } from 'node:child_process';
import path from 'node:path';

const DEFAULT_DB_URL =
  process.env.TEST_DATABASE_URL ??
  'postgresql://postgres:postgres@localhost:5432/codified_architecture_test';

const repoRoot = process.cwd();

export function getTestDatabaseUrl(): string {
  return DEFAULT_DB_URL;
}

export function getTestDatabaseName(): string {
  const url = new URL(getTestDatabaseUrl());
  return url.pathname.slice(1); // Remove leading '/'
}

export async function dropTestDatabase(dbUrl = getTestDatabaseUrl()) {
  const dbName = getTestDatabaseName();

  // Connect to postgres database (not the test database) to drop/create the test database
  const url = new URL(dbUrl);
  url.pathname = '/postgres';
  const postgresUrl = url.toString();
  
  const prisma = new PrismaClient({ datasources: { db: { url: postgresUrl } } });
  try {
    // Terminate any existing connections to the test database
    await prisma.$executeRawUnsafe(
      `SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE datname = '${dbName}' AND pid <> pg_backend_pid()`
    );
  } catch (error) {
    // Ignore errors if there are no connections to terminate
  }
  
  try {
    await prisma.$executeRawUnsafe(`DROP DATABASE IF EXISTS ${dbName}`);
  } catch (error) {
    // Ignore errors if database doesn't exist
  }
  
  await prisma.$executeRawUnsafe(`CREATE DATABASE ${dbName}`);
  await prisma.$disconnect();
}

export function applyMigrations(dbUrl = getTestDatabaseUrl()) {
  execSync('npx prisma migrate deploy', {
    cwd: repoRoot,
    stdio: 'inherit',
    env: {
      ...process.env,
      DATABASE_URL: dbUrl,
    },
  });
}

