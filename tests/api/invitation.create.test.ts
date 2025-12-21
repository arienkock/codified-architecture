import { describe, expect, it, afterAll, beforeAll } from '@jest/globals';
import request from 'superagent';
import { AddressInfo } from 'net';
import { PrismaClient } from '../../src/persistence/generated/prisma/index.js';
import { createServer } from '../../src/server/server.js';
import { AppConfig, defaultConfig } from '../../src/config.js';

describe('Invitation API - creation', () => {
  let server: ReturnType<typeof createServer>;
  let baseUrl: string;
  let db: PrismaClient;
  let config: AppConfig;

  beforeAll(async () => {
    db = new PrismaClient();
    config = {
      ...defaultConfig,
      RATE_LIMIT_THRESHOLD: Number.MAX_SAFE_INTEGER,
    };
    server = createServer(db, 0, config);
    const address = server.address() as AddressInfo;
    baseUrl = `http://127.0.0.1:${address.port}`;
  });

  afterAll(async () => {
    await db.$disconnect();
    await new Promise<void>((resolve, reject) =>
      server.close(err => (err ? reject(err) : resolve())),
    );
  });

  it('allows a global admin to create an invitation for any org and any user', async () => {
    const adminAgent = request.agent();

    // Create a global admin user
    const adminUser = await adminAgent
      .post(`${baseUrl}/users`)
      .send({ email: 'inv-admin@example.com', name: 'Inv Admin', password: 'supersafe123' })
      .set('content-type', 'application/json');

    await adminAgent
      .get(`${baseUrl}/dev/loginAsUser?userId=${adminUser.body.id}&isAdmin=true`)
      .set('content-type', 'application/json');

    // Create an organization (admin will be member via postCreateHook)
    const org = await adminAgent
      .post(`${baseUrl}/organizations`)
      .send({ name: 'Test Org for Invitation' })
      .set('content-type', 'application/json');

    // Create another user to invite
    const inviteeUser = await adminAgent
      .post(`${baseUrl}/users`)
      .send({ email: 'invitee@example.com', name: 'Invitee User', password: 'supersafe123' })
      .set('content-type', 'application/json');

    // Global admin can create invitation for any org and any user
    const invitationRes = await adminAgent
      .post(`${baseUrl}/invitations`)
      .send({
        userId: inviteeUser.body.id,
        organizationId: org.body.id,
        ttlMinutes: 1440,
      })
      .set('content-type', 'application/json');

    expect(invitationRes.status).toBe(200);
    expect(invitationRes.body.userId).toBe(inviteeUser.body.id);
    expect(invitationRes.body.organizationId).toBe(org.body.id);
    expect(invitationRes.body.ttlMinutes).toBe(1440);
    expect(typeof invitationRes.body.id).toBe('number');
    expect(invitationRes.body.accepted).toBe(false);
    expect(invitationRes.body.user).toBeUndefined();
    expect(invitationRes.body.organization).toBeUndefined();

    // Verify invitation was persisted
    const persistedInvitation = await db.organizationInvitation.findUnique({
      where: { id: invitationRes.body.id },
    });
    expect(persistedInvitation).toBeTruthy();
    expect(persistedInvitation?.userId).toBe(inviteeUser.body.id);
    expect(persistedInvitation?.organizationId).toBe(org.body.id);
  });

  it('allows an org admin to create an invitation for their org', async () => {
    const adminAgent = request.agent();

    // Create a global admin to set up the organization
    const globalAdmin = await adminAgent
      .post(`${baseUrl}/users`)
      .send({ email: 'inv-global-admin@example.com', name: 'Global Admin', password: 'supersafe123' })
      .set('content-type', 'application/json');

    await adminAgent
      .get(`${baseUrl}/dev/loginAsUser?userId=${globalAdmin.body.id}&isAdmin=true`)
      .set('content-type', 'application/json');

    // Create an organization
    const org = await adminAgent
      .post(`${baseUrl}/organizations`)
      .send({ name: 'Org for Org Admin Invitation' })
      .set('content-type', 'application/json');

    // Create an org admin user (not global admin)
    const orgAdminAgent = request.agent();
    const orgAdminUser = await orgAdminAgent
      .post(`${baseUrl}/users`)
      .send({ email: 'inv-org-admin@example.com', name: 'Org Admin', password: 'supersafe123' })
      .set('content-type', 'application/json');

    // Add org admin as admin of the organization
    await db.userOrganization.create({
      data: {
        userId: orgAdminUser.body.id,
        organizationId: org.body.id,
        isCurrent: true,
        isAdmin: true,
      },
    });

    // Create a user to invite
    const inviteeUser = await orgAdminAgent
      .post(`${baseUrl}/users`)
      .send({ email: 'invitee-org-admin@example.com', name: 'Invitee', password: 'supersafe123' })
      .set('content-type', 'application/json');

    // Log in as org admin (not global admin)
    await orgAdminAgent
      .get(`${baseUrl}/dev/loginAsUser?userId=${orgAdminUser.body.id}`)
      .set('content-type', 'application/json');

    // Org admin can create invitation for their org
    const invitationRes = await orgAdminAgent
      .post(`${baseUrl}/invitations`)
      .send({
        userId: inviteeUser.body.id,
        organizationId: org.body.id,
        ttlMinutes: 1440,
      })
      .set('content-type', 'application/json');

    expect(invitationRes.status).toBe(200);
    expect(invitationRes.body.userId).toBe(inviteeUser.body.id);
    expect(invitationRes.body.organizationId).toBe(org.body.id);

    // Verify invitation was persisted
    const persistedInvitation = await db.organizationInvitation.findUnique({
      where: { id: invitationRes.body.id },
    });
    expect(persistedInvitation).toBeTruthy();
    expect(persistedInvitation?.userId).toBe(inviteeUser.body.id);
    expect(persistedInvitation?.organizationId).toBe(org.body.id);
  });

  it('prevents an org admin from creating an invitation for an org they are not admin of', async () => {
    const adminAgent = request.agent();

    // Create a global admin to set up organizations
    const globalAdmin = await adminAgent
      .post(`${baseUrl}/users`)
      .send({ email: 'inv-global-admin-other@example.com', name: 'Global Admin', password: 'supersafe123' })
      .set('content-type', 'application/json');

    await adminAgent
      .get(`${baseUrl}/dev/loginAsUser?userId=${globalAdmin.body.id}&isAdmin=true`)
      .set('content-type', 'application/json');

    // Create two organizations
    const org1 = await adminAgent
      .post(`${baseUrl}/organizations`)
      .send({ name: 'Org 1 - Admin Org' })
      .set('content-type', 'application/json');

    const org2 = await adminAgent
      .post(`${baseUrl}/organizations`)
      .send({ name: 'Org 2 - Non-Admin Org' })
      .set('content-type', 'application/json');

    // Create an org admin user who is admin of org1 but not org2
    const orgAdminAgent = request.agent();
    const orgAdminUser = await orgAdminAgent
      .post(`${baseUrl}/users`)
      .send({ email: 'inv-org-admin-other@example.com', name: 'Org Admin', password: 'supersafe123' })
      .set('content-type', 'application/json');

    // Add org admin as admin of org1 only
    await db.userOrganization.create({
      data: {
        userId: orgAdminUser.body.id,
        organizationId: org1.body.id,
        isCurrent: true,
        isAdmin: true,
      },
    });

    // Create a user to invite
    const inviteeUser = await orgAdminAgent
      .post(`${baseUrl}/users`)
      .send({ email: 'invitee-other-org@example.com', name: 'Invitee', password: 'supersafe123' })
      .set('content-type', 'application/json');

    // Log in as org admin
    await orgAdminAgent
      .get(`${baseUrl}/dev/loginAsUser?userId=${orgAdminUser.body.id}`)
      .set('content-type', 'application/json');

    // Org admin cannot create invitation for org2 (they're not admin of it)
    const res = await orgAdminAgent
      .post(`${baseUrl}/invitations`)
      .ok(r => r.status === 401)
      .send({
        userId: inviteeUser.body.id,
        organizationId: org2.body.id,
        ttlMinutes: 1440,
      })
      .set('content-type', 'application/json');

    expect(res.status).toBe(401);
    expect(res.body.message).toBe('Unauthorized');
  });

  it('prevents a regular user from creating an invitation', async () => {
    const adminAgent = request.agent();

    // Create a global admin to set up the organization
    const globalAdmin = await adminAgent
      .post(`${baseUrl}/users`)
      .send({ email: 'inv-global-admin-regular@example.com', name: 'Global Admin', password: 'supersafe123' })
      .set('content-type', 'application/json');

    await adminAgent
      .get(`${baseUrl}/dev/loginAsUser?userId=${globalAdmin.body.id}&isAdmin=true`)
      .set('content-type', 'application/json');

    // Create an organization
    const org = await adminAgent
      .post(`${baseUrl}/organizations`)
      .send({ name: 'Org for Regular User Test' })
      .set('content-type', 'application/json');

    // Create a regular user (not admin)
    const regularAgent = request.agent();
    const regularUser = await regularAgent
      .post(`${baseUrl}/users`)
      .send({ email: 'inv-regular-user@example.com', name: 'Regular User', password: 'supersafe123' })
      .set('content-type', 'application/json');

    // Add regular user as non-admin member of the organization
    await db.userOrganization.create({
      data: {
        userId: regularUser.body.id,
        organizationId: org.body.id,
        isCurrent: true,
        isAdmin: false,
      },
    });

    // Create a user to invite
    const inviteeUser = await regularAgent
      .post(`${baseUrl}/users`)
      .send({ email: 'invitee-regular@example.com', name: 'Invitee', password: 'supersafe123' })
      .set('content-type', 'application/json');

    // Log in as regular user (not admin)
    await regularAgent
      .get(`${baseUrl}/dev/loginAsUser?userId=${regularUser.body.id}`)
      .set('content-type', 'application/json');

    // Regular user cannot create invitation
    const res = await regularAgent
      .post(`${baseUrl}/invitations`)
      .ok(r => r.status === 401)
      .send({
        userId: inviteeUser.body.id,
        organizationId: org.body.id,
        ttlMinutes: 1440,
      })
      .set('content-type', 'application/json');

    expect(res.status).toBe(401);
    expect(res.body.message).toBe('Unauthorized');
  });

  it('rejects unauthenticated invitation creation requests', async () => {
    const res = await request
      .post(`${baseUrl}/invitations`)
      .ok(r => r.status === 401)
      .send({
        userId: 1,
        organizationId: 1,
        ttlMinutes: 1440,
      })
      .set('content-type', 'application/json');

    expect(res.status).toBe(401);
    expect(res.body.message).toBe('Unauthorized');
  });

  it('returns validation errors for invalid payload', async () => {
    const agent = request.agent();

    // Create and log in an admin user
    const userRes = await agent
      .post(`${baseUrl}/users`)
      .send({ email: 'inv-admin-validation@example.com', name: 'Admin', password: 'supersafe123' })
      .set('content-type', 'application/json');

    await agent
      .get(`${baseUrl}/dev/loginAsUser?userId=${userRes.body.id}&isAdmin=true`)
      .set('content-type', 'application/json');

    const res = await agent
      .post(`${baseUrl}/invitations`)
      .ok(r => r.status === 400)
      // Missing required fields and with an unexpected field to exercise strict schema
      .send({ unexpected: 'field' })
      .set('content-type', 'application/json');

    expect(res.status).toBe(400);
    expect(res.body.errors).toBeDefined();
    const messages = (res.body.errors ?? []).map((e: any) => e.message);
    expect(messages.length).toBeGreaterThan(0);
  });
});

