import { describe, it, expect } from 'vitest';

describe('Header', () => {
  it('exports Header component', async () => {
    const mod = await import('./Header.js');
    expect(typeof mod.Header).toBe('function');
  });
});
