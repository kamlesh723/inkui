import React from 'react';
import { render } from 'ink-testing-library';
import { describe, test, expect } from 'vitest';
import { JSONViewer } from '../src/JSONViewer.js';

const sampleData = {
  name: 'InkUI',
  version: '0.3.0',
  count: 15,
  active: true,
  config: { debug: false, port: 3000 },
  tags: ['terminal', 'ink', 'react'],
};

describe('JSONViewer', () => {
  test('renders root node', () => {
    const { lastFrame } = render(<JSONViewer data={sampleData} focus={false} />);
    expect(lastFrame()).toContain('root');
  });

  test('renders string values', () => {
    const { lastFrame } = render(<JSONViewer data={sampleData} initialDepth={2} focus={false} />);
    expect(lastFrame()).toContain('"InkUI"');
  });

  test('renders number values', () => {
    const { lastFrame } = render(<JSONViewer data={sampleData} initialDepth={2} focus={false} />);
    expect(lastFrame()).toContain('15');
  });

  test('renders boolean values', () => {
    const { lastFrame } = render(<JSONViewer data={sampleData} initialDepth={2} focus={false} />);
    expect(lastFrame()).toContain('true');
  });

  test('shows object count badge', () => {
    const { lastFrame } = render(<JSONViewer data={sampleData} initialDepth={1} focus={false} />);
    expect(lastFrame()).toContain('{');
  });

  test('renders array data', () => {
    const { lastFrame } = render(<JSONViewer data={[1, 2, 3]} focus={false} initialDepth={1} />);
    expect(lastFrame()).toContain('[');
  });
});
