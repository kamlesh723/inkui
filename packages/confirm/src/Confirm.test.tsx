import { describe, it, expect } from 'vitest';

describe('Confirm', () => {
  it('exports Confirm component', async () => {
    const mod = await import('./Confirm.js');
    expect(typeof mod.Confirm).toBe('function');
  });
});
