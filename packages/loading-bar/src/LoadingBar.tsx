import React, { useState, useEffect } from 'react';
import { Text, Box, useStdout } from 'ink';
import { darkTheme } from '@inkui-cli/core';
import type { InkUITheme } from '@inkui-cli/core';

export interface LoadingBarProps {
  /** 0–100 for determinate mode. Omit for indeterminate (bouncing). */
  value?: number;
  /** Bar width in chars. Defaults to terminal width. */
  width?: number;
  /** Override bar color. Defaults to theme primary. */
  color?: string;
  theme?: InkUITheme;
}

const FILLED = '━';
const EMPTY  = '░';
const SEGMENT = 8; // width of the bouncing block in indeterminate mode

export const LoadingBar: React.FC<LoadingBarProps> = ({
  value,
  width,
  color,
  theme = darkTheme,
}) => {
  const { stdout } = useStdout();
  const totalWidth = width ?? (stdout?.columns ?? 80);
  const barColor = color ?? theme.colors.primary;
  const isDeterminate = value !== undefined;

  const [pos, setPos]  = useState(0);
  const [dir, setDir]  = useState(1);

  useEffect(() => {
    if (isDeterminate) return;
    const t = setInterval(() => {
      setPos((p) => {
        const next = p + dir;
        if (next + SEGMENT >= totalWidth) setDir(-1);
        if (next <= 0) setDir(1);
        return Math.max(0, Math.min(next, totalWidth - SEGMENT));
      });
    }, 40);
    return () => clearInterval(t);
  }, [isDeterminate, totalWidth, dir]);

  let bar: string;

  if (isDeterminate) {
    const filled = Math.round((Math.min(100, Math.max(0, value!)) / 100) * totalWidth);
    bar = FILLED.repeat(filled) + EMPTY.repeat(totalWidth - filled);
  } else {
    const pre  = EMPTY.repeat(pos);
    const seg  = FILLED.repeat(SEGMENT);
    const post = EMPTY.repeat(Math.max(0, totalWidth - pos - SEGMENT));
    bar = pre + seg + post;
  }

  return (
    <Box>
      <Text color={barColor}>{bar}</Text>
    </Box>
  );
};
