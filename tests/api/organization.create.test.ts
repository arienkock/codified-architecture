import { describe, expect, it, afterAll, beforeAll } from '@jest/globals';
import request from 'superagent';
import { AddressInfo } from 'net';
import { PrismaClient } from '../../src/persistence/generated/prisma/index.js';
import { createServer } from '../../src/server/server.js';
import { AppConfig, defaultConfig } from '../../src/config.js';

describe('Organization API - creation', () => {
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

describe('Organization API - read (get many & get one)', () => {
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

  it('returns 401 for listing organizations when unauthenticated', async () => {
    const res = await request
      .get(`${baseUrl}/organizations`)
      .ok(r => r.status === 401)
      .set('content-type', 'application/json');

    expect(res.status).toBe(401);
    expect(res.body.message).toBe('Unauthorized');
  });

  it('allows an admin user to list all organizations', async () => {
    const agent = request.agent();

    // Create an admin user
    const adminUser = await agent
      .post(`${baseUrl}/users`)
      .send({ email: 'org-admin-list@example.com', name: 'Org Admin List', password: 'supersafe123' })
      .set('content-type', 'application/json');

    await agent
      .get(`${baseUrl}/dev/loginAsUser?userId=${adminUser.body.id}&isAdmin=true`)
      .set('content-type', 'application/json');

    // Create a couple of organizations
    const org1 = await agent
      .post(`${baseUrl}/organizations`)
      .send({ name: 'List Org 1' })
      .set('content-type', 'application/json');
    const org2 = await agent
      .post(`${baseUrl}/organizations`)
      .send({ name: 'List Org 2' })
      .set('content-type', 'application/json');

    const res = await agent
      .get(`${baseUrl}/organizations?pageSize=1000`)
      .set('content-type', 'application/json');

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
    const ids = res.body.data.map((o: any) => o.id);
    expect(ids).toEqual(expect.arrayContaining([org1.body.id, org2.body.id]));
  });

  it('restricts list of organizations to memberships for regular users', async () => {
    const adminAgent = request.agent();

    // Create an admin user to set up data
    const adminUser = await adminAgent
      .post(`${baseUrl}/users`)
      .send({ email: 'org-admin-restrict@example.com', name: 'Org Admin Restrict', password: 'supersafe123' })
      .set('content-type', 'application/json');

    await adminAgent
      .get(`${baseUrl}/dev/loginAsUser?userId=${adminUser.body.id}&isAdmin=true`)
      .set('content-type', 'application/json');

    // Create two organizations
    const orgMember = await adminAgent
      .post(`${baseUrl}/organizations`)
      .send({ name: 'Member Org' })
      .set('content-type', 'application/json');
    const orgNonMember = await adminAgent
      .post(`${baseUrl}/organizations`)
      .send({ name: 'Non-Member Org' })
      .set('content-type', 'application/json');

    // Create a regular user and add membership only to the first organization
    const regularAgent = request.agent();
    const regularUser = await regularAgent
      .post(`${baseUrl}/users`)
      .send({ email: 'org-regular-restrict@example.com', name: 'Org Regular Restrict', password: 'supersafe123' })
      .set('content-type', 'application/json');

    await db.userOrganization.create({
      data: {
        userId: regularUser.body.id,
        organizationId: orgMember.body.id,
        isCurrent: true,
        isAdmin: false,
      },
    });

    await regularAgent
      .get(`${baseUrl}/dev/loginAsUser?userId=${regularUser.body.id}`)
      .set('content-type', 'application/json');

    const res = await regularAgent
      .get(`${baseUrl}/organizations`)
      .set('content-type', 'application/json');

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
    const returnedIds = res.body.data.map((o: any) => o.id);

    // Should see the organization they are a member of
    expect(returnedIds).toEqual(expect.arrayContaining([orgMember.body.id]));

    // Should not see organizations they are not a member of (at least our specifically created one)
    expect(returnedIds).not.toEqual(expect.arrayContaining([orgNonMember.body.id]));

    // Additionally, for each returned org, verify there is a membership record for this user
    // to ensure the security filter is correctly enforced.
    for (const org of res.body.data as any[]) {
      const membership = await db.userOrganization.findFirst({
        where: {
          userId: regularUser.body.id,
          organizationId: org.id,
        },
      });
      expect(membership).toBeTruthy();
    }
  });

  it('returns 401 for getting a single organization when unauthenticated', async () => {
    const agent = request.agent();

    // Create an organization via admin to have a valid ID
    const adminUser = await agent
      .post(`${baseUrl}/users`)
      .send({ email: 'org-admin-single-unauth@example.com', name: 'Org Admin Single Unauth', password: 'supersafe123' })
      .set('content-type', 'application/json');

    await agent
      .get(`${baseUrl}/dev/loginAsUser?userId=${adminUser.body.id}&isAdmin=true`)
      .set('content-type', 'application/json');

    const org = await agent
      .post(`${baseUrl}/organizations`)
      .send({ name: 'Single Org Unauth' })
      .set('content-type', 'application/json');

    // Now call without auth (no cookies)
    const res = await request
      .get(`${baseUrl}/organizations/${org.body.id}`)
      .ok(r => r.status === 401)
      .set('content-type', 'application/json');

    expect(res.status).toBe(401);
    expect(res.body.message).toBe('Unauthorized');
  });

  it('allows a member to get their organization but not others', async () => {
    const adminAgent = request.agent();

    // Create admin
    const adminUser = await adminAgent
      .post(`${baseUrl}/users`)
      .send({ email: 'org-admin-single@example.com', name: 'Org Admin Single', password: 'supersafe123' })
      .set('content-type', 'application/json');

    await adminAgent
      .get(`${baseUrl}/dev/loginAsUser?userId=${adminUser.body.id}&isAdmin=true`)
      .set('content-type', 'application/json');

    // Create two organizations
    const orgMember = await adminAgent
      .post(`${baseUrl}/organizations`)
      .send({ name: 'Single Member Org' })
      .set('content-type', 'application/json');
    const orgNonMember = await adminAgent
      .post(`${baseUrl}/organizations`)
      .send({ name: 'Single Non-Member Org' })
      .set('content-type', 'application/json');

    // Create regular user and add them as member only to orgMember
    const regularAgent = request.agent();
    const regularUser = await regularAgent
      .post(`${baseUrl}/users`)
      .send({ email: 'org-regular-single@example.com', name: 'Org Regular Single', password: 'supersafe123' })
      .set('content-type', 'application/json');

    await db.userOrganization.create({
      data: {
        userId: regularUser.body.id,
        organizationId: orgMember.body.id,
        isCurrent: true,
        isAdmin: false,
      },
    });

    await regularAgent
      .get(`${baseUrl}/dev/loginAsUser?userId=${regularUser.body.id}`)
      .set('content-type', 'application/json');

    // They can get the organization they are a member of
    const allowed = await regularAgent
      .get(`${baseUrl}/organizations/${orgMember.body.id}`)
      .set('content-type', 'application/json');

    expect(allowed.status).toBe(200);
    expect(allowed.body.id).toBe(orgMember.body.id);

    // But not an organization they are not a member of (security filter should cause 404)
    const forbidden = await regularAgent
      .get(`${baseUrl}/organizations/${orgNonMember.body.id}`)
      .ok(r => r.status === 404)
      .set('content-type', 'application/json');

    expect(forbidden.status).toBe(404);
  });

  it('allows an admin to get any organization, regardless of membership', async () => {
    const agent = request.agent();

    // Create admin
    const adminUser = await agent
      .post(`${baseUrl}/users`)
      .send({ email: 'org-admin-any@example.com', name: 'Org Admin Any', password: 'supersafe123' })
      .set('content-type', 'application/json');

    await agent
      .get(`${baseUrl}/dev/loginAsUser?userId=${adminUser.body.id}&isAdmin=true`)
      .set('content-type', 'application/json');

    // Create an organization (admin will be member via postCreateHook)
    const org = await agent
      .post(`${baseUrl}/organizations`)
      .send({ name: 'Admin Any Org' })
      .set('content-type', 'application/json');

    const res = await agent
      .get(`${baseUrl}/organizations/${org.body.id}`)
      .set('content-type', 'application/json');

    expect(res.status).toBe(200);
    expect(res.body.id).toBe(org.body.id);
  });
});

describe('Organization API - update', () => {
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

  it('returns 401 for updating an organization when unauthenticated', async () => {
    const agent = request.agent();

    // Create an organization via admin to have a valid ID
    const adminUser = await agent
      .post(`${baseUrl}/users`)
      .send({
        email: 'org-admin-update-unauth@example.com',
        name: 'Org Admin Update Unauth',
        password: 'supersafe123',
      })
      .set('content-type', 'application/json');

    await agent
      .get(`${baseUrl}/dev/loginAsUser?userId=${adminUser.body.id}&isAdmin=true`)
      .set('content-type', 'application/json');

    const org = await agent
      .post(`${baseUrl}/organizations`)
      .send({ name: 'Update Org Unauth' })
      .set('content-type', 'application/json');

    // Now call without auth (no cookies)
    const res = await request
      .put(`${baseUrl}/organizations/${org.body.id}`)
      .ok(r => r.status === 401)
      .send({ name: 'Updated Name' })
      .set('content-type', 'application/json');

    expect(res.status).toBe(401);
    expect(res.body.message).toBe('Unauthorized');
  });

  it('allows an organization admin to update their organization', async () => {
    const adminAgent = request.agent();

    // Create a regular user who will become org admin
    const userRes = await adminAgent
      .post(`${baseUrl}/users`)
      .send({
        email: 'org-admin-update@example.com',
        name: 'Org Admin Update',
        password: 'supersafe123',
      })
      .set('content-type', 'application/json');

    // Log in as this user with admin flag so they can create an org
    await adminAgent
      .get(`${baseUrl}/dev/loginAsUser?userId=${userRes.body.id}&isAdmin=true`)
      .set('content-type', 'application/json');

    const org = await adminAgent
      .post(`${baseUrl}/organizations`)
      .send({ name: 'Update Org Original' })
      .set('content-type', 'application/json');

    // Now log in as same user but as regular (non-global-admin) user;
    // they should still be allowed to update as organization admin (via postCreateHook membership).
    const orgAgent = request.agent();
    await orgAgent
      .get(`${baseUrl}/dev/loginAsUser?userId=${userRes.body.id}`)
      .set('content-type', 'application/json');

    const updatedName = 'Update Org Renamed';
    const res = await orgAgent
      .put(`${baseUrl}/organizations/${org.body.id}`)
      .send({ name: updatedName })
      .set('content-type', 'application/json');

    expect(res.status).toBe(200);
    expect(res.body.id).toBe(org.body.id);
    expect(res.body.name).toBe(updatedName);

    const persisted = await db.organization.findUnique({ where: { id: org.body.id } });
    expect(persisted?.name).toBe(updatedName);
  });

  it('prevents a regular user who is not an organization admin from updating the organization', async () => {
    const adminAgent = request.agent();

    // Create a global admin to own the organization
    const globalAdmin = await adminAgent
      .post(`${baseUrl}/users`)
      .send({
        email: 'org-global-admin-update@example.com',
        name: 'Org Global Admin Update',
        password: 'supersafe123',
      })
      .set('content-type', 'application/json');

    await adminAgent
      .get(`${baseUrl}/dev/loginAsUser?userId=${globalAdmin.body.id}&isAdmin=true`)
      .set('content-type', 'application/json');

    const org = await adminAgent
      .post(`${baseUrl}/organizations`)
      .send({ name: 'Org For NonAdmin Update' })
      .set('content-type', 'application/json');

    // Create a regular user and add them as non-admin member
    const regularAgent = request.agent();
    const regularUser = await regularAgent
      .post(`${baseUrl}/users`)
      .send({
        email: 'org-regular-nonadmin-update@example.com',
        name: 'Org Regular NonAdmin Update',
        password: 'supersafe123',
      })
      .set('content-type', 'application/json');

    await db.userOrganization.create({
      data: {
        userId: regularUser.body.id,
        organizationId: org.body.id,
        isCurrent: true,
        isAdmin: false,
      },
    });

    await regularAgent
      .get(`${baseUrl}/dev/loginAsUser?userId=${regularUser.body.id}`)
      .set('content-type', 'application/json');

    const res = await regularAgent
      .put(`${baseUrl}/organizations/${org.body.id}`)
      .ok(r => r.status === 401)
      .send({ name: 'Should Not Be Applied' })
      .set('content-type', 'application/json');

    expect(res.status).toBe(401);
    expect(res.body.message).toBe('Unauthorized');

    const persisted = await db.organization.findUnique({ where: { id: org.body.id } });
    expect(persisted?.name).toBe('Org For NonAdmin Update');
  });

  it('allows a global admin to update any organization', async () => {
    const agent = request.agent();

    const adminUser = await agent
      .post(`${baseUrl}/users`)
      .send({
        email: 'org-global-admin-any-update@example.com',
        name: 'Org Global Admin Any Update',
        password: 'supersafe123',
      })
      .set('content-type', 'application/json');

    await agent
      .get(`${baseUrl}/dev/loginAsUser?userId=${adminUser.body.id}&isAdmin=true`)
      .set('content-type', 'application/json');

    const org = await agent
      .post(`${baseUrl}/organizations`)
      .send({ name: 'Org Global Admin Updatable' })
      .set('content-type', 'application/json');

    const updatedName = 'Org Global Admin Updated';
    const res = await agent
      .put(`${baseUrl}/organizations/${org.body.id}`)
      .send({ name: updatedName })
      .set('content-type', 'application/json');

    expect(res.status).toBe(200);
    expect(res.body.id).toBe(org.body.id);
    expect(res.body.name).toBe(updatedName);

    const persisted = await db.organization.findUnique({ where: { id: org.body.id } });
    expect(persisted?.name).toBe(updatedName);
  });

  it('returns 400 when update payload is invalid', async () => {
    const agent = request.agent();

    const adminUser = await agent
      .post(`${baseUrl}/users`)
      .send({
        email: 'org-admin-update-invalid@example.com',
        name: 'Org Admin Update Invalid',
        password: 'supersafe123',
      })
      .set('content-type', 'application/json');

    await agent
      .get(`${baseUrl}/dev/loginAsUser?userId=${adminUser.body.id}&isAdmin=true`)
      .set('content-type', 'application/json');

    const org = await agent
      .post(`${baseUrl}/organizations`)
      .send({ name: 'Org Update Invalid' })
      .set('content-type', 'application/json');

    const res = await agent
      .put(`${baseUrl}/organizations/${org.body.id}`)
      .ok(r => r.status === 400)
      .send({ name: 123, nonExistentField: 'x' } as any)
      .set('content-type', 'application/json');

    expect(res.status).toBe(400);
    expect(res.body.errors).toBeDefined();
  });
});

describe('Organization API - delete', () => {
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

  it('returns 401 for deleting an organization when unauthenticated', async () => {
    const agent = request.agent();

    // Create an organization via admin to have a valid ID
    const adminUser = await agent
      .post(`${baseUrl}/users`)
      .send({
        email: 'org-admin-delete-unauth@example.com',
        name: 'Org Admin Delete Unauth',
        password: 'supersafe123',
      })
      .set('content-type', 'application/json');

    await agent
      .get(`${baseUrl}/dev/loginAsUser?userId=${adminUser.body.id}&isAdmin=true`)
      .set('content-type', 'application/json');

    const org = await agent
      .post(`${baseUrl}/organizations`)
      .send({ name: 'Delete Org Unauth' })
      .set('content-type', 'application/json');

    // Now call without auth (no cookies)
    const res = await request
      .delete(`${baseUrl}/organizations/${org.body.id}`)
      .ok(r => r.status === 401)
      .set('content-type', 'application/json');

    expect(res.status).toBe(401);
    expect(res.body.message).toBe('Unauthorized');
  });

  it('allows an organization admin to delete their organization', async () => {
    const adminAgent = request.agent();

    // Create a user who will become org admin
    const userRes = await adminAgent
      .post(`${baseUrl}/users`)
      .send({
        email: 'org-admin-delete@example.com',
        name: 'Org Admin Delete',
        password: 'supersafe123',
      })
      .set('content-type', 'application/json');

    // Log in as this user with global admin flag so they can create an org
    await adminAgent
      .get(`${baseUrl}/dev/loginAsUser?userId=${userRes.body.id}&isAdmin=true`)
      .set('content-type', 'application/json');

    const org = await adminAgent
      .post(`${baseUrl}/organizations`)
      .send({ name: 'Delete Org Original' })
      .set('content-type', 'application/json');

    // Now log in as the same user without global admin flag; they should still
    // be able to delete as an organization admin via membership.
    const orgAgent = request.agent();
    await orgAgent
      .get(`${baseUrl}/dev/loginAsUser?userId=${userRes.body.id}`)
      .set('content-type', 'application/json');

    const res = await orgAgent
      .delete(`${baseUrl}/organizations/${org.body.id}`)
      .set('content-type', 'application/json');

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Deleted');

    const persisted = await db.organization.findUnique({ where: { id: org.body.id } });
    expect(persisted).toBeNull();
  });

  it('prevents a regular non-admin member from deleting the organization', async () => {
    const adminAgent = request.agent();

    // Create a global admin to own the organization
    const globalAdmin = await adminAgent
      .post(`${baseUrl}/users`)
      .send({
        email: 'org-global-admin-delete@example.com',
        name: 'Org Global Admin Delete',
        password: 'supersafe123',
      })
      .set('content-type', 'application/json');

    await adminAgent
      .get(`${baseUrl}/dev/loginAsUser?userId=${globalAdmin.body.id}&isAdmin=true`)
      .set('content-type', 'application/json');

    const org = await adminAgent
      .post(`${baseUrl}/organizations`)
      .send({ name: 'Org For NonAdmin Delete' })
      .set('content-type', 'application/json');

    // Create a regular user and add them as non-admin member
    const regularAgent = request.agent();
    const regularUser = await regularAgent
      .post(`${baseUrl}/users`)
      .send({
        email: 'org-regular-nonadmin-delete@example.com',
        name: 'Org Regular NonAdmin Delete',
        password: 'supersafe123',
      })
      .set('content-type', 'application/json');

    await db.userOrganization.create({
      data: {
        userId: regularUser.body.id,
        organizationId: org.body.id,
        isCurrent: true,
        isAdmin: false,
      },
    });

    await regularAgent
      .get(`${baseUrl}/dev/loginAsUser?userId=${regularUser.body.id}`)
      .set('content-type', 'application/json');

    const res = await regularAgent
      .delete(`${baseUrl}/organizations/${org.body.id}`)
      .ok(r => r.status === 401)
      .set('content-type', 'application/json');

    expect(res.status).toBe(401);
    expect(res.body.message).toBe('Unauthorized');

    const persisted = await db.organization.findUnique({ where: { id: org.body.id } });
    expect(persisted?.name).toBe('Org For NonAdmin Delete');
  });

  it('allows a global admin to delete any organization', async () => {
    const agent = request.agent();

    const adminUser = await agent
      .post(`${baseUrl}/users`)
      .send({
        email: 'org-global-admin-any-delete@example.com',
        name: 'Org Global Admin Any Delete',
        password: 'supersafe123',
      })
      .set('content-type', 'application/json');

    await agent
      .get(`${baseUrl}/dev/loginAsUser?userId=${adminUser.body.id}&isAdmin=true`)
      .set('content-type', 'application/json');

    const org = await agent
      .post(`${baseUrl}/organizations`)
      .send({ name: 'Org Global Admin Deletable' })
      .set('content-type', 'application/json');

    const res = await agent
      .delete(`${baseUrl}/organizations/${org.body.id}`)
      .set('content-type', 'application/json');

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Deleted');

    const persisted = await db.organization.findUnique({ where: { id: org.body.id } });
    expect(persisted).toBeNull();
  });
});


