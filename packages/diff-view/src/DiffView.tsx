import React from 'react';
import { Box, Text } from 'ink';
import { darkTheme } from '@inkui-cli/core';
import type { InkUITheme } from '@inkui-cli/core';
import { computeDiff } from './diff.js';
import type { DiffLine } from './diff.js';

export interface DiffViewProps {
  before: string;
  after: string;
  mode?: 'unified' | 'split';
  showLineNumbers?: boolean;
  contextLines?: number;
  maxHeight?: number;
  beforeLabel?: string;
  afterLabel?: string;
  showBorder?: boolean;
  theme?: InkUITheme;
}

export const DiffView: React.FC<DiffViewProps> = ({
  before,
  after,
  mode = 'unified',
  showLineNumbers = true,
  contextLines = 3,
  maxHeight,
  beforeLabel = 'Before',
  afterLabel = 'After',
  showBorder = true,
  theme = darkTheme,
}) => {
  const diffLines = computeDiff(before, after, contextLines);
  const visible = maxHeight ? diffLines.slice(0, maxHeight) : diffLines;

  const getColor = (type: DiffLine['type']) => {
    if (type === 'add') return theme.colors.success;
    if (type === 'remove') return theme.colors.error;
    return theme.colors.muted;
  };

  const getPrefix = (type: DiffLine['type']) => {
    if (type === 'add') return '+';
    if (type === 'remove') return '-';
    return ' ';
  };

  const renderUnified = () => (
    <Box flexDirection="column">
      {visible.map((line, i) => (
        <Box key={i} flexDirection="row">
          {showLineNumbers && (
            <Text color={theme.colors.muted}>
              {line.beforeNum !== undefined ? String(line.beforeNum).padStart(3) : '   '}
              {' '}
              {line.afterNum !== undefined ? String(line.afterNum).padStart(3) : '   '}
              {' │ '}
            </Text>
          )}
          <Text color={getColor(line.type)}>
            {getPrefix(line.type)} {line.text}
          </Text>
        </Box>
      ))}
    </Box>
  );

  const content = renderUnified();

  if (!showBorder) return content;

  return (
    <Box
      flexDirection="column"
      borderStyle="round"
      borderColor={theme.colors.border}
    >
      {mode === 'split' && (
        <Box flexDirection="row" borderBottom paddingX={1}>
          <Box flexGrow={1}>
            <Text bold color={theme.colors.muted}>{beforeLabel}</Text>
          </Box>
          <Box flexGrow={1}>
            <Text bold color={theme.colors.muted}>{afterLabel}</Text>
          </Box>
        </Box>
      )}
      {content}
    </Box>
  );
};
