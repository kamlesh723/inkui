import { describe, it, expect } from 'vitest';

describe('LoadingBar', () => {
  it('exports LoadingBar component', async () => {
    const mod = await import('./LoadingBar.js');
    expect(typeof mod.LoadingBar).toBe('function');
  });
});
