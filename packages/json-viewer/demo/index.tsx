import React from 'react';
import { render } from 'ink';
import { JSONViewer } from '../src/JSONViewer.js';

const data = {
  name: 'InkUI',
  version: '0.3.0',
  components: 32,
  meta: {
    author: 'Kamlesh Yadav',
    license: 'MIT',
    active: true,
  },
  tags: ['terminal', 'ink', 'react', 'cli'],
};

render(<JSONViewer data={data} initialDepth={2} focus={false} />);
setTimeout(() => process.exit(0), 3000);
