import { describe, it, expect } from 'vitest';

describe('ProgressBar', () => {
  it('exports ProgressBar component', async () => {
    const mod = await import('./ProgressBar.js');
    expect(typeof mod.ProgressBar).toBe('function');
  });
});
