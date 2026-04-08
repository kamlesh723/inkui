import React from 'react';
import { render, Box } from 'ink';
import { Divider } from '../src/index.js';

function Demo() {
  return (
    <Box flexDirection="column" gap={1}>
      <Divider width={50} />
      <Divider width={50} style="double" />
      <Divider width={50} style="dashed" />
      <Divider width={50} style="bold" />
      <Divider width={50} title="Settings" />
      <Divider width={50} title="Output" style="double" />
    </Box>
  );
}

render(<Demo />);
setTimeout(() => process.exit(0), 3000);
