import { describe, it, expect } from 'vitest';
import React from 'react';
import { Text } from 'ink';
import { render } from 'ink-testing-library';
import { Panel } from './Panel.js';

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
