import React from 'react';
import { render, Box, Text } from 'ink';
import { Spinner } from '../src/index.js';
import { darkTheme, lightTheme } from '@inkui/core';

const Demo = () => (
  <Box flexDirection="column" gap={1}>
    <Text bold>@inkui/spinner — live demo</Text>
    <Spinner label="Loading your stuff...  (dots)" type="dots" theme={darkTheme} />
    <Spinner label="Crunching numbers...  (line)" type="line" theme={darkTheme} />
    <Spinner label="Orbiting...           (arc)"  type="arc"  theme={darkTheme} />
    <Spinner label="Bouncing...           (bounce)" type="bounce" theme={darkTheme} />
    <Spinner label="Light theme primary"  type="dots" theme={lightTheme} />
  </Box>
);

render(<Demo />);

// Auto-exit after 3 seconds (prevents CI hangs)
setTimeout(() => process.exit(0), 3000);
