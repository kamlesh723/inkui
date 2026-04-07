import React, { useEffect } from 'react';
import { Box, Text, useApp } from 'ink';
import { Table } from '@inkui/table';
import { Badge } from '@inkui/badge';
import { darkTheme } from '@inkui/core';
import { REGISTRY, componentNames } from '../registry.js';

type Row = { component: string; description: string };

const rows: Row[] = componentNames.map((name) => ({
  component: name,
  description: REGISTRY[name]!.description,
}));

const columns = [
  { key: 'component'   as const, header: 'Component',   align: 'left'  as const },
  { key: 'description' as const, header: 'Description', align: 'left'  as const },
];

export const ListCommand: React.FC = () => {
  const { exit } = useApp();

  useEffect(() => {
    // Render is synchronous — exit after paint
    const t = setTimeout(() => exit(), 80);
    return () => clearTimeout(t);
  }, [exit]);

  return (
    <Box flexDirection="column" gap={1}>
      <Box gap={2}>
        <Text bold>InkUI</Text>
        <Badge variant="info" theme={darkTheme}>v0.1.0</Badge>
        <Text dimColor>shadcn-style terminal components for Ink</Text>
      </Box>

      <Table columns={columns} data={rows} borderStyle="rounded" theme={darkTheme} />

      <Box flexDirection="column">
        <Text dimColor>Usage:</Text>
        <Text>  <Text color="cyan">npx inkui add {'<component>'}</Text>  — copy component source into your project</Text>
        <Text>  <Text color="cyan">npx inkui add --all</Text>            — copy all components</Text>
        <Text>  <Text color="cyan">npx inkui list</Text>                 — show this list</Text>
      </Box>
    </Box>
  );
};
