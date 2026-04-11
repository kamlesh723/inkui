import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from 'ink-testing-library';
import { Badge } from '../Badge.js';

describe('Badge', () => {
  it('renders without crashing', () => {
    const { lastFrame } = render(<Badge>released</Badge>);
    expect(lastFrame()).toBeTruthy();
    expect(lastFrame()!.length).toBeGreaterThan(0);
  });

  it('renders the label text', () => {
    const { lastFrame } = render(<Badge>v1.0.0</Badge>);
    expect(lastFrame()).toContain('v1.0.0');
  });

  it('renders with success variant', () => {
    const { lastFrame } = render(<Badge variant="success">deployed</Badge>);
    expect(lastFrame()).toContain('deployed');
  });

  it('renders with error variant', () => {
    const { lastFrame } = render(<Badge variant="error">failed</Badge>);
    expect(lastFrame()).toContain('failed');
  });
});
