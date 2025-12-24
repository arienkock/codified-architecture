import { describe, expect, it, afterAll, beforeAll } from '@jest/globals';
import request from 'superagent';
import { AddressInfo } from 'net';
import { PrismaClient } from '../../src/persistence/generated/prisma/index.js';
import { createServer } from '../../src/server/server.js';
import { AppConfig, defaultConfig } from '../../src/config.js';

describe('Login API', () => {
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
    await new Promise<void>((resolve, reject) => server.close(err => err ? reject(err) : resolve()));
  });

  it('successfully logs in with valid credentials and sets session cookie', async () => {
    const agent = request.agent();
    
    // First create a user
    const email = 'login-test@example.com';
    const name = 'Login Test User';
    const password = 'supersafe123';
    const userRes = await agent
      .post(`${baseUrl}/users`)
      .send({ email, name, password })
      .set('content-type', 'application/json');

    expect(userRes.status).toBe(200);
    const userId = userRes.body.id;

    // Login with valid credentials
    const loginRes = await agent
      .post(`${baseUrl}/logins`)
      .send({ email, password })
      .set('content-type', 'application/json');

    expect(loginRes.status).toBe(200);
    expect(loginRes.body.message).toBe('Success');
    
    // Verify session cookie is set by making an authenticated request
    const userGetRes = await agent
      .get(`${baseUrl}/users/${userId}`)
      .set('content-type', 'application/json');
    
    expect(userGetRes.status).toBe(200);
    expect(userGetRes.body.email).toBe(email);
    expect(userGetRes.body.id).toBe(userId);
  });

  it('returns 401 for invalid email', async () => {
    const agent = request.agent();
    
    // Create a user
    const email = 'login-test2@example.com';
    const password = 'supersafe123';
    await agent
      .post(`${baseUrl}/users`)
      .send({ email, name: 'Test User', password })
      .set('content-type', 'application/json');

    // Try to login with wrong email
    const loginRes = await agent
      .post(`${baseUrl}/logins`)
      .ok(res => res.status === 401)
      .send({ email: 'wrong-email@example.com', password })
      .set('content-type', 'application/json');

    expect(loginRes.status).toBe(401);
    expect(loginRes.body.message).toBe('Invalid email or password');
  });

  it('returns 401 for invalid password', async () => {
    const agent = request.agent();
    
    // Create a user
    const email = 'login-test3@example.com';
    const password = 'supersafe123';
    await agent
      .post(`${baseUrl}/users`)
      .send({ email, name: 'Test User', password })
      .set('content-type', 'application/json');

    // Try to login with wrong password
    const loginRes = await agent
      .post(`${baseUrl}/logins`)
      .ok(res => res.status === 401)
      .send({ email, password: 'wrongpassword' })
      .set('content-type', 'application/json');

    expect(loginRes.status).toBe(401);
    expect(loginRes.body.message).toBe('Invalid email or password');
  });

  it('returns 400 for missing email', async () => {
    const agent = request.agent();
    
    const loginRes = await agent
      .post(`${baseUrl}/logins`)
      .ok(res => res.status === 400)
      .send({ password: 'supersafe123' })
      .set('content-type', 'application/json');

    expect(loginRes.status).toBe(400);
    expect(loginRes.body.errors).toBeDefined();
  });

  it('returns 400 for missing password', async () => {
    const agent = request.agent();
    
    const loginRes = await agent
      .post(`${baseUrl}/logins`)
      .ok(res => res.status === 400)
      .send({ email: 'test@example.com' })
      .set('content-type', 'application/json');

    expect(loginRes.status).toBe(400);
    expect(loginRes.body.errors).toBeDefined();
  });

  it('returns 400 for invalid email format', async () => {
    const agent = request.agent();
    
    const loginRes = await agent
      .post(`${baseUrl}/logins`)
      .ok(res => res.status === 400)
      .send({ email: 'invalid-email', password: 'supersafe123' })
      .set('content-type', 'application/json');

    expect(loginRes.status).toBe(400);
    expect(loginRes.body.errors).toBeDefined();
  });

  it('returns 400 for unexpected fields', async () => {
    const agent = request.agent();
    
    const loginRes = await agent
      .post(`${baseUrl}/logins`)
      .ok(res => res.status === 400)
      .send({ email: 'test@example.com', password: 'supersafe123', unexpectedField: 'value' })
      .set('content-type', 'application/json');

    expect(loginRes.status).toBe(400);
    expect(loginRes.body.errors).toBeDefined();
  });

  it('sets admin status correctly when user has admin membership', async () => {
    const agent = request.agent();
    
    // Create an admin user first
    const adminEmail = 'admin-creator@example.com';
    const adminPassword = 'supersafe123';
    const adminUserRes = await agent
      .post(`${baseUrl}/users`)
      .send({ email: adminEmail, name: 'Admin Creator', password: adminPassword })
      .set('content-type', 'application/json');

    const adminUserId = adminUserRes.body.id;

    // Create a user that will become admin
    const email = 'admin-login-test@example.com';
    const name = 'Admin Login Test User';
    const password = 'supersafe123';
    const userRes = await agent
      .post(`${baseUrl}/users`)
      .send({ email, name, password })
      .set('content-type', 'application/json');

    const userId = userRes.body.id;

    // Create an organization and add user as admin
    // First, we need to login as an admin to create an organization
    const adminAgent = request.agent();
    await adminAgent
      .get(`${baseUrl}/dev/loginAsUser?userId=${adminUserId}&isAdmin=true`)
      .set('content-type', 'application/json');

    const orgRes = await adminAgent
      .post(`${baseUrl}/organizations`)
      .send({ name: 'Admin Test Org' })
      .set('content-type', 'application/json');

    // Add the user as admin to the organization
    await db.userOrganization.create({
      data: {
        userId: userId,
        organizationId: orgRes.body.id,
        isAdmin: true,
        isCurrent: false,
      },
    });

    // Login with the user's credentials
    const loginRes = await agent
      .post(`${baseUrl}/logins`)
      .send({ email, password })
      .set('content-type', 'application/json');

    expect(loginRes.status).toBe(200);

    // Verify the user can access admin-only endpoints
    // Try to create an organization (requires admin)
    const orgCreateRes = await agent
      .post(`${baseUrl}/organizations`)
      .send({ name: 'New Org by Admin User' })
      .set('content-type', 'application/json');

    expect(orgCreateRes.status).toBe(200);
    expect(orgCreateRes.body.name).toBe('New Org by Admin User');
  });

  it('does not set admin status when user has no admin membership', async () => {
    const agent = request.agent();
    
    // Create a user
    const email = 'regular-login-test@example.com';
    const name = 'Regular Login Test User';
    const password = 'supersafe123';
    const userRes = await agent
      .post(`${baseUrl}/users`)
      .send({ email, name, password })
      .set('content-type', 'application/json');

    // Login with the user's credentials
    const loginRes = await agent
      .post(`${baseUrl}/logins`)
      .send({ email, password })
      .set('content-type', 'application/json');

    expect(loginRes.status).toBe(200);

    // Verify the user cannot access admin-only endpoints
    // Try to create an organization (requires admin)
    const orgCreateRes = await agent
      .post(`${baseUrl}/organizations`)
      .ok(res => res.status === 401)
      .send({ name: 'New Org by Regular User' })
      .set('content-type', 'application/json');

    expect(orgCreateRes.status).toBe(401);
  });

  it('allows login to work with different agents (cookie isolation)', async () => {
    // Create a user
    const email = 'multi-agent-test@example.com';
    const password = 'supersafe123';
    const createAgent = request.agent();
    const userRes = await createAgent
      .post(`${baseUrl}/users`)
      .send({ email, name: 'Multi Agent Test', password })
      .set('content-type', 'application/json');

    const userId = userRes.body.id;

    // Login with a new agent
    const loginAgent = request.agent();
    const loginRes = await loginAgent
      .post(`${baseUrl}/logins`)
      .send({ email, password })
      .set('content-type', 'application/json');

    expect(loginRes.status).toBe(200);

    // Verify the login agent can access authenticated endpoints
    const userGetRes = await loginAgent
      .get(`${baseUrl}/users/${userId}`)
      .set('content-type', 'application/json');

    expect(userGetRes.status).toBe(200);
    expect(userGetRes.body.id).toBe(userId);

    // Verify the create agent (without login) cannot access authenticated endpoints
    const unauthorizedRes = await createAgent
      .get(`${baseUrl}/users/${userId}`)
      .ok(res => res.status === 401)
      .set('content-type', 'application/json');

    expect(unauthorizedRes.status).toBe(401);
  });
});

