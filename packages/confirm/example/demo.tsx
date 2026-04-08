import React, { useState } from 'react';
import { render, Box, Text } from 'ink';
import { Confirm } from '../src/index.js';

function Demo() {
  const [result, setResult] = useState<string | null>(null);

  if (result) {
    return <Text>{result}</Text>;
  }

  return (
    <Box flexDirection="column" gap={1}>
      <Text dimColor>Destructive action confirmation:</Text>
      <Confirm
        message="Delete 47 files from dist/?"
        defaultValue={false}
        onConfirm={() => setResult('Files deleted.')}
        onCancel={() => setResult('Cancelled — no files were deleted.')}
      />
    </Box>
  );
}

render(<Demo />);
setTimeout(() => process.exit(0), 10000);
