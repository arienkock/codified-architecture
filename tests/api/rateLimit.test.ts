import { describe, expect, it, afterAll, beforeAll } from '@jest/globals';
import request from 'superagent';
import { AddressInfo } from 'net';
import { PrismaClient } from '../../src/persistence/generated/prisma/index.js';
import { createServer } from '../../src/server/server.js';
import { AppConfig, defaultConfig } from '../../src/config.js';

describe('Rate Limiting', () => {
  let server: ReturnType<typeof createServer>;
  let baseUrl: string;
  let db: PrismaClient;
  let config: AppConfig;

  beforeAll(async () => {
    db = new PrismaClient();
    config = {
      ...defaultConfig,
      RATE_LIMIT_THRESHOLD: 5,
    };
    server = createServer(db, 0, config);
    const address = server.address() as AddressInfo;
    baseUrl = `http://127.0.0.1:${address.port}`;
  });

  afterAll(async () => {
    await db.$disconnect();
    await new Promise<void>((resolve, reject) => server.close(err => err ? reject(err) : resolve()));
  });

  it('returns 429 status when rate limit threshold is exceeded', async () => {
    const agent = request.agent();
    const threshold = config.RATE_LIMIT_THRESHOLD;

    // Make requests up to the threshold - these should succeed
    for (let i = 0; i < threshold; i++) {
      const res = await agent
        .get(`${baseUrl}/`)
        .ok(res => res.status < 500); // Accept any status < 500 for successful requests
      
      expect(res.status).toBeLessThan(429);
      expect(res.headers['x-ratelimit-limit']).toBe(threshold.toString());
      const remaining = parseInt(res.headers['x-ratelimit-remaining'] || '0', 10);
      expect(remaining).toBeGreaterThanOrEqual(0);
      expect(remaining).toBeLessThanOrEqual(threshold);
    }

    // The next request should exceed the threshold and return 429
    const rateLimitedRes = await agent
      .get(`${baseUrl}/`)
      .ok(res => res.status === 429);

    expect(rateLimitedRes.status).toBe(429);
    expect(rateLimitedRes.body.message).toBe('Too Many Requests');
    expect(rateLimitedRes.headers['x-ratelimit-limit']).toBe(threshold.toString());
    expect(rateLimitedRes.headers['x-ratelimit-remaining']).toBe('0');
  });
});

