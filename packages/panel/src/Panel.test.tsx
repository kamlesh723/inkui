import { describe, it, expect } from 'vitest';
import React from 'react';
import { Text } from 'ink';
import { render } from 'ink-testing-library';
import { Panel, SplitPane } from './Panel.js';

describe('Panel', () => {
  it('renders without crashing', () => {
    const { lastFrame } = render(<Panel width={40}><Text>Hello</Text></Panel>);
    expect(lastFrame()).toBeTruthy();
    expect(lastFrame()!.length).toBeGreaterThan(0);
  });

  it('renders children content', () => {
    const { lastFrame } = render(<Panel width={40}><Text>My content</Text></Panel>);
    expect(lastFrame()).toContain('My content');
  });

  it('renders with a title', () => {
    const { lastFrame } = render(
      <Panel title="Settings" width={40}><Text>body text</Text></Panel>
    );
    expect(lastFrame()).toContain('Settings');
    expect(lastFrame()).toContain('body text');
  });

  it('renders with double border style', () => {
    const { lastFrame } = render(
      <Panel borderStyle="double" width={40}><Text>content</Text></Panel>
    );
    expect(lastFrame()).toContain('═');
  });
});

describe('SplitPane', () => {
  it('renders children side by side', () => {
    const { lastFrame } = render(
      <SplitPane>
        <Text>Left</Text>
        <Text>Right</Text>
      </SplitPane>
    );
    expect(lastFrame()).toContain('Left');
    expect(lastFrame()).toContain('Right');
  });

  it('renders in vertical direction', () => {
    const { lastFrame } = render(
      <SplitPane direction="vertical">
        <Text>Top</Text>
        <Text>Bottom</Text>
      </SplitPane>
    );
    expect(lastFrame()).toContain('Top');
    expect(lastFrame()).toContain('Bottom');
  });

  it('renders with Panel children', () => {
    const { lastFrame } = render(
      <SplitPane sizes={[1, 2]}>
        <Panel title="Files" width={20}><Text>index.ts</Text></Panel>
        <Panel title="Preview" width={40}><Text>export function</Text></Panel>
      </SplitPane>
    );
    expect(lastFrame()).toContain('Files');
    expect(lastFrame()).toContain('Preview');
    expect(lastFrame()).toContain('index.ts');
    expect(lastFrame()).toContain('export function');
  });
});
