import React from 'react';
import { render, Box } from 'ink';
import { StatusIndicator } from '../src/index.js';

function Demo() {
  return (
    <Box flexDirection="column" gap={1}>
      <StatusIndicator status="online"  label="API Gateway" />
      <StatusIndicator status="loading" label="Syncing database..." />
      <StatusIndicator status="warning" label="High memory usage" />
      <StatusIndicator status="error"   label="Redis connection failed" />
      <StatusIndicator status="offline" label="CDN node 3" />
      <StatusIndicator status="idle"    label="Background worker" />
    </Box>
  );
}

render(<Demo />);
setTimeout(() => process.exit(0), 3000);
