import { describe, it, expect } from 'vitest';

describe('Toast', () => {
  it('exports Toast component', async () => {
    const mod = await import('./Toast.js');
    expect(typeof mod.Toast).toBe('function');
  });

  it('exports ToastStack component', async () => {
    const mod = await import('./Toast.js');
    expect(typeof mod.ToastStack).toBe('function');
  });

  it('exports useToast hook', async () => {
    const mod = await import('./Toast.js');
    expect(typeof mod.useToast).toBe('function');
  });
});
