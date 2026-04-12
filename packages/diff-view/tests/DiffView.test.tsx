import React from 'react';
import { render } from 'ink-testing-library';
import { describe, test, expect } from 'vitest';
import { DiffView } from '../src/DiffView.js';

const before = "a\nb";
const after = "a\nc";

describe('DiffView', () => {
  test('renders without crashing', () => {
    const { lastFrame } = render(<DiffView before={before} after={after} />);
    expect(lastFrame()).toBeDefined();
  });

  test('shows added lines prefix', () => {
    const { lastFrame } = render(<DiffView before={before} after={after} showBorder={false} />);
    expect(lastFrame()).toContain('+ c');
  });

  test('shows removed lines prefix', () => {
    const { lastFrame } = render(<DiffView before={before} after={after} showBorder={false} />);
    expect(lastFrame()).toContain('- b');
  });

  test('shows context lines', () => {
    const multiLineBefore = "a\nb\nc";
    const multiLineAfter = "a\nB\nc";
    const { lastFrame } = render(<DiffView before={multiLineBefore} after={multiLineAfter} showBorder={false} />);
    expect(lastFrame()).toContain('a');
  });

  test('renders without line numbers', () => {
    const { lastFrame } = render(
      <DiffView before={before} after={after} showLineNumbers={false} showBorder={false} />
    );
    expect(lastFrame()).toContain('+ c');
    expect(lastFrame()).not.toContain('│');
  });
});
