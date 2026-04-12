import React from 'react';
import { render } from 'ink-testing-library';
import { describe, test, expect } from 'vitest';
import { Sparkline } from '../src/Sparkline.js';

const data = [10, 20, 35, 50, 70, 90, 80, 60, 40, 25];

describe('Sparkline', () => {
  test('renders block characters', () => {
    const { lastFrame } = render(<Sparkline data={data} />);
    const frame = lastFrame() ?? '';
    const hasBlock = ['▁','▂','▃','▄','▅','▆','▇','█'].some(c => frame.includes(c));
    expect(hasBlock).toBe(true);
  });

  test('shows label when provided', () => {
    const { lastFrame } = render(<Sparkline data={data} label="CPU" />);
    expect(lastFrame()).toContain('CPU');
  });

  test('shows latest value when showLatest=true', () => {
    const { lastFrame } = render(<Sparkline data={data} showLatest />);
    expect(lastFrame()).toContain('25');
  });

  test('shows range when showRange=true', () => {
    const { lastFrame } = render(<Sparkline data={data} showRange />);
    expect(lastFrame()).toContain('min:');
    expect(lastFrame()).toContain('max:');
  });

  test('handles empty data gracefully', () => {
    const { lastFrame } = render(<Sparkline data={[]} />);
    expect(lastFrame()).toContain('no data');
  });

  test('handles single data point', () => {
    const { lastFrame } = render(<Sparkline data={[42]} showLatest />);
    expect(lastFrame()).toContain('42');
  });
});
