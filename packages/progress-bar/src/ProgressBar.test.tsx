import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from 'ink-testing-library';
import { ProgressBar } from './ProgressBar.js';

describe('ProgressBar', () => {
  it('renders without crashing', () => {
    const { lastFrame } = render(<ProgressBar value={50} width={20} />);
    expect(lastFrame()).toBeTruthy();
    expect(lastFrame()!.length).toBeGreaterThan(0);
  });

  it('renders filled characters at 100%', () => {
    const { lastFrame } = render(<ProgressBar value={100} width={10} />);
    expect(lastFrame()).toContain('█');
  });

  it('renders empty characters at 0%', () => {
    const { lastFrame } = render(<ProgressBar value={0} width={10} />);
    expect(lastFrame()).toContain('░');
  });

  it('renders with a label', () => {
    const { lastFrame } = render(
      <ProgressBar value={75} width={20} label="Uploading" />
    );
    expect(lastFrame()).toContain('Uploading');
  });

  it('renders percentage when showPercent is true', () => {
    const { lastFrame } = render(
      <ProgressBar value={42} width={20} showPercent />
    );
    expect(lastFrame()).toContain('42');
  });
});
