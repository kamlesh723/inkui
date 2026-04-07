import { describe, it, expect } from 'vitest';

describe('Table', () => {
  it('exports Table component', async () => {
    const mod = await import('./Table.js');
    expect(typeof mod.Table).toBe('function');
  });
});
