import React from 'react';
import { render } from 'ink-testing-library';
import { describe, test, expect } from 'vitest';
import { TreeView } from '../src/TreeView.js';

const nodes = [
  {
    id: 'src',
    label: 'src',
    defaultExpanded: true,
    children: [
      { id: 'index', label: 'index.ts' },
      { id: 'utils', label: 'utils.ts' },
    ],
  },
  { id: 'pkg', label: 'package.json' },
];

describe('TreeView', () => {
  test('renders root nodes', () => {
    const { lastFrame } = render(<TreeView nodes={nodes} focus={false} />);
    expect(lastFrame()).toContain('src');
    expect(lastFrame()).toContain('package.json');
  });

  test('renders expanded children', () => {
    const { lastFrame } = render(<TreeView nodes={nodes} focus={false} />);
    expect(lastFrame()).toContain('index.ts');
    expect(lastFrame()).toContain('utils.ts');
  });

  test('shows expanded chevron for open branches', () => {
    const { lastFrame } = render(<TreeView nodes={nodes} focus={false} />);
    expect(lastFrame()).toContain('▾');
  });

  test('shows collapsed chevron for closed branches', () => {
    const collapsed = [{ id: 'src', label: 'src', children: [{ id: 'x', label: 'x.ts' }] }];
    const { lastFrame } = render(<TreeView nodes={collapsed} focus={false} />);
    expect(lastFrame()).toContain('▸');
  });

  test('renders without icons when showIcons=false', () => {
    const { lastFrame } = render(<TreeView nodes={nodes} showIcons={false} focus={false} />);
    expect(lastFrame()).not.toContain('📄');
    expect(lastFrame()).not.toContain('📁');
  });
});
