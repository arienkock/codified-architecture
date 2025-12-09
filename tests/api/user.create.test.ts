import { describe, expect, it, afterAll, beforeAll } from '@jest/globals';
import { testRequest } from '../utils/test-request.js';
import { AddressInfo } from 'net';
import { PrismaClient } from '../../src/persistence/generated/prisma/index.js';
import { createServer } from '../../src/server/server.js';

describe('User API', () => {
  let server: ReturnType<typeof createServer>;
  let baseUrl: string;
  let db: PrismaClient;

  beforeAll(async () => {
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
    const agent = testRequest.agent();
    const res = await agent
      .post(`${baseUrl}/users`)
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

    // login as user
    await agent
      .get(`${baseUrl}/dev/loginAsUser?userId=${res.body.id}`)
      .set('content-type', 'application/json');
      
    // get user by id from api and verify the password is not returned
    const user = await agent
      .get(`${baseUrl}/users/${res.body.id}`)
      .set('content-type', 'application/json');
    expect(user.body.email).toBe(email);
    expect(user.body.hashedPassword).toBeUndefined();
  });

  it('returns validation errors for missing and invalid fields', async () => {
    const res = await testRequest
      .post(`${baseUrl}/users`)
      .ok(res => res.status === 400)
      .send({ email: 'invalid-email' })
      .set('content-type', 'application/json');

    expect(res.status).toBe(400);
    expect(res.body.errors).toBeDefined();
    const messages = (res.body.errors ?? []).map((e: any) => e.message);
    expect(messages).toEqual(expect.arrayContaining(["Invalid input: expected string, received undefined"]));
  });

  it('does not show other users to unauthorized users', async () => {
    // register a user
    const email = 'api-user3@example.com';
    const name = 'API User';
    const password = 'supersafe123';
    const agent = testRequest.agent();
    const authUser = await agent
      .post(`${baseUrl}/users`)
      .send({ email, name, password })
      .set('content-type', 'application/json');
    // register another user
    const email2 = 'api-user2@example.com';
    const name2 = 'API User 2';
    const password2 = 'supersafe123';
    const user2 = await agent
      .post(`${baseUrl}/users`)
      .send({ email: email2, name: name2, password: password2 })
      .set('content-type', 'application/json');
    // login as first user
    await agent
      .get(`${baseUrl}/dev/loginAsUser?userId=${authUser.body.id}`)
      .set('content-type', 'application/json');
    // get other user by id from api, it should result in 404
    const user = await agent
    .get(`${baseUrl}/users/${user2.body.id}`)
    .ok(res => res.status === 404)
      .set('content-type', 'application/json');
    // get all users, only authenticated user should be returned
    const users = await agent
      .get(`${baseUrl}/users`)
      .set('content-type', 'application/json');
    expect(users.body.data.length).toBe(1);
    expect(users.body.data[0].email).toBe(email);

    // login as admin
    await agent
      .get(`${baseUrl}/dev/loginAsUser?userId=1&isAdmin=true`)
      .set('content-type', 'application/json');
    // get all users, all users should be returned
    const usersAsAdmin = await agent
      .get(`${baseUrl}/users`)
      .set('content-type', 'application/json');
    expect(usersAsAdmin.body.data.length).toBeGreaterThan(1);
  });

  it('requires authenication all endpoints except creation', async () => {
    const res = await testRequest
      .get(`${baseUrl}/users`)
      .ok(res => res.status === 401)
      .set('content-type', 'application/json');
    const res2 = await testRequest
      .get(`${baseUrl}/users/1`)
      .ok(res => res.status === 401)
      .set('content-type', 'application/json');
    const res3 = await testRequest
      .put(`${baseUrl}/users/1`)
      .ok(res => res.status === 401)
      .set('content-type', 'application/json');
    const res4 = await testRequest
      .delete(`${baseUrl}/users/1`)
      .ok(res => res.status === 401)
      .set('content-type', 'application/json');
  });
  it('deletes a user', async () => {
    // register a user
    const email = 'api-user4@example.com';
    const name = 'API User 4';
    const password = 'supersafe123';
    const agent = testRequest.agent();
    const user = await agent
      .post(`${baseUrl}/users`)
      .send({ email, name, password })
      .set('content-type', 'application/json');
    // login as user
    await agent
      .get(`${baseUrl}/dev/loginAsUser?userId=${user.body.id}`)
      .set('content-type', 'application/json');
    // delete user
    const deleted = await agent
      .delete(`${baseUrl}/users/${user.body.id}`)
      .set('content-type', 'application/json');
    expect(deleted.status).toBe(200);
    // verify user is deleted
    const userNotFound = await agent
      .get(`${baseUrl}/users/${user.body.id}`)
      .ok(res => res.status === 404)
      .set('content-type', 'application/json');
  });
  it('lets admin user update and delete other users', async () => {
    // register a user
    const email = 'api-user5@example.com';
    const name = 'API User 5';
    const password = 'supersafe123';
    const agent = testRequest.agent();
    const user = await agent
      .post(`${baseUrl}/users`)
      .send({ email, name, password })
      .set('content-type', 'application/json');
    // login as admin
    await agent
      .get(`${baseUrl}/dev/loginAsUser?userId=1&isAdmin=true`)
      .set('content-type', 'application/json');
    // update user
    const updated = await agent
      .put(`${baseUrl}/users/${user.body.id}`)
      .send({ email: 'api-user5-updated@example.com', name: 'API User 5 Updated' })
      .set('content-type', 'application/json');
    expect(updated.body.email).toBe('api-user5-updated@example.com');
    expect(updated.body.name).toBe('API User 5 Updated');
    // delete user
    const deleted = await agent
      .delete(`${baseUrl}/users/${user.body.id}`)
      .set('content-type', 'application/json');
    expect(deleted.status).toBe(200);
    // verify user is deleted
    const userNotFound = await agent
      .get(`${baseUrl}/users/${user.body.id}`)
      .ok(res => res.status === 404)
      .set('content-type', 'application/json');
  });
});

