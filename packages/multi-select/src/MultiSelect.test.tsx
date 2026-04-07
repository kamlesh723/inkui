import { describe, it, expect } from 'vitest';

describe('MultiSelect', () => {
  it('exports MultiSelect component', async () => {
    const mod = await import('./MultiSelect.js');
    expect(typeof mod.MultiSelect).toBe('function');
  });
});
