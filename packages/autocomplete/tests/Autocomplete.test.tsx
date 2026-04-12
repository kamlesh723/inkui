import React from 'react';
import { render } from 'ink-testing-library';
import { describe, test, expect } from 'vitest';
import { Autocomplete } from '../src/Autocomplete.js';

const items = [
  { label: 'express', value: 'express', description: 'Web framework' },
  { label: 'express-rate', value: 'express-rate', description: 'Rate limiting' },
  { label: 'react', value: 'react' },
];

describe('Autocomplete', () => {
  test('renders input with placeholder', () => {
    const { lastFrame } = render(
      <Autocomplete items={items} onSelect={() => {}} placeholder="Search..." focus={false} />
    );
    expect(lastFrame()).toContain('Search...');
  });

  test('renders dropdown when focused', () => {
    const { lastFrame } = render(
      <Autocomplete items={items} onSelect={() => {}} focus={true} />
    );
    expect(lastFrame()).toContain('express');
    expect(lastFrame()).toContain('react');
  });

  test('hides dropdown when not focused', () => {
    const { lastFrame } = render(
      <Autocomplete items={items} onSelect={() => {}} focus={false} />
    );
    expect(lastFrame()).not.toContain('express');
  });

  test('shows label when provided', () => {
    const { lastFrame } = render(
      <Autocomplete items={items} onSelect={() => {}} label="Package:" focus={false} />
    );
    expect(lastFrame()).toContain('Package:');
  });

  test('shows descriptions when showDescriptions=true', () => {
    const { lastFrame } = render(
      <Autocomplete items={items} onSelect={() => {}} showDescriptions={true} focus={true} />
    );
    expect(lastFrame()).toContain('Web framework');
  });
});
