import React from 'react';
import { render } from 'ink-testing-library';
import { describe, test, expect } from 'vitest';
import { Gauge } from '../src/Gauge.js';

describe('Gauge', () => {
  test('renders bar variant with fill', () => {
    const { lastFrame } = render(<Gauge value={62} variant="bar" />);
    expect(lastFrame()).toContain('█');
    expect(lastFrame()).toContain('░');
  });

  test('shows value', () => {
    const { lastFrame } = render(<Gauge value={62} variant="bar" showValue />);
    expect(lastFrame()).toContain('62%');
  });

  test('shows label', () => {
    const { lastFrame } = render(<Gauge value={50} label="CPU" variant="bar" />);
    expect(lastFrame()).toContain('CPU');
  });

  test('renders ring variant', () => {
    const { lastFrame } = render(<Gauge value={50} variant="ring" />);
    expect(lastFrame()).toContain('50%');
  });

  test('renders arc variant', () => {
    const { lastFrame } = render(<Gauge value={75} variant="arc" label="Memory" />);
    expect(lastFrame()).toContain('Memory');
  });

  test('handles 0% value', () => {
    const { lastFrame } = render(<Gauge value={0} variant="bar" />);
    expect(lastFrame()).toContain('0%');
  });

  test('handles 100% value', () => {
    const { lastFrame } = render(<Gauge value={100} variant="bar" />);
    expect(lastFrame()).toContain('100%');
  });
});
