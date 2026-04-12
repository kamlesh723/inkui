import React from 'react';
import { render } from 'ink-testing-library';
import { describe, test, expect } from 'vitest';
import { TokenCounter } from '../src/TokenCounter.js';

describe('TokenCounter', () => {
  test('renders compact variant with token counts', () => {
    const { lastFrame } = render(<TokenCounter used={42318} total={200000} />);
    expect(lastFrame()).toContain('42,318');
    expect(lastFrame()).toContain('200,000');
  });

  test('renders percentage', () => {
    const { lastFrame } = render(<TokenCounter used={100000} total={200000} />);
    expect(lastFrame()).toContain('50%');
  });

  test('renders minimal variant', () => {
    const { lastFrame } = render(<TokenCounter used={42000} total={200000} variant="minimal" />);
    expect(lastFrame()).toContain('42.0k');
  });

  test('renders detailed variant with model', () => {
    const { lastFrame } = render(
      <TokenCounter used={42318} total={200000} model="claude-sonnet" variant="detailed" />
    );
    expect(lastFrame()).toContain('claude-sonnet');
    expect(lastFrame()).toContain('Token Usage');
  });

  test('hides bar when showBar=false', () => {
    const { lastFrame } = render(<TokenCounter used={50000} total={200000} showBar={false} />);
    expect(lastFrame()).not.toContain('█');
  });
});
