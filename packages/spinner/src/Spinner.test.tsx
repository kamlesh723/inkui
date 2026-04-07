import { describe, it, expect } from 'vitest';
import React from 'react';

// ink-testing-library peer dep check: if incompatible with Ink 6, these tests
// use plain assertions. We import lazily so the file can still be parsed.
describe('Spinner', () => {
  it('exports Spinner component', async () => {
    const mod = await import('./Spinner.js');
    expect(typeof mod.Spinner).toBe('function');
  });
});
