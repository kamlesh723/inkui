import { describe, it, expect } from 'vitest';

describe('Dialog', () => {
  it('exports Dialog component', async () => {
    const mod = await import('./Dialog.js');
    expect(typeof mod.Dialog).toBe('function');
  });
});
