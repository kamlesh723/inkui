import React from 'react';
import { render } from 'ink';
import { TreeView } from '../src/TreeView.js';

const nodes = [
  {
    id: 'src',
    label: 'src',
    defaultExpanded: true,
    children: [
      {
        id: 'components',
        label: 'components',
        children: [
          { id: 'btn', label: 'Button.tsx' },
          { id: 'inp', label: 'Input.tsx' },
        ],
      },
      {
        id: 'utils',
        label: 'utils',
        defaultExpanded: true,
        children: [
          { id: 'helpers', label: 'helpers.ts' },
          { id: 'format', label: 'format.ts' },
        ],
      },
      { id: 'index', label: 'index.ts' },
    ],
  },
  { id: 'pkg', label: 'package.json' },
  { id: 'tsconfig', label: 'tsconfig.json' },
];

render(<TreeView nodes={nodes} focus={false} />);
setTimeout(() => process.exit(0), 3000);
