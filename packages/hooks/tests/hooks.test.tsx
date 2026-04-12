import React from 'react';
import { Text } from 'ink';
import { render } from 'ink-testing-library';
import { describe, test, expect, vi } from 'vitest';
import { useAsync } from '../src/useAsync.js';
import { useTerminalSize } from '../src/useTerminalSize.js';

// Test useAsync
function AsyncComponent({ fn }: { fn: () => Promise<string> }) {
  const { data, loading, error } = useAsync(fn);
  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;
  return <Text>{data ?? 'no data'}</Text>;
}

// Test useTerminalSize
function SizeComponent() {
  const { columns, rows } = useTerminalSize();
  return <Text>cols:{columns} rows:{rows}</Text>;
}

describe('useAsync', () => {
  test('shows loading state initially', () => {
    const fn = () => new Promise<string>((res) => setTimeout(() => res('done'), 100));
    const { lastFrame } = render(<AsyncComponent fn={fn} />);
    expect(lastFrame()).toContain('Loading...');
  });

  test('shows data on resolution', async () => {
    const fn = () => Promise.resolve('hello');
    const { lastFrame } = render(<AsyncComponent fn={fn} />);
    await new Promise((r) => setTimeout(r, 50));
    expect(lastFrame()).toContain('hello');
  });

  test('shows error on rejection', async () => {
    const fn = () => Promise.reject(new Error('failed'));
    const { lastFrame } = render(<AsyncComponent fn={fn} />);
    await new Promise((r) => setTimeout(r, 50));
    expect(lastFrame()).toContain('Error: failed');
  });
});

describe('useTerminalSize', () => {
  test('returns terminal dimensions', () => {
    const { lastFrame } = render(<SizeComponent />);
    expect(lastFrame()).toContain('cols:');
    expect(lastFrame()).toContain('rows:');
  });
});
