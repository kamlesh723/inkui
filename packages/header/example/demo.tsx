import React from 'react';
import { render, Box } from 'ink';
import { Header } from '../src/index.js';

function Demo() {
  return (
    <Box flexDirection="column" gap={1}>
      <Header title="MyApp" version="1.2.0" style="box" subtitle="Deploy tool for production" />
      <Header title="MyApp" version="1.2.0" style="line" subtitle="Deploy tool for production" />
      <Header title="MyApp" version="1.2.0" style="filled" />
    </Box>
  );
}

render(<Demo />);
setTimeout(() => process.exit(0), 3000);
