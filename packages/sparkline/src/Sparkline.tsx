import React from 'react';
import { Box, Text } from 'ink';
import { darkTheme } from '@inkui-cli/core';
import type { InkUITheme } from '@inkui-cli/core';

const BLOCKS = ['▁', '▂', '▃', '▄', '▅', '▆', '▇', '█'];

export interface SparklineProps {
  data: number[];
  width?: number;
  height?: number;
  label?: string;
  showRange?: boolean;
  showLatest?: boolean;
  color?: string;
  theme?: InkUITheme;
}

export const Sparkline: React.FC<SparklineProps> = ({
  data,
  width = 20,
  height = 1,
  label,
  showRange = false,
  showLatest = true,
  color,
  theme = darkTheme,
}) => {
  if (!data || data.length === 0) {
    return <Text color={theme.colors.muted}>{label ?? ''} (no data)</Text>;
  }

  const barColor = color ?? theme.colors.primary;
  const minVal = Math.min(...data);
  const maxVal = Math.max(...data);
  const range = maxVal - minVal || 1;

  // Downsample or use as-is
  let points: number[];
  if (data.length > width) {
    const step = data.length / width;
    points = Array.from({ length: width }, (_, i) => {
      const start = Math.floor(i * step);
      const end = Math.floor((i + 1) * step);
      const slice = data.slice(start, end);
      return slice.reduce((a, b) => a + b, 0) / slice.length;
    });
  } else if (data.length < width) {
    points = [...data, ...Array(width - data.length).fill(data[data.length - 1])];
  } else {
    points = data;
  }

  const chars = points.map((v) => {
    const normalized = (v - minVal) / range;
    const idx = Math.min(7, Math.round(normalized * 7));
    return BLOCKS[idx];
  });

  const sparkStr = chars.join('');

  return (
    <Box flexDirection="row" gap={1}>
      {label && <Text color={theme.colors.muted}>{label}</Text>}
      <Text color={barColor}>{sparkStr}</Text>
      {showLatest && <Text color={barColor}>{Math.round(data[data.length - 1])}</Text>}
      {showRange && (
        <Text color={theme.colors.muted} dimColor>
          (min: {Math.round(minVal)} max: {Math.round(maxVal)})
        </Text>
      )}
    </Box>
  );
};
