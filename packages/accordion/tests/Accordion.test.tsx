import React from 'react';
import { Text } from 'ink';
import { render } from 'ink-testing-library';
import { describe, test, expect } from 'vitest';
import { Accordion } from '../src/Accordion.js';

const items = [
  { key: 'a', title: 'Database Config', content: <Text>host: localhost</Text>, defaultOpen: true },
  { key: 'b', title: 'API Settings', content: <Text>timeout: 30s</Text> },
  { key: 'c', title: 'Deployment', content: <Text>region: us-east</Text>, disabled: true },
];

describe('Accordion', () => {
  test('renders all section titles', () => {
    const { lastFrame } = render(<Accordion items={items} focus={false} />);
    expect(lastFrame()).toContain('Database Config');
    expect(lastFrame()).toContain('API Settings');
    expect(lastFrame()).toContain('Deployment');
  });

  test('shows content for defaultOpen sections', () => {
    const { lastFrame } = render(<Accordion items={items} focus={false} />);
    expect(lastFrame()).toContain('host: localhost');
  });

  test('hides content for closed sections', () => {
    const { lastFrame } = render(<Accordion items={items} focus={false} />);
    expect(lastFrame()).not.toContain('timeout: 30s');
  });

  test('shows expanded chevron for open sections', () => {
    const { lastFrame } = render(<Accordion items={items} focus={false} />);
    expect(lastFrame()).toContain('▾');
  });

  test('shows collapsed chevron for closed sections', () => {
    const { lastFrame } = render(<Accordion items={items} focus={false} />);
    expect(lastFrame()).toContain('▸');
  });

  test('renders with rounded border style', () => {
    const { lastFrame } = render(<Accordion items={items.slice(0, 1)} borderStyle="rounded" focus={false} />);
    expect(lastFrame()).toContain('Database Config');
  });
});
