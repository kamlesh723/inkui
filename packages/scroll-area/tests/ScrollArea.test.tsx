import React from 'react';
import { Text } from 'ink';
import { render } from 'ink-testing-library';
import { describe, test, expect } from 'vitest';
import { ScrollArea } from '../src/ScrollArea.js';

const items = Array.from({ length: 20 }, (_, i) => (
  <Text key={i}>{`Line ${i + 1}`}</Text>
));

describe('ScrollArea', () => {
  test('renders visible items up to height', () => {
    const { lastFrame } = render(
      <ScrollArea height={5} focus={false}>
        {items}
      </ScrollArea>
    );
    expect(lastFrame()).toContain('Line 1');
    expect(lastFrame()).toContain('Line 5');
    expect(lastFrame()).not.toContain('Line 6');
  });

  test('shows scrollbar when content exceeds height', () => {
    const { lastFrame } = render(
      <ScrollArea height={5} scrollbarChar="█" focus={false}>
        {items}
      </ScrollArea>
    );
    expect(lastFrame()).toContain('█');
  });

  test('hides scrollbar when scrollbar=false', () => {
    const { lastFrame } = render(
      <ScrollArea height={5} scrollbar={false} focus={false}>
        {items}
      </ScrollArea>
    );
    expect(lastFrame()).not.toContain('█');
    expect(lastFrame()).not.toContain('░');
  });

  test('renders all items when content fits height', () => {
    const { lastFrame } = render(
      <ScrollArea height={20} focus={false}>
        {items}
      </ScrollArea>
    );
    expect(lastFrame()).toContain('Line 1');
    expect(lastFrame()).toContain('Line 20');
  });

  test('accepts custom theme', () => {
    const customTheme = {
      colors: {
        primary: 'cyan',
        secondary: 'blue',
        success: 'green',
        warning: 'yellow',
        error: 'red',
        info: 'blue',
        muted: 'gray',
        text: 'white',
        textInverse: 'black',
        border: 'gray',
        focus: 'cyan',
        selection: 'blue',
      },
      border: 'single' as const,
    };
    const { lastFrame } = render(
      <ScrollArea height={5} theme={customTheme} focus={false}>
        {items}
      </ScrollArea>
    );
    expect(lastFrame()).toContain('Line 1');
  });
});
