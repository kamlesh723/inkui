import React from 'react';
import { render } from 'ink-testing-library';
import { describe, test, expect } from 'vitest';
import { CodeBlock } from '../src/CodeBlock.js';

const sampleCode = `const app = express();
const PORT = 3000;
app.listen(PORT);`;

describe('CodeBlock', () => {
  test('renders code content', () => {
    const { lastFrame } = render(<CodeBlock code={sampleCode} language="javascript" />);
    expect(lastFrame()).toContain('const app');
    expect(lastFrame()).toContain('PORT');
  });

  test('shows line numbers by default', () => {
    const { lastFrame } = render(<CodeBlock code={sampleCode} />);
    expect(lastFrame()).toContain('1');
    expect(lastFrame()).toContain('2');
  });

  test('hides line numbers when showLineNumbers=false', () => {
    const { lastFrame } = render(<CodeBlock code={sampleCode} showLineNumbers={false} showBorder={false} />);
    expect(lastFrame()).not.toContain('│');
  });

  test('shows title when provided', () => {
    const { lastFrame } = render(<CodeBlock code={sampleCode} title="server.ts" />);
    expect(lastFrame()).toContain('server.ts');
  });

  test('renders JSON language', () => {
    const { lastFrame } = render(<CodeBlock code='{"key": "value"}' language="json" />);
    expect(lastFrame()).toContain('key');
    expect(lastFrame()).toContain('value');
  });

  test('renders without border', () => {
    const { lastFrame } = render(<CodeBlock code={sampleCode} showBorder={false} />);
    expect(lastFrame()).toContain('const app');
  });
});
