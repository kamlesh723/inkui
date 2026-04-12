import React from 'react';
import { Box, Text } from 'ink';
import { darkTheme } from '@inkui-cli/core';
import type { InkUITheme } from '@inkui-cli/core';

export interface TokenCounterProps {
  used: number;
  total: number;
  model?: string;
  inputCostPer1k?: number;
  outputCostPer1k?: number;
  inputTokens?: number;
  outputTokens?: number;
  showBar?: boolean;
  barWidth?: number;
  variant?: 'compact' | 'detailed' | 'minimal';
  theme?: InkUITheme;
}

function formatNum(n: number): string {
  return n.toLocaleString('en-US');
}

function formatCompact(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
}

function getColor(pct: number, theme: InkUITheme): string {
  if (pct >= 80) return theme.colors.error;
  if (pct >= 60) return theme.colors.warning;
  return theme.colors.success;
}

export const TokenCounter: React.FC<TokenCounterProps> = ({
  used,
  total,
  model,
  inputCostPer1k,
  outputCostPer1k,
  inputTokens,
  outputTokens,
  showBar = true,
  barWidth = 20,
  variant = 'compact',
  theme = darkTheme,
}) => {
  const pct = total > 0 ? Math.round((used / total) * 100) : 0;
  const color = getColor(pct, theme);

  const cost =
    inputTokens !== undefined && outputTokens !== undefined
      ? (inputTokens * (inputCostPer1k ?? 0)) / 1000 +
        (outputTokens * (outputCostPer1k ?? 0)) / 1000
      : undefined;

  const barFilled = Math.round((pct / 100) * barWidth);
  const bar = '█'.repeat(barFilled) + '░'.repeat(barWidth - barFilled);

  if (variant === 'minimal') {
    return (
      <Text>
        <Text color={color}>{formatCompact(used)}</Text>
        <Text color={theme.colors.muted}> / {formatCompact(total)} tokens ({pct}%)</Text>
      </Text>
    );
  }

  if (variant === 'detailed') {
    return (
      <Box flexDirection="column" borderStyle="round" borderColor={theme.colors.border} paddingX={1}>
        <Text bold color={theme.colors.primary}>Token Usage</Text>
        {model && <Text color={theme.colors.muted}>Model:  <Text color={theme.colors.text}>{model}</Text></Text>}
        {inputTokens !== undefined && (
          <Text color={theme.colors.muted}>
            Input:  <Text color={theme.colors.text}>{formatNum(inputTokens)} tokens</Text>
            {inputCostPer1k !== undefined && (
              <Text color={theme.colors.muted}> (${((inputTokens * inputCostPer1k) / 1000).toFixed(2)})</Text>
            )}
          </Text>
        )}
        {outputTokens !== undefined && (
          <Text color={theme.colors.muted}>
            Output: <Text color={theme.colors.text}>{formatNum(outputTokens)} tokens</Text>
            {outputCostPer1k !== undefined && (
              <Text color={theme.colors.muted}> (${((outputTokens * outputCostPer1k) / 1000).toFixed(2)})</Text>
            )}
          </Text>
        )}
        <Text color={theme.colors.muted}>
          Total:  <Text color={theme.colors.text}>{formatNum(used)} / {formatNum(total)}</Text>
        </Text>
        {showBar && (
          <Text>
            <Text color={color}>{bar}</Text>
            <Text color={theme.colors.muted}> {pct}%</Text>
          </Text>
        )}
      </Box>
    );
  }

  // compact
  return (
    <Text>
      <Text color={theme.colors.muted}>⟨ </Text>
      <Text color={color}>{formatNum(used)}</Text>
      <Text color={theme.colors.muted}> / {formatNum(total)} tokens </Text>
      {showBar && <Text color={color}>{bar}</Text>}
      <Text color={theme.colors.muted}> {pct}%</Text>
      {cost !== undefined && <Text color={theme.colors.muted}> · ${cost.toFixed(2)}</Text>}
      <Text color={theme.colors.muted}> ⟩</Text>
    </Text>
  );
};
