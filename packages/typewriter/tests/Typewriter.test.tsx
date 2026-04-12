import React from 'react';
import { render } from 'ink-testing-library';
import { describe, test, expect } from 'vitest';
import { Typewriter } from '../src/Typewriter.js';

describe('Typewriter', () => {
  test('shows full text immediately when playing=false', () => {
    const { lastFrame } = render(<Typewriter text="Hello World" playing={false} />);
    expect(lastFrame()).toContain('Hello World');
  });

  test('renders without crashing when playing=true', () => {
    const { lastFrame } = render(<Typewriter text="Hello" playing={true} speed={1000} />);
    expect(lastFrame()).toBeDefined();
  });

  test('shows no cursor when cursor=false and playing=false', () => {
    const { lastFrame } = render(<Typewriter text="Hi" cursor={false} playing={false} />);
    expect(lastFrame()).not.toContain('▌');
  });

  test('accepts custom cursor character', () => {
    const { lastFrame } = render(<Typewriter text="Hi" cursorChar="█" playing={false} cursor={false} />);
    expect(lastFrame()).not.toContain('█');
  });

  test('renders empty text', () => {
    const { lastFrame } = render(<Typewriter text="" playing={false} />);
    expect(lastFrame()).toBeDefined();
  });
});
