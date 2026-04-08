import { describe, it, expect } from 'vitest';

describe('KeyHint', () => {
  it('exports KeyHint component', async () => {
    const mod = await import('./KeyHint.js');
    expect(typeof mod.KeyHint).toBe('function');
  });
});
