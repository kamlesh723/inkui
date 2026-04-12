import React from 'react';
import { render } from 'ink';
import { Box, Text } from 'ink';
import { TokenCounter } from '../src/TokenCounter.js';

render(
  <Box flexDirection="column" gap={1}>
    <Text bold color="cyan">TokenCounter Demo</Text>
    <TokenCounter used={42318} total={200000} variant="compact" />
    <TokenCounter used={160000} total={200000} variant="compact" />
    <TokenCounter
      used={42318}
      total={200000}
      model="claude-sonnet-4-20250514"
      inputTokens={38210}
      outputTokens={4108}
      inputCostPer1k={0.003}
      outputCostPer1k={0.015}
      variant="detailed"
    />
    <TokenCounter used={42000} total={200000} variant="minimal" />
  </Box>
);

setTimeout(() => process.exit(0), 3000);
