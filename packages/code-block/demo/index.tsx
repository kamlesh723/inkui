import React from 'react';
import { render } from 'ink';
import { CodeBlock } from '../src/CodeBlock.js';

const code = `import express from 'express';

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.json({ status: 'ok', port: PORT });
});

app.listen(PORT, () => {
  console.log(\`Running on port \${PORT}\`);
});`;

render(
  <CodeBlock
    code={code}
    language="javascript"
    title="server.js"
    highlightLines={[4]}
    showBorder
  />
);

setTimeout(() => process.exit(0), 3000);
