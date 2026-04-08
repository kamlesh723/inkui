import React from 'react';
import { render, Box, Text } from 'ink';
import { KeyHint } from '../src/index.js';

function Demo() {
  return (
    <Box flexDirection="column" gap={1}>
      <Text dimColor>Select menu hints:</Text>
      <KeyHint keys={[
        { key: '↑↓',    label: 'Navigate' },
        { key: 'Enter', label: 'Select'   },
        { key: 'Esc',   label: 'Cancel'   },
      ]} />
      <Text dimColor>Multi-select hints:</Text>
      <KeyHint keys={[
        { key: '↑↓',    label: 'Navigate' },
        { key: 'Space', label: 'Toggle'   },
        { key: 'Enter', label: 'Confirm'  },
        { key: 'Esc',   label: 'Cancel'   },
      ]} />
    </Box>
  );
}

render(<Demo />);
setTimeout(() => process.exit(0), 3000);
