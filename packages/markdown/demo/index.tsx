import React from 'react';
import { render } from 'ink';
import { Markdown } from '../src/Markdown.js';

const content = `# InkUI Markdown

A terminal **Markdown** renderer for Ink components.

## Features

- Headings (H1, H2, H3)
- **Bold** and *italic* text
- \`inline code\` snippets
- [Links](https://github.com/kamlesh723/inkui)
- Ordered and unordered lists

## Code Example

\`\`\`typescript
import { Markdown } from '@inkui-cli/markdown';

const App = () => (
  <Markdown content={markdownString} />
);
\`\`\`

> This is a blockquote with some wisdom.

---

1. Step one
2. Step two
3. Step three
`;

render(<Markdown content={content} />);
setTimeout(() => process.exit(0), 3000);
