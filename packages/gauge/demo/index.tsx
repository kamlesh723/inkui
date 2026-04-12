import React from 'react';
import { render } from 'ink';
import { Box, Text } from 'ink';
import { Gauge } from '../src/Gauge.js';

render(
  <Box flexDirection="column" gap={1}>
    <Text bold color="cyan">Gauge Demo</Text>
    <Gauge value={62} label="CPU   " variant="bar" />
    <Gauge value={45} label="Memory" variant="bar" />
    <Gauge value={88} label="Disk  " variant="bar" />
    <Gauge value={62} variant="ring" label="CPU Usage" width={12} />
  </Box>
);

setTimeout(() => process.exit(0), 3000);
