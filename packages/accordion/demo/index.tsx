import React from 'react';
import { render } from 'ink';
import { Text } from 'ink';
import { Accordion } from '../src/Accordion.js';

const items = [
  {
    key: 'db',
    title: 'Database Configuration',
    content: (
      <Text>
        {'  Base URL: https://db.example.com\n  Port: 5432\n  Pool: 10'}
      </Text>
    ),
    defaultOpen: true,
  },
  {
    key: 'api',
    title: 'API Settings',
    content: <Text>{'  Timeout: 30s\n  Retries: 3'}</Text>,
  },
  {
    key: 'deploy',
    title: 'Deployment Options',
    content: <Text>{'  Region: us-east-1\n  Replicas: 2'}</Text>,
  },
];

render(<Accordion items={items} focus={false} />);
setTimeout(() => process.exit(0), 3000);
