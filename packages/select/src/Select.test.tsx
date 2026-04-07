import { describe, it, expect } from 'vitest';

describe('Select', () => {
  it('exports Select component', async () => {
    const mod = await import('./Select.js');
    expect(typeof mod.Select).toBe('function');
  });
});
