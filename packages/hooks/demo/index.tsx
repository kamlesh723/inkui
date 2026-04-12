import React from 'react';
import { render } from 'ink';
import { Box, Text } from 'ink';
import { useAsync } from '../src/useAsync.js';
import { useTerminalSize } from '../src/useTerminalSize.js';

function App() {
  const { columns, rows } = useTerminalSize();
  const { data, loading, error } = useAsync(async () => {
    await new Promise((r) => setTimeout(r, 500));
    return 'Loaded successfully!';
  });

  return (
    <Box flexDirection="column" gap={1}>
      <Text bold color="cyan">Hooks Demo</Text>
      <Text color="green">Terminal: {columns}×{rows}</Text>
      {loading && <Text color="yellow">useAsync: Loading...</Text>}
      {error && <Text color="red">useAsync: Error: {error.message}</Text>}
      {data && <Text color="green">useAsync: {data}</Text>}
    </Box>
  );
}

render(<App />);
setTimeout(() => process.exit(0), 3000);
