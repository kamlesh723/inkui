import React, { useEffect, useState } from 'react';
import { Box, Text, useStdout } from 'ink';
import stringWidth from 'string-width';
import { borderStyles, darkTheme } from '@inkui-cli/core';
import type { BorderStyle, InkUITheme } from '@inkui-cli/core';

// Map our BorderStyle names → Ink/cli-boxes names
// ('rounded' → 'round', 'ascii' → 'classic', others match directly)
const INK_BORDER_MAP: Record<BorderStyle, string> = {
  single: 'single',
  double: 'double',
  rounded: 'round',
  bold: 'bold',
  ascii: 'classic',
};

export interface PanelProps {
  title?: string;
  children?: React.ReactNode;
  borderStyle?: BorderStyle;
  /** Fixed column width (includes borders). 'auto' = fill terminal width. */
  width?: number | 'auto';
  /** Inner horizontal padding on each side, default 1 */
  padding?: number;
  borderColor?: string;
  titleColor?: string;
  theme?: InkUITheme;
}

function repeat(char: string, n: number): string {
  return n <= 0 ? '' : char.repeat(n);
}

export function Panel({
  title,
  children,
  borderStyle = 'rounded',
  width = 'auto',
  padding = 1,
  borderColor,
  titleColor: _titleColor,
  theme = darkTheme,
}: PanelProps) {
  const { stdout } = useStdout();

  // Track terminal width for auto-sizing
  const [termCols, setTermCols] = useState(stdout?.columns ?? 80);
  useEffect(() => {
    if (!stdout) return;
    const handler = () => setTermCols(stdout.columns ?? 80);
    stdout.on('resize', handler);
    return () => { stdout.off('resize', handler); };
  }, [stdout]);

  const chars = borderStyles[borderStyle];
  const bc = borderColor ?? theme.colors.border;

  // Total panel width (includes the 2 border chars on each side)
  const totalWidth: number = width === 'auto' ? termCols : (width as number);
  // Inner width = space between left and right border chars
  const innerWidth = Math.max(4, totalWidth - 2);

  // ── Build the custom top border line with optional embedded title ──
  let topLine: string;
  if (title) {
    // Max visible title length: innerWidth - "─ " - " ─" = innerWidth - 4
    const maxTitleLen = Math.max(0, innerWidth - 4);
    const raw = stringWidth(title) > maxTitleLen
      ? title.slice(0, Math.max(0, maxTitleLen - 1)) + '…'
      : title;
    // titleCell = " Title "
    const titleCell = ' ' + raw + ' ';
    const leading = 1; // one '─' before the title
    const remaining = innerWidth - leading - stringWidth(titleCell);
    topLine =
      chars.topLeft +
      repeat(chars.top, leading) +
      titleCell +
      repeat(chars.top, Math.max(0, remaining)) +
      chars.topRight;
  } else {
    topLine =
      chars.topLeft +
      repeat(chars.top, innerWidth) +
      chars.topRight;
  }

  return (
    <Box flexDirection="column" width={totalWidth}>
      {/* Custom top border with optional title */}
      <Text color={bc}>{topLine}</Text>

      {/*
        Native Ink Box with borderStyle for left, right, bottom.
        borderTop={false} removes the top line — our custom line above handles it.
        The corner chars from Ink's bottom border (╰ and ╯ for rounded) naturally
        connect to our top line since we used the same borderStyle chars.
      */}
      <Box
        borderStyle={INK_BORDER_MAP[borderStyle] as 'single'}
        borderTop={false}
        borderColor={bc}
        paddingX={padding}
        flexDirection="column"
        width={totalWidth}
      >
        {children}
      </Box>
    </Box>
  );
}
