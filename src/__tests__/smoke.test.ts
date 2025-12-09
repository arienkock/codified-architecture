import { describe, expect, it } from '@jest/globals';

describe('smoke test', () => {
  it('runs under ts-jest esm', () => {
    expect(1 + 1).toBe(2);
  });
});

