import React, { useState, useEffect } from 'react';
import { render, Box, Text } from 'ink';
import { LoadingBar } from '../src/index.js';

function Demo() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setProgress((p) => Math.min(p + 2, 100)), 60);
    return () => clearInterval(t);
  }, []);

  return (
    <Box flexDirection="column" gap={1}>
      <Text dimColor>Indeterminate (bouncing):</Text>
      <LoadingBar width={40} />
      <Text dimColor>Determinate ({progress}%):</Text>
      <LoadingBar value={progress} width={40} />
    </Box>
  );
}

render(<Demo />);
setTimeout(() => process.exit(0), 4000);
