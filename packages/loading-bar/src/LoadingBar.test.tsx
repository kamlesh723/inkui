import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from 'ink-testing-library';
import { LoadingBar } from './LoadingBar.js';

describe('LoadingBar', () => {
  it('renders without crashing', () => {
    const { lastFrame } = render(<LoadingBar value={50} width={20} />);
    expect(lastFrame()).toBeTruthy();
    expect(lastFrame()!.length).toBeGreaterThan(0);
  });

  it('renders filled characters at 100%', () => {
    const { lastFrame } = render(<LoadingBar value={100} width={10} />);
    expect(lastFrame()).toContain('━');
  });

  it('renders empty characters at 0%', () => {
    const { lastFrame } = render(<LoadingBar value={0} width={10} />);
    expect(lastFrame()).toContain('░');
  });

  it('renders indeterminate mode (no value)', () => {
    const { lastFrame } = render(<LoadingBar width={20} />);
    expect(lastFrame()).toBeTruthy();
    expect(lastFrame()!.length).toBeGreaterThan(0);
  });
});
