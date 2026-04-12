import React from 'react';
import { Box, Text } from 'ink';
import { darkTheme } from '@inkui-cli/core';
import type { InkUITheme } from '@inkui-cli/core';

export interface GaugeProps {
  value: number;
  min?: number;
  max?: number;
  label?: string;
  unit?: string;
  variant?: 'arc' | 'bar' | 'ring';
  colorStops?: [number, string][];
  width?: number;
  showValue?: boolean;
  theme?: InkUITheme;
}

export const Gauge: React.FC<GaugeProps> = ({
  value,
  min = 0,
  max = 100,
  label,
  unit = '%',
  variant = 'bar',
  colorStops,
  width = 20,
  showValue = true,
  theme = darkTheme,
}) => {
  const pct = Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100));

  const defaultStops: [number, string][] = [
    [0, theme.colors.success],
    [60, theme.colors.warning],
    [80, theme.colors.error],
  ];
  const stops = colorStops ?? defaultStops;
  let color = stops[0][1];
  for (const [threshold, c] of stops) {
    if (pct >= threshold) color = c;
  }

  const displayValue = `${Math.round(value)}${unit}`;

  if (variant === 'bar') {
    const filled = Math.round((pct / 100) * width);
    const bar = '█'.repeat(filled) + '░'.repeat(width - filled);
    return (
      <Box flexDirection="row" gap={1}>
        {label && <Text color={theme.colors.muted}>{label}</Text>}
        <Text color={color}>{bar}</Text>
        {showValue && <Text color={color}>{displayValue}</Text>}
      </Box>
    );
  }

  if (variant === 'ring') {
    const ringWidth = Math.floor(width / 2);
    const topFilled = Math.round((pct / 100) * ringWidth);
    const topBar = '█'.repeat(topFilled) + '░'.repeat(ringWidth - topFilled);
    const botBar = '█'.repeat(topFilled) + '░'.repeat(ringWidth - topFilled);

    return (
      <Box flexDirection="column" alignItems="center">
        <Text color={color}>{'◜'}{topBar}{'◝'}</Text>
        <Text color={theme.colors.muted}>{'█'}{' '.repeat(ringWidth)}{' █'}</Text>
        <Text color={theme.colors.muted}>{'█'} <Text color={color}>{displayValue.padStart(ringWidth - 1)}</Text>{' █'}</Text>
        <Text color={theme.colors.muted}>{'█'}{' '.repeat(ringWidth)}{' █'}</Text>
        <Text color={color}>{'◟'}{botBar}{'◞'}</Text>
        {label && <Text color={theme.colors.muted} dimColor>{label}</Text>}
      </Box>
    );
  }

  // arc variant
  const arcWidth = Math.max(10, width);
  const filled = Math.round((pct / 100) * arcWidth);
  const arcBar = '█'.repeat(filled) + '░'.repeat(arcWidth - filled);

  return (
    <Box flexDirection="column" alignItems="center">
      <Text color={theme.colors.border}>{'  ╭' + '─'.repeat(arcWidth) + '╮'}</Text>
      <Text color={theme.colors.border}>{' ╱'}{' '.repeat(arcWidth + 2)}{'╲'}</Text>
      <Text color={theme.colors.border}>{'╱  '}<Text color={color}>{arcBar}</Text>{'  ╲'}</Text>
      <Text color={theme.colors.border}>{'│'}{' '.repeat(Math.floor(arcWidth / 2))}<Text color={color}>{displayValue}</Text>{' '.repeat(Math.ceil(arcWidth / 2))}{'│'}</Text>
      <Text color={theme.colors.border}>{'╲'}{' '.repeat(arcWidth + 2)}{'╱'}</Text>
      <Text color={theme.colors.border}>{'  ╰' + '─'.repeat(arcWidth) + '╯'}</Text>
      {label && <Text color={theme.colors.muted} dimColor>{'   '}{label}</Text>}
    </Box>
  );
};
