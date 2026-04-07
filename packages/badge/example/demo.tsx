import React from 'react';
import { render, Box, Text } from 'ink';
import { Badge } from '../src/index.js';
import { darkTheme, lightTheme } from '@inkui-cli/core';

const Demo = () => (
  <Box flexDirection="column" gap={1}>
    <Text bold>@inkui-cli/badge — live demo</Text>

    <Box flexDirection="column">
      <Text dimColor>── dark theme ──────────────────────</Text>
      <Box gap={2} marginTop={1}>
        <Badge variant="default" theme={darkTheme}>default</Badge>
        <Badge variant="success" theme={darkTheme}>success</Badge>
        <Badge variant="warning" theme={darkTheme}>warning</Badge>
        <Badge variant="error"   theme={darkTheme}>error</Badge>
        <Badge variant="info"    theme={darkTheme}>info</Badge>
      </Box>
    </Box>

    <Box flexDirection="column">
      <Text dimColor>── light theme ─────────────────────</Text>
      <Box gap={2} marginTop={1}>
        <Badge variant="default" theme={lightTheme}>default</Badge>
        <Badge variant="success" theme={lightTheme}>success</Badge>
        <Badge variant="warning" theme={lightTheme}>warning</Badge>
        <Badge variant="error"   theme={lightTheme}>error</Badge>
        <Badge variant="info"    theme={lightTheme}>info</Badge>
      </Box>
    </Box>
  </Box>
);

render(<Demo />);

// Auto-exit after 3 seconds (prevents CI hangs)
setTimeout(() => process.exit(0), 3000);
