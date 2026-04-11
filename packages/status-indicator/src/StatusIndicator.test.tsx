import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from 'ink-testing-library';
import { StatusIndicator } from './StatusIndicator.js';

describe('StatusIndicator', () => {
  it('renders without crashing', () => {
    const { lastFrame } = render(
      <StatusIndicator status="online" label="API Server" />
    );
    expect(lastFrame()).toBeTruthy();
    expect(lastFrame()!.length).toBeGreaterThan(0);
  });

  it('renders the label text', () => {
    const { lastFrame } = render(
      <StatusIndicator status="online" label="Database" />
    );
    expect(lastFrame()).toContain('Database');
  });

  it('renders with offline status', () => {
    const { lastFrame } = render(
      <StatusIndicator status="offline" label="Cache" />
    );
    expect(lastFrame()).toContain('Cache');
  });

  it('renders with error status', () => {
    const { lastFrame } = render(
      <StatusIndicator status="error" label="Worker" />
    );
    expect(lastFrame()).toContain('Worker');
  });

  it('renders with warning status', () => {
    const { lastFrame } = render(
      <StatusIndicator status="warning" label="Queue" />
    );
    expect(lastFrame()).toContain('Queue');
  });
});
