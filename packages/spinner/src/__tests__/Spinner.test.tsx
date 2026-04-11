import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from 'ink-testing-library';
import { Spinner } from '../Spinner.js';

describe('Spinner', () => {
  it('renders without crashing', () => {
    const { lastFrame } = render(<Spinner label="Loading..." />);
    expect(lastFrame()).toBeTruthy();
    expect(lastFrame()!.length).toBeGreaterThan(0);
  });

  it('renders the label text', () => {
    const { lastFrame } = render(<Spinner label="Building assets" />);
    expect(lastFrame()).toContain('Building assets');
  });
});
