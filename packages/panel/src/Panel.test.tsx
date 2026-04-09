import { describe, it, expect } from 'vitest';

describe('Panel', () => {
  it('exports Panel component', async () => {
    const mod = await import('./Panel.js');
    expect(typeof mod.Panel).toBe('function');
  });

  it('exports PanelProps type via index', async () => {
    const mod = await import('./index.js');
    expect(typeof mod.Panel).toBe('function');
  });
});
