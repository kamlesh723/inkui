import React from 'react';
import { render } from 'ink-testing-library';
import { describe, test, expect } from 'vitest';
import { Markdown } from '../src/Markdown.js';

describe('Markdown', () => {
  test('renders h1 heading', () => {
    const { lastFrame } = render(<Markdown content="# Hello World" />);
    expect(lastFrame()).toContain('Hello World');
  });

  test('renders h2 heading', () => {
    const { lastFrame } = render(<Markdown content="## Section Title" />);
    expect(lastFrame()).toContain('Section Title');
  });

  test('renders unordered list', () => {
    const { lastFrame } = render(<Markdown content="- item one\n- item two" />);
    expect(lastFrame()).toContain('item one');
    expect(lastFrame()).toContain('item two');
    expect(lastFrame()).toContain('•');
  });

  test('renders ordered list', () => {
    const { lastFrame } = render(<Markdown content="1. first\n2. second" />);
    expect(lastFrame()).toContain('first');
    expect(lastFrame()).toContain('second');
  });

  test('renders blockquote', () => {
    const { lastFrame } = render(<Markdown content="> A quote here" />);
    expect(lastFrame()).toContain('│');
    expect(lastFrame()).toContain('A quote here');
  });

  test('renders regular paragraph', () => {
    const { lastFrame } = render(<Markdown content="Just some text" />);
    expect(lastFrame()).toContain('Just some text');
  });

  test('renders horizontal rule', () => {
    const { lastFrame } = render(<Markdown content="---" />);
    expect(lastFrame()).toContain('─');
  });
});
