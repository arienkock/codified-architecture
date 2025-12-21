import { describe, expect, it, afterAll, beforeAll } from '@jest/globals';
import request from 'superagent';
import { AddressInfo } from 'net';
import { PrismaClient } from '../../src/persistence/generated/prisma/index.js';
import { createServer } from '../../src/server/server.js';
import { AppConfig, defaultConfig } from '../../src/config.js';

describe('Invitation API - read (get many & get one)', () => {
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

  it('returns 401 for listing invitations when unauthenticated', async () => {
    const res = await request
      .get(`${baseUrl}/invitations`)
      .ok(r => r.status === 401)
      .set('content-type', 'application/json');

    expect(res.status).toBe(401);
    expect(res.body.message).toBe('Unauthorized');
  });

  it('allows a global admin to list all invitations', async () => {
    const adminAgent = request.agent();

    // Create a global admin user
    const adminUser = await adminAgent
      .post(`${baseUrl}/users`)
      .send({ email: 'inv-read-admin@example.com', name: 'Admin', password: 'supersafe123' })
      .set('content-type', 'application/json');

    await adminAgent
      .get(`${baseUrl}/dev/loginAsUser?userId=${adminUser.body.id}&isAdmin=true`)
      .set('content-type', 'application/json');

    // Create organizations
    const org1 = await adminAgent
      .post(`${baseUrl}/organizations`)
      .send({ name: 'Read Org 1' })
      .set('content-type', 'application/json');
    const org2 = await adminAgent
      .post(`${baseUrl}/organizations`)
      .send({ name: 'Read Org 2' })
      .set('content-type', 'application/json');

    // Create users to invite
    const user1 = await adminAgent
      .post(`${baseUrl}/users`)
      .send({ email: 'inv-read-user1@example.com', name: 'User 1', password: 'supersafe123' })
      .set('content-type', 'application/json');
    const user2 = await adminAgent
      .post(`${baseUrl}/users`)
      .send({ email: 'inv-read-user2@example.com', name: 'User 2', password: 'supersafe123' })
      .set('content-type', 'application/json');

    // Create invitations
    const inv1 = await adminAgent
      .post(`${baseUrl}/invitations`)
      .send({
        userId: user1.body.id,
        organizationId: org1.body.id,
        ttlMinutes: 1440,
      })
      .set('content-type', 'application/json');
    const inv2 = await adminAgent
      .post(`${baseUrl}/invitations`)
      .send({
        userId: user2.body.id,
        organizationId: org2.body.id,
        ttlMinutes: 1440,
      })
      .set('content-type', 'application/json');

    // Global admin should see all invitations
    const res = await adminAgent
      .get(`${baseUrl}/invitations`)
      .set('content-type', 'application/json');

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
    const ids = res.body.data.map((inv: any) => inv.id);
    expect(ids).toEqual(expect.arrayContaining([inv1.body.id, inv2.body.id]));
  });

  it('allows an org admin to list invitations for orgs they are admin of', async () => {
    const adminAgent = request.agent();

    // Create a global admin to set up data
    const globalAdmin = await adminAgent
      .post(`${baseUrl}/users`)
      .send({ email: 'inv-read-global-admin@example.com', name: 'Global Admin', password: 'supersafe123' })
      .set('content-type', 'application/json');

    await adminAgent
      .get(`${baseUrl}/dev/loginAsUser?userId=${globalAdmin.body.id}&isAdmin=true`)
      .set('content-type', 'application/json');

    // Create two organizations
    const org1 = await adminAgent
      .post(`${baseUrl}/organizations`)
      .send({ name: 'Read Org Admin Org 1' })
      .set('content-type', 'application/json');
    const org2 = await adminAgent
      .post(`${baseUrl}/organizations`)
      .send({ name: 'Read Org Admin Org 2' })
      .set('content-type', 'application/json');

    // Create an org admin user who is admin of org1 but not org2
    const orgAdminAgent = request.agent();
    const orgAdminUser = await orgAdminAgent
      .post(`${baseUrl}/users`)
      .send({ email: 'inv-read-org-admin@example.com', name: 'Org Admin', password: 'supersafe123' })
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

    // Create users to invite
    const user1 = await adminAgent
      .post(`${baseUrl}/users`)
      .send({ email: 'inv-read-org-user1@example.com', name: 'User 1', password: 'supersafe123' })
      .set('content-type', 'application/json');
    const user2 = await adminAgent
      .post(`${baseUrl}/users`)
      .send({ email: 'inv-read-org-user2@example.com', name: 'User 2', password: 'supersafe123' })
      .set('content-type', 'application/json');

    // Create invitations: one for org1 (admin can see) and one for org2 (admin cannot see)
    const inv1 = await adminAgent
      .post(`${baseUrl}/invitations`)
      .send({
        userId: user1.body.id,
        organizationId: org1.body.id,
        ttlMinutes: 1440,
      })
      .set('content-type', 'application/json');
    const inv2 = await adminAgent
      .post(`${baseUrl}/invitations`)
      .send({
        userId: user2.body.id,
        organizationId: org2.body.id,
        ttlMinutes: 1440,
      })
      .set('content-type', 'application/json');

    // Log in as org admin
    await orgAdminAgent
      .get(`${baseUrl}/dev/loginAsUser?userId=${orgAdminUser.body.id}`)
      .set('content-type', 'application/json');

    // Org admin should see invitations for org1 (their org) but not org2
    const res = await orgAdminAgent
      .get(`${baseUrl}/invitations`)
      .set('content-type', 'application/json');

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
    const ids = res.body.data.map((inv: any) => inv.id);

    // Should see invitation for org1
    expect(ids).toEqual(expect.arrayContaining([inv1.body.id]));

    // Should not see invitation for org2
    expect(ids).not.toEqual(expect.arrayContaining([inv2.body.id]));

    // Verify all returned invitations are for orgs where user is admin
    for (const inv of res.body.data as any[]) {
      const membership = await db.userOrganization.findFirst({
        where: {
          userId: orgAdminUser.body.id,
          organizationId: inv.organizationId,
          isAdmin: true,
        },
      });
      expect(membership).toBeTruthy();
    }
  });

  it('allows a regular user to list only their own invitations in their current org', async () => {
    const adminAgent = request.agent();

    // Create a global admin to set up data
    const globalAdmin = await adminAgent
      .post(`${baseUrl}/users`)
      .send({ email: 'inv-read-global-regular@example.com', name: 'Global Admin', password: 'supersafe123' })
      .set('content-type', 'application/json');

    await adminAgent
      .get(`${baseUrl}/dev/loginAsUser?userId=${globalAdmin.body.id}&isAdmin=true`)
      .set('content-type', 'application/json');

    // Create organizations
    const org1 = await adminAgent
      .post(`${baseUrl}/organizations`)
      .send({ name: 'Read Regular Org 1' })
      .set('content-type', 'application/json');
    const org2 = await adminAgent
      .post(`${baseUrl}/organizations`)
      .send({ name: 'Read Regular Org 2' })
      .set('content-type', 'application/json');

    // Create a regular user
    const regularAgent = request.agent();
    const regularUser = await regularAgent
      .post(`${baseUrl}/users`)
      .send({ email: 'inv-read-regular@example.com', name: 'Regular User', password: 'supersafe123' })
      .set('content-type', 'application/json');

    // Unset current flag on any existing orgs (e.g., personal org created automatically)
    await db.userOrganization.updateMany({
      where: { userId: regularUser.body.id },
      data: { isCurrent: false },
    });

    // Unset current flag on any existing orgs (e.g., personal org created automatically)
    await db.userOrganization.updateMany({
      where: { userId: regularUser.body.id },
      data: { isCurrent: false },
    });

    // Add regular user as member of org1 (current org) and org2
    await db.userOrganization.create({
      data: {
        userId: regularUser.body.id,
        organizationId: org1.body.id,
        isCurrent: true,
        isAdmin: false,
      },
    });
    await db.userOrganization.create({
      data: {
        userId: regularUser.body.id,
        organizationId: org2.body.id,
        isCurrent: false,
        isAdmin: false,
      },
    });

    // Create another user
    const otherUser = await adminAgent
      .post(`${baseUrl}/users`)
      .send({ email: 'inv-read-other-user@example.com', name: 'Other User', password: 'supersafe123' })
      .set('content-type', 'application/json');

    // Create invitations:
    // - inv1: regular user's invitation in org1 (current org) - should see
    // - inv2: regular user's invitation in org2 (not current) - should NOT see
    // - inv3: other user's invitation in org1 - should not see
    const inv1 = await adminAgent
      .post(`${baseUrl}/invitations`)
      .send({
        userId: regularUser.body.id,
        organizationId: org1.body.id,
        ttlMinutes: 1440,
      })
      .set('content-type', 'application/json');
    const inv2 = await adminAgent
      .post(`${baseUrl}/invitations`)
      .send({
        userId: regularUser.body.id,
        organizationId: org2.body.id,
        ttlMinutes: 1440,
      })
      .set('content-type', 'application/json');
    const inv3 = await adminAgent
      .post(`${baseUrl}/invitations`)
      .send({
        userId: otherUser.body.id,
        organizationId: org1.body.id,
        ttlMinutes: 1440,
      })
      .set('content-type', 'application/json');

    // Log in as regular user
    await regularAgent
      .get(`${baseUrl}/dev/loginAsUser?userId=${regularUser.body.id}`)
      .set('content-type', 'application/json');

    // Regular user should see only their own invitations in their current org
    const res = await regularAgent
      .get(`${baseUrl}/invitations`)
      .set('content-type', 'application/json');

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
    const ids = res.body.data.map((inv: any) => inv.id);

    // Should see their own invitation in current org
    expect(ids).toEqual(expect.arrayContaining([inv1.body.id]));

    // Should not see their own invitation in non-current org
    expect(ids).not.toEqual(expect.arrayContaining([inv2.body.id]));

    // Should not see other user's invitation
    expect(ids).not.toEqual(expect.arrayContaining([inv3.body.id]));

    // Verify all returned invitations are for the regular user in their current org
    for (const inv of res.body.data as any[]) {
      expect(inv.userId).toBe(regularUser.body.id);
      expect(inv.organizationId).toBe(org1.body.id);
    }
  });

  it('returns 401 for getting a single invitation when unauthenticated', async () => {
    const adminAgent = request.agent();

    // Create an invitation via admin to have a valid ID
    const adminUser = await adminAgent
      .post(`${baseUrl}/users`)
      .send({ email: 'inv-read-single-unauth@example.com', name: 'Admin', password: 'supersafe123' })
      .set('content-type', 'application/json');

    await adminAgent
      .get(`${baseUrl}/dev/loginAsUser?userId=${adminUser.body.id}&isAdmin=true`)
      .set('content-type', 'application/json');

    const org = await adminAgent
      .post(`${baseUrl}/organizations`)
      .send({ name: 'Single Unauth Org' })
      .set('content-type', 'application/json');

    const user = await adminAgent
      .post(`${baseUrl}/users`)
      .send({ email: 'inv-read-single-user@example.com', name: 'User', password: 'supersafe123' })
      .set('content-type', 'application/json');

    const invitation = await adminAgent
      .post(`${baseUrl}/invitations`)
      .send({
        userId: user.body.id,
        organizationId: org.body.id,
        ttlMinutes: 1440,
      })
      .set('content-type', 'application/json');

    // Now call without auth (no cookies)
    const res = await request
      .get(`${baseUrl}/invitations/${invitation.body.id}`)
      .ok(r => r.status === 401)
      .set('content-type', 'application/json');

    expect(res.status).toBe(401);
    expect(res.body.message).toBe('Unauthorized');
  });

  it('allows a global admin to get any invitation', async () => {
    const adminAgent = request.agent();

    // Create a global admin
    const adminUser = await adminAgent
      .post(`${baseUrl}/users`)
      .send({ email: 'inv-read-single-admin@example.com', name: 'Admin', password: 'supersafe123' })
      .set('content-type', 'application/json');

    await adminAgent
      .get(`${baseUrl}/dev/loginAsUser?userId=${adminUser.body.id}&isAdmin=true`)
      .set('content-type', 'application/json');

    const org = await adminAgent
      .post(`${baseUrl}/organizations`)
      .send({ name: 'Single Admin Org' })
      .set('content-type', 'application/json');

    const user = await adminAgent
      .post(`${baseUrl}/users`)
      .send({ email: 'inv-read-single-admin-user@example.com', name: 'User', password: 'supersafe123' })
      .set('content-type', 'application/json');

    const invitation = await adminAgent
      .post(`${baseUrl}/invitations`)
      .send({
        userId: user.body.id,
        organizationId: org.body.id,
        ttlMinutes: 1440,
      })
      .set('content-type', 'application/json');

    const res = await adminAgent
      .get(`${baseUrl}/invitations/${invitation.body.id}`)
      .set('content-type', 'application/json');

    expect(res.status).toBe(200);
    expect(res.body.id).toBe(invitation.body.id);
    expect(res.body.userId).toBe(user.body.id);
    expect(res.body.organizationId).toBe(org.body.id);
  });

  it('allows an org admin to get invitations for orgs they are admin of', async () => {
    const adminAgent = request.agent();

    // Create a global admin to set up data
    const globalAdmin = await adminAgent
      .post(`${baseUrl}/users`)
      .send({ email: 'inv-read-single-global@example.com', name: 'Global Admin', password: 'supersafe123' })
      .set('content-type', 'application/json');

    await adminAgent
      .get(`${baseUrl}/dev/loginAsUser?userId=${globalAdmin.body.id}&isAdmin=true`)
      .set('content-type', 'application/json');

    // Create two organizations
    const org1 = await adminAgent
      .post(`${baseUrl}/organizations`)
      .send({ name: 'Single Org Admin Org 1' })
      .set('content-type', 'application/json');
    const org2 = await adminAgent
      .post(`${baseUrl}/organizations`)
      .send({ name: 'Single Org Admin Org 2' })
      .set('content-type', 'application/json');

    // Create an org admin user who is admin of org1 but not org2
    const orgAdminAgent = request.agent();
    const orgAdminUser = await orgAdminAgent
      .post(`${baseUrl}/users`)
      .send({ email: 'inv-read-single-org-admin@example.com', name: 'Org Admin', password: 'supersafe123' })
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

    // Create users to invite
    const user1 = await adminAgent
      .post(`${baseUrl}/users`)
      .send({ email: 'inv-read-single-org-user1@example.com', name: 'User 1', password: 'supersafe123' })
      .set('content-type', 'application/json');
    const user2 = await adminAgent
      .post(`${baseUrl}/users`)
      .send({ email: 'inv-read-single-org-user2@example.com', name: 'User 2', password: 'supersafe123' })
      .set('content-type', 'application/json');

    // Create invitations
    const inv1 = await adminAgent
      .post(`${baseUrl}/invitations`)
      .send({
        userId: user1.body.id,
        organizationId: org1.body.id,
        ttlMinutes: 1440,
      })
      .set('content-type', 'application/json');
    const inv2 = await adminAgent
      .post(`${baseUrl}/invitations`)
      .send({
        userId: user2.body.id,
        organizationId: org2.body.id,
        ttlMinutes: 1440,
      })
      .set('content-type', 'application/json');

    // Log in as org admin
    await orgAdminAgent
      .get(`${baseUrl}/dev/loginAsUser?userId=${orgAdminUser.body.id}`)
      .set('content-type', 'application/json');

    // Org admin can get invitation for org1 (their org)
    const allowed = await orgAdminAgent
      .get(`${baseUrl}/invitations/${inv1.body.id}`)
      .set('content-type', 'application/json');

    expect(allowed.status).toBe(200);
    expect(allowed.body.id).toBe(inv1.body.id);
    expect(allowed.body.organizationId).toBe(org1.body.id);

    // Org admin cannot get invitation for org2 (not their org)
    const forbidden = await orgAdminAgent
      .get(`${baseUrl}/invitations/${inv2.body.id}`)
      .ok(r => r.status === 401)
      .set('content-type', 'application/json');

    expect(forbidden.status).toBe(401);
    expect(forbidden.body.message).toBe('Unauthorized');
  });

  it('allows a regular user to get their own invitation', async () => {
    const adminAgent = request.agent();

    // Create a global admin to set up data
    const globalAdmin = await adminAgent
      .post(`${baseUrl}/users`)
      .send({ email: 'inv-read-single-global-regular@example.com', name: 'Global Admin', password: 'supersafe123' })
      .set('content-type', 'application/json');

    await adminAgent
      .get(`${baseUrl}/dev/loginAsUser?userId=${globalAdmin.body.id}&isAdmin=true`)
      .set('content-type', 'application/json');

    const org = await adminAgent
      .post(`${baseUrl}/organizations`)
      .send({ name: 'Single Regular Org' })
      .set('content-type', 'application/json');

    // Create a regular user
    const regularAgent = request.agent();
    const regularUser = await regularAgent
      .post(`${baseUrl}/users`)
      .send({ email: 'inv-read-single-regular@example.com', name: 'Regular User', password: 'supersafe123' })
      .set('content-type', 'application/json');

    // Unset current flag on any existing orgs (e.g., personal org created automatically)
    await db.userOrganization.updateMany({
      where: { userId: regularUser.body.id },
      data: { isCurrent: false },
    });

    // Add regular user as member of the organization
    await db.userOrganization.create({
      data: {
        userId: regularUser.body.id,
        organizationId: org.body.id,
        isCurrent: true,
        isAdmin: false,
      },
    });

    // Create another user
    const otherUser = await adminAgent
      .post(`${baseUrl}/users`)
      .send({ email: 'inv-read-single-other@example.com', name: 'Other User', password: 'supersafe123' })
      .set('content-type', 'application/json');

    // Create invitations
    const ownInvitation = await adminAgent
      .post(`${baseUrl}/invitations`)
      .send({
        userId: regularUser.body.id,
        organizationId: org.body.id,
        ttlMinutes: 1440,
      })
      .set('content-type', 'application/json');
    const otherInvitation = await adminAgent
      .post(`${baseUrl}/invitations`)
      .send({
        userId: otherUser.body.id,
        organizationId: org.body.id,
        ttlMinutes: 1440,
      })
      .set('content-type', 'application/json');

    // Log in as regular user
    await regularAgent
      .get(`${baseUrl}/dev/loginAsUser?userId=${regularUser.body.id}`)
      .set('content-type', 'application/json');

    // Regular user can get their own invitation
    const allowed = await regularAgent
      .get(`${baseUrl}/invitations/${ownInvitation.body.id}`)
      .set('content-type', 'application/json');

    expect(allowed.status).toBe(200);
    expect(allowed.body.id).toBe(ownInvitation.body.id);
    expect(allowed.body.userId).toBe(regularUser.body.id);

    // Regular user cannot get other user's invitation
    const forbidden = await regularAgent
      .get(`${baseUrl}/invitations/${otherInvitation.body.id}`)
      .ok(r => r.status === 401)
      .set('content-type', 'application/json');

    expect(forbidden.status).toBe(401);
    expect(forbidden.body.message).toBe('Unauthorized');
  });

  it('prevents a regular user from getting their own invitation if not in current org', async () => {
    const adminAgent = request.agent();

    // Create a global admin to set up data
    const globalAdmin = await adminAgent
      .post(`${baseUrl}/users`)
      .send({ email: 'inv-read-single-global-regular-other@example.com', name: 'Global Admin', password: 'supersafe123' })
      .set('content-type', 'application/json');

    await adminAgent
      .get(`${baseUrl}/dev/loginAsUser?userId=${globalAdmin.body.id}&isAdmin=true`)
      .set('content-type', 'application/json');

    // Create two organizations
    const org1 = await adminAgent
      .post(`${baseUrl}/organizations`)
      .send({ name: 'Single Regular Current Org' })
      .set('content-type', 'application/json');
    const org2 = await adminAgent
      .post(`${baseUrl}/organizations`)
      .send({ name: 'Single Regular Other Org' })
      .set('content-type', 'application/json');

    // Create a regular user
    const regularAgent = request.agent();
    const regularUser = await regularAgent
      .post(`${baseUrl}/users`)
      .send({ email: 'inv-read-single-regular-other@example.com', name: 'Regular User', password: 'supersafe123' })
      .set('content-type', 'application/json');

    // Unset current flag on any existing orgs (e.g., personal org created automatically)
    await db.userOrganization.updateMany({
      where: { userId: regularUser.body.id },
      data: { isCurrent: false },
    });

    // Add regular user as member of org1 (current org) and org2 (not current)
    await db.userOrganization.create({
      data: {
        userId: regularUser.body.id,
        organizationId: org1.body.id,
        isCurrent: true,
        isAdmin: false,
      },
    });
    await db.userOrganization.create({
      data: {
        userId: regularUser.body.id,
        organizationId: org2.body.id,
        isCurrent: false,
        isAdmin: false,
      },
    });

    // Create invitations: one in current org, one in non-current org
    const invCurrentOrg = await adminAgent
      .post(`${baseUrl}/invitations`)
      .send({
        userId: regularUser.body.id,
        organizationId: org1.body.id,
        ttlMinutes: 1440,
      })
      .set('content-type', 'application/json');
    const invOtherOrg = await adminAgent
      .post(`${baseUrl}/invitations`)
      .send({
        userId: regularUser.body.id,
        organizationId: org2.body.id,
        ttlMinutes: 1440,
      })
      .set('content-type', 'application/json');

    // Log in as regular user
    await regularAgent
      .get(`${baseUrl}/dev/loginAsUser?userId=${regularUser.body.id}`)
      .set('content-type', 'application/json');

    // Regular user can get their own invitation in current org
    const allowed = await regularAgent
      .get(`${baseUrl}/invitations/${invCurrentOrg.body.id}`)
      .set('content-type', 'application/json');

    expect(allowed.status).toBe(200);
    expect(allowed.body.id).toBe(invCurrentOrg.body.id);
    expect(allowed.body.organizationId).toBe(org1.body.id);

    // Regular user cannot get their own invitation if not in current org
    const forbidden = await regularAgent
      .get(`${baseUrl}/invitations/${invOtherOrg.body.id}`)
      .ok(r => r.status === 401)
      .set('content-type', 'application/json');

    expect(forbidden.status).toBe(401);
    expect(forbidden.body.message).toBe('Unauthorized');
  });

  it('returns 404 for non-existent invitation when user has access', async () => {
    const adminAgent = request.agent();

    // Create a global admin
    const adminUser = await adminAgent
      .post(`${baseUrl}/users`)
      .send({ email: 'inv-read-404@example.com', name: 'Admin', password: 'supersafe123' })
      .set('content-type', 'application/json');

    await adminAgent
      .get(`${baseUrl}/dev/loginAsUser?userId=${adminUser.body.id}&isAdmin=true`)
      .set('content-type', 'application/json');

    // Try to get a non-existent invitation (using a very large ID)
    const res = await adminAgent
      .get(`${baseUrl}/invitations/999999`)
      .ok(r => r.status === 404)
      .set('content-type', 'application/json');

    expect(res.status).toBe(404);
  });
});

