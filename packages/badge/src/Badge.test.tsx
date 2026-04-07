import { describe, it, expect } from 'vitest';

describe('Badge', () => {
  it('exports Badge component', async () => {
    const mod = await import('./Badge.js');
    expect(typeof mod.Badge).toBe('function');
  });
});
