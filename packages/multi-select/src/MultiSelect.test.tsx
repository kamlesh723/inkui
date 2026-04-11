import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from 'ink-testing-library';
import { MultiSelect } from './MultiSelect.js';

const ITEMS = [
  { label: 'TypeScript', value: 'ts' },
  { label: 'ESLint',     value: 'eslint' },
  { label: 'Prettier',   value: 'prettier' },
];

describe('MultiSelect', () => {
  it('renders without crashing', () => {
    const { lastFrame } = render(
      <MultiSelect items={ITEMS} onSubmit={() => {}} />
    );
    expect(lastFrame()).toBeTruthy();
    expect(lastFrame()!.length).toBeGreaterThan(0);
  });

  it('renders all item labels', () => {
    const { lastFrame } = render(
      <MultiSelect items={ITEMS} onSubmit={() => {}} />
    );
    expect(lastFrame()).toContain('TypeScript');
    expect(lastFrame()).toContain('ESLint');
    expect(lastFrame()).toContain('Prettier');
  });

  it('renders disabled items with (disabled) hint', () => {
    const items = [
      { label: 'Option A', value: 'a' },
      { label: 'Option B', value: 'b', disabled: true },
    ];
    const { lastFrame } = render(
      <MultiSelect items={items} onSubmit={() => {}} />
    );
    expect(lastFrame()).toContain('Option B');
    expect(lastFrame()).toContain('disabled');
  });
});
