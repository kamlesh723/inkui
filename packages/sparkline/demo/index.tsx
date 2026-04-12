import React from 'react';
import { render } from 'ink';
import { Box, Text } from 'ink';
import { Sparkline } from '../src/Sparkline.js';

const cpu = [12, 18, 25, 40, 65, 80, 72, 55, 38, 22, 15, 20, 35, 58, 75, 68, 50, 35, 20, 12];
const mem = [45, 46, 47, 48, 50, 52, 55, 58, 60, 62, 63, 64, 65, 65, 66, 67, 68, 68, 69, 70];

render(
  <Box flexDirection="column" gap={1}>
    <Text bold color="cyan">Sparkline Demo</Text>
    <Sparkline data={cpu} label="CPU  " showRange showLatest />
    <Sparkline data={mem} label="MEM  " color="yellow" showLatest />
  </Box>
);

setTimeout(() => process.exit(0), 3000);
