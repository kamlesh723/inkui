import { describe, it, expect } from 'vitest';

describe('Divider', () => {
  it('exports Divider component', async () => {
    const mod = await import('./Divider.js');
    expect(typeof mod.Divider).toBe('function');
  });
});
