import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from 'ink-testing-library';
import { KeyHint } from '../KeyHint.js';

describe('KeyHint', () => {
  it('renders without crashing', () => {
    const { lastFrame } = render(
      <KeyHint keys={[{ key: 'q', label: 'quit' }]} />
    );
    expect(lastFrame()).toBeTruthy();
    expect(lastFrame()!.length).toBeGreaterThan(0);
  });

  it('renders key and label text', () => {
    const { lastFrame } = render(
      <KeyHint keys={[{ key: 'Enter', label: 'confirm' }]} />
    );
    expect(lastFrame()).toContain('Enter');
    expect(lastFrame()).toContain('confirm');
  });

  it('renders multiple key hints', () => {
    const { lastFrame } = render(
      <KeyHint keys={[
        { key: '↑↓', label: 'navigate' },
        { key: 'q',  label: 'quit' },
      ]} />
    );
    expect(lastFrame()).toContain('navigate');
    expect(lastFrame()).toContain('quit');
  });
});
