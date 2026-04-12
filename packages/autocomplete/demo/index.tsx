import React from 'react';
import { render } from 'ink';
import { Box, Text } from 'ink';
import { Autocomplete } from '../src/Autocomplete.js';

const packages = [
  { label: 'express', value: 'express', description: 'Web framework' },
  { label: 'express-rate-limit', value: 'express-rate-limit', description: 'Rate limiting' },
  { label: 'react', value: 'react', description: 'UI library' },
  { label: 'react-dom', value: 'react-dom', description: 'DOM renderer' },
  { label: 'typescript', value: 'typescript', description: 'TypeScript compiler' },
  { label: 'vitest', value: 'vitest', description: 'Testing framework' },
];

render(
  <Box flexDirection="column" gap={1}>
    <Text bold color="cyan">Autocomplete Demo</Text>
    <Autocomplete
      items={packages}
      onSelect={(item) => process.stdout.write(`Selected: ${item.label}\n`)}
      label="Search packages:"
      focus={false}
    />
  </Box>
);

setTimeout(() => process.exit(0), 3000);
