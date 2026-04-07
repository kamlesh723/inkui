import React, { useEffect } from 'react';
import { Box, Text, useApp } from 'ink';
import { Badge } from '@inkui/badge';
import { darkTheme } from '@inkui/core';

export const HelpCommand: React.FC = () => {
  const { exit } = useApp();
  useEffect(() => {
    const t = setTimeout(() => exit(), 80);
    return () => clearTimeout(t);
  }, [exit]);

  return (
    <Box flexDirection="column" gap={1}>
      <Box gap={2}>
        <Text bold>InkUI</Text>
        <Badge variant="info" theme={darkTheme}>v0.1.0</Badge>
      </Box>

      <Box flexDirection="column">
        <Text dimColor>Commands:</Text>
        <Text>  <Text color="cyan" bold>inkui list</Text></Text>
        <Text dimColor>    List all available components</Text>

        <Text>  <Text color="cyan" bold>inkui add {'<component>'}</Text></Text>
        <Text dimColor>    Copy component source into ./components/ui/</Text>

        <Text>  <Text color="cyan" bold>inkui add --all</Text></Text>
        <Text dimColor>    Copy all components</Text>
      </Box>

      <Box flexDirection="column">
        <Text dimColor>Examples:</Text>
        <Text dimColor>  npx inkui add spinner</Text>
        <Text dimColor>  npx inkui add table</Text>
        <Text dimColor>  npx inkui add --all</Text>
      </Box>
    </Box>
  );
};
