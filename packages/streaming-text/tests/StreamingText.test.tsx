import React from 'react';
import { render } from 'ink-testing-library';
import { describe, test, expect } from 'vitest';
import { StreamingText } from '../src/StreamingText.js';

describe('StreamingText', () => {
  test('renders text content', () => {
    const { lastFrame } = render(<StreamingText text="Hello world" streaming={false} />);
    expect(lastFrame()).toContain('Hello world');
  });

  test('shows no cursor when streaming=false', () => {
    const { lastFrame } = render(<StreamingText text="Hello" streaming={false} cursor="█" />);
    expect(lastFrame()).not.toContain('█');
  });

  test('renders empty text', () => {
    const { lastFrame } = render(<StreamingText text="" streaming={false} />);
    expect(lastFrame()).toBeDefined();
  });

  test('accepts custom color', () => {
    const { lastFrame } = render(<StreamingText text="colored" color="green" streaming={false} />);
    expect(lastFrame()).toContain('colored');
  });

  test('renders with streaming=true', () => {
    const { lastFrame } = render(<StreamingText text="Streaming..." streaming={true} />);
    expect(lastFrame()).toContain('Streaming...');
  });
});
