import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from 'ink-testing-library';
import { Select } from './Select.js';

const ITEMS = [
  { label: 'Development', value: 'dev' },
  { label: 'Staging',     value: 'staging' },
  { label: 'Production',  value: 'prod' },
];

describe('Select', () => {
  it('renders without crashing', () => {
    const { lastFrame } = render(
      <Select items={ITEMS} onSelect={() => {}} />
    );
    expect(lastFrame()).toBeTruthy();
    expect(lastFrame()!.length).toBeGreaterThan(0);
  });

  it('renders all item labels', () => {
    const { lastFrame } = render(
      <Select items={ITEMS} onSelect={() => {}} />
    );
    expect(lastFrame()).toContain('Development');
    expect(lastFrame()).toContain('Staging');
    expect(lastFrame()).toContain('Production');
  });

  it('renders disabled items with (disabled) hint', () => {
    const items = [
      { label: 'Option A', value: 'a' },
      { label: 'Option B', value: 'b', disabled: true },
    ];
    const { lastFrame } = render(
      <Select items={items} onSelect={() => {}} />
    );
    expect(lastFrame()).toContain('Option B');
    expect(lastFrame()).toContain('disabled');
  });
});
