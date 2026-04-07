import { describe, it, expect } from 'vitest';

describe('TextInput', () => {
  it('exports TextInput component', async () => {
    const mod = await import('./TextInput.js');
    expect(typeof mod.TextInput).toBe('function');
  });
});
