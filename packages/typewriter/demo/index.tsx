import React from 'react';
import { render } from 'ink';
import { Box, Text } from 'ink';
import { Typewriter } from '../src/Typewriter.js';

render(
  <Box flexDirection="column" gap={1}>
    <Text bold color="cyan">Typewriter Demo</Text>
    <Typewriter text="Welcome to InkUI — a terminal UI component library." speed={40} />
  </Box>
);

setTimeout(() => process.exit(0), 5000);
