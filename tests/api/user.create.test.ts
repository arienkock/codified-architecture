import { describe, expect, it, afterAll, beforeAll } from '@jest/globals';
import request from 'superagent';
import { AddressInfo } from 'net';
import { PrismaClient } from '../../src/persistence/generated/prisma/index.js';
import { createServer } from '../../src/server/server.js';
import { getTestDatabaseUrl } from '../utils/test-db.js';

describe('User API - create', () => {
  let server: ReturnType<typeof createServer>;
  let baseUrl: string;
  let db: PrismaClient;

  beforeAll(async () => {
    process.env.DATABASE_URL = getTestDatabaseUrl();
    db = new PrismaClient();
    server = createServer(db, 0);
    const address = server.address() as AddressInfo;
    baseUrl = `http://127.0.0.1:${address.port}`;
  });

  afterAll(async () => {
    await db.$disconnect();
    server.close();
  });

  it('creates a user and returns sanitized payload', async () => {
    const email = 'api-user@example.com';
    const name = 'API User';
    const password = 'supersafe123';

    const res = await request
      .post(`${baseUrl}/Users`)
      .send({ email, name, password })
      .set('content-type', 'application/json');

    expect(res.status).toBe(200);
    expect(res.body.email).toBe(email);
    expect(res.body.name).toBe(name);
    expect(typeof res.body.id).toBe('number');
    expect(res.body.hashedPassword).toBeUndefined();

    const persisted = await db.user.findUnique({ where: { id: res.body.id } });
    expect(persisted?.email).toBe(email);
    expect(persisted?.hashedPassword).toBeDefined();
    expect(persisted?.hashedPassword).not.toBe(password);
  });
});

