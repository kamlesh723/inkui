import React from 'react';
import { render } from 'ink-testing-library';
import { describe, test, expect } from 'vitest';
import { CodeBlock } from '../src/CodeBlock.js';

// Strip ANSI escape codes — required because CI sets FORCE_COLOR=1
// which causes ink to emit color sequences even in non-TTY test environments.
// The syntax highlighter colorizes keywords (e.g. 'const'), splitting them
// from adjacent text across ANSI codes, so plain toContain() would fail.
const strip = (s: string | null | undefined) =>
  (s ?? '').replace(/\x1b\[[0-9;]*m/g, '');

const sampleCode = `const app = express();
const PORT = 3000;
app.listen(PORT);`;

describe('CodeBlock', () => {
  test('renders code content', () => {
    const { lastFrame } = render(<CodeBlock code={sampleCode} language="javascript" />);
    const out = strip(lastFrame());
    expect(out).toContain('const app');
    expect(out).toContain('PORT');
  });

  test('shows line numbers by default', () => {
    const { lastFrame } = render(<CodeBlock code={sampleCode} />);
    const out = strip(lastFrame());
    expect(out).toContain('1');
    expect(out).toContain('2');
  });

  test('hides line numbers when showLineNumbers=false', () => {
    const { lastFrame } = render(<CodeBlock code={sampleCode} showLineNumbers={false} showBorder={false} />);
    expect(strip(lastFrame())).not.toContain('│');
  });

  test('shows title when provided', () => {
    const { lastFrame } = render(<CodeBlock code={sampleCode} title="server.ts" />);
    expect(strip(lastFrame())).toContain('server.ts');
  });

  test('renders JSON language', () => {
    const { lastFrame } = render(<CodeBlock code='{"key": "value"}' language="json" />);
    const out = strip(lastFrame());
    expect(out).toContain('key');
    expect(out).toContain('value');
  });

  test('renders without border', () => {
    const { lastFrame } = render(<CodeBlock code={sampleCode} showBorder={false} />);
    expect(strip(lastFrame())).toContain('const app');
  });
});
