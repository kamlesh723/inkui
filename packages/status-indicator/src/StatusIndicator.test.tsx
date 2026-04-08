import { describe, it, expect } from 'vitest';

describe('StatusIndicator', () => {
  it('exports StatusIndicator component', async () => {
    const mod = await import('./StatusIndicator.js');
    expect(typeof mod.StatusIndicator).toBe('function');
  });

  it('exports StatusValue type via index', async () => {
    const mod = await import('./index.js');
    expect(typeof mod.StatusIndicator).toBe('function');
  });
});
