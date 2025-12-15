import { describe, expect, it, afterAll, beforeAll } from '@jest/globals';
import request from 'superagent';
import { AddressInfo } from 'net';
import { PrismaClient } from '../../src/persistence/generated/prisma/index.js';
import { createServer } from '../../src/server/server.js';

describe('Organization API - creation', () => {
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
    await new Promise<void>((resolve, reject) =>
      server.close(err => (err ? reject(err) : resolve())),
    );
  });

  it('allows an admin user to create an organization and adds them as admin member', async () => {
    const agent = request.agent();

    // First create a user that will act as the admin
    const userRes = await agent
      .post(`${baseUrl}/users`)
      .send({ email: 'org-admin@example.com', name: 'Org Admin', password: 'supersafe123' })
      .set('content-type', 'application/json');

    // Log in as this user with admin privileges
    await agent
      .get(`${baseUrl}/dev/loginAsUser?userId=${userRes.body.id}&isAdmin=true`)
      .set('content-type', 'application/json');

    const orgName = 'Test Organization';
    const orgRes = await agent
      .post(`${baseUrl}/organizations`)
      .send({ name: orgName })
      .set('content-type', 'application/json');

    expect(orgRes.status).toBe(200);
    expect(orgRes.body.name).toBe(orgName);
    expect(typeof orgRes.body.id).toBe('number');
    expect(orgRes.body.members).toBeUndefined();
    expect(orgRes.body.invitations).toBeUndefined();

    const persistedOrg = await db.organization.findUnique({ where: { id: orgRes.body.id } });
    expect(persistedOrg?.name).toBe(orgName);

    const membership = await db.userOrganization.findFirst({
      where: {
        userId: userRes.body.id,
        organizationId: orgRes.body.id,
      },
    });
    expect(membership).toBeTruthy();
    expect(membership?.isAdmin).toBe(true);
  });

  it('returns validation errors for invalid payload', async () => {
    const agent = request.agent();

    // Create and log in an admin user
    const userRes = await agent
      .post(`${baseUrl}/users`)
      .send({ email: 'org-admin-validation@example.com', name: 'Org Admin', password: 'supersafe123' })
      .set('content-type', 'application/json');

    await agent
      .get(`${baseUrl}/dev/loginAsUser?userId=${userRes.body.id}&isAdmin=true`)
      .set('content-type', 'application/json');

    const res = await agent
      .post(`${baseUrl}/organizations`)
      .ok(r => r.status === 400)
      // Missing required "name" and with an unexpected field to exercise strict schema
      .send({ unexpected: 'field' })
      .set('content-type', 'application/json');

    expect(res.status).toBe(400);
    expect(res.body.errors).toBeDefined();
    const messages = (res.body.errors ?? []).map((e: any) => e.message);
    expect(messages.length).toBeGreaterThan(0);
  });

  it('rejects unauthenticated organization creation requests', async () => {
    const res = await request
      .post(`${baseUrl}/organizations`)
      .ok(r => r.status === 401)
      .send({ name: 'Should Not Work' })
      .set('content-type', 'application/json');

    expect(res.status).toBe(401);
    expect(res.body.message).toBe('Unauthorized');
  });

  it('rejects non-admin users creating organizations', async () => {
    const agent = request.agent();

    // Create a regular (non-admin) user
    const userRes = await agent
      .post(`${baseUrl}/users`)
      .send({ email: 'org-regular@example.com', name: 'Regular User', password: 'supersafe123' })
      .set('content-type', 'application/json');

    // Log in without admin flag
    await agent
      .get(`${baseUrl}/dev/loginAsUser?userId=${userRes.body.id}`)
      .set('content-type', 'application/json');

    const res = await agent
      .post(`${baseUrl}/organizations`)
      .ok(r => r.status === 401)
      .send({ name: 'Org By Non-Admin' })
      .set('content-type', 'application/json');

    expect(res.status).toBe(401);
    expect(res.body.message).toBe('Unauthorized');
  });
});


