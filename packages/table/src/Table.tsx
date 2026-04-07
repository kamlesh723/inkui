import React from 'react';
import { Box, Text, useStdout } from 'ink';
import { borderStyles, darkTheme } from '@inkui/core';
import type { BorderStyle, InkUITheme } from '@inkui/core';

export interface TableColumn<T extends Record<string, unknown> = Record<string, unknown>> {
  /** Key into each data row */
  key: keyof T & string;
  /** Column header text */
  header: string;
  /** Text alignment — defaults to left */
  align?: 'left' | 'right' | 'center';
  /** Fixed column width override (inner content width, excluding padding) */
  width?: number;
}

export interface TableProps<T extends Record<string, unknown> = Record<string, unknown>> {
  columns: TableColumn<T>[];
  data: T[];
  /** Border style key from @inkui/core tokens */
  borderStyle?: BorderStyle;
  /** Theme override — defaults to darkTheme */
  theme?: InkUITheme;
}

// ─── helpers ─────────────────────────────────────────────────────────────────

const ELLIPSIS = '…';

function truncate(text: string, maxWidth: number): string {
  if (text.length <= maxWidth) return text;
  return text.slice(0, maxWidth - 1) + ELLIPSIS;
}

function pad(text: string, width: number, align: 'left' | 'right' | 'center'): string {
  if (align === 'right')  return text.padStart(width);
  if (align === 'center') {
    const total = width - text.length;
    const left  = Math.floor(total / 2);
    const right = total - left;
    return ' '.repeat(left) + text + ' '.repeat(right);
  }
  return text.padEnd(width);
}

function cellStr(value: unknown): string {
  if (value === null || value === undefined) return '';
  return String(value);
}

// ─── column width calculation ─────────────────────────────────────────────────

function resolveWidths<T extends Record<string, unknown>>(
  columns: TableColumn<T>[],
  data: T[],
  termWidth: number,
): number[] {
  // Natural width = max of header and all cell values (inner, no padding)
  const natural = columns.map((col) => {
    if (col.width !== undefined) return col.width;
    const headerLen = col.header.length;
    const maxCell   = data.reduce((max, row) => {
      return Math.max(max, cellStr(row[col.key]).length);
    }, 0);
    return Math.max(headerLen, maxCell);
  });

  // Each column occupies: 1 space + content + 1 space + 1 border = width + 3
  // Plus the leading border char: total = 1 + sum(w + 3)
  const overhead = 1 + columns.length * 3; // leading │ + (space + content + space + │) per col
  const totalNatural = natural.reduce((s, w) => s + w, 0) + overhead;

  if (totalNatural <= termWidth) return natural;

  // Distribute available space proportionally among non-fixed columns
  const fixedTotal   = columns.reduce((s, col, i) =>
    col.width !== undefined ? s + natural[i]! : s, 0);
  const fixedOverhead = overhead;
  const available    = Math.max(termWidth - fixedOverhead - fixedTotal, columns.length * 3);
  const flexCount    = columns.filter((c) => c.width === undefined).length;
  const flexBudget   = Math.floor(available / Math.max(flexCount, 1));

  return columns.map((col, i) =>
    col.width !== undefined ? natural[i]! : Math.max(3, flexBudget),
  );
}

// ─── border line builders ─────────────────────────────────────────────────────

function buildBorderLine(
  left: string,
  fill: string,
  join: string,
  right: string,
  widths: number[],
): string {
  return left + widths.map((w) => fill.repeat(w + 2)).join(join) + right;
}

// ─── row renderer ─────────────────────────────────────────────────────────────

interface RowProps {
  cells: string[];
  widths: number[];
  aligns: ('left' | 'right' | 'center')[];
  borderChar: string;
  borderColor: string;
  textColor: string;
  bold?: boolean;
  dimColor?: boolean;
}

const Row: React.FC<RowProps> = ({
  cells,
  widths,
  aligns,
  borderChar,
  borderColor,
  textColor,
  bold = false,
  dimColor = false,
}) => (
  <Box>
    {cells.map((cell, i) => {
      const content = pad(truncate(cell, widths[i]!), widths[i]!, aligns[i]!);
      return (
        <Box key={i}>
          <Text color={borderColor}>{borderChar}</Text>
          <Text> </Text>
          <Text color={textColor} bold={bold} dimColor={dimColor}>
            {content}
          </Text>
          <Text> </Text>
        </Box>
      );
    })}
    <Text color={borderColor}>{borderChar}</Text>
  </Box>
);

// ─── public component ─────────────────────────────────────────────────────────

export function Table<T extends Record<string, unknown> = Record<string, unknown>>({
  columns,
  data,
  borderStyle = 'single',
  theme = darkTheme,
}: TableProps<T>) {
  const { stdout } = useStdout();
  const termWidth = stdout?.columns ?? 80;

  const b       = borderStyles[borderStyle];
  const widths  = resolveWidths(columns, data, termWidth);
  const aligns  = columns.map((c) => c.align ?? 'left');

  const topLine = buildBorderLine(b.topLeft,    b.top, b.topT,    b.topRight,    widths);
  const midLine = buildBorderLine(b.leftT,      b.top, b.cross,   b.rightT,      widths);
  const botLine = buildBorderLine(b.bottomLeft, b.top, b.bottomT, b.bottomRight, widths);

  const headerCells = columns.map((c) => c.header);
  const borderColor = theme.colors.border;
  const textColor   = theme.colors.text;

  return (
    <Box flexDirection="column">
      {/* Top border */}
      <Text color={borderColor}>{topLine}</Text>

      {/* Header */}
      <Row
        cells={headerCells}
        widths={widths}
        aligns={aligns}
        borderChar={b.left}
        borderColor={borderColor}
        textColor={theme.colors.primary}
        bold
      />

      {/* Header/body separator */}
      <Text color={borderColor}>{midLine}</Text>

      {/* Data rows */}
      {data.map((row, ri) => (
        <Row
          key={ri}
          cells={columns.map((c) => cellStr(row[c.key]))}
          widths={widths}
          aligns={aligns}
          borderChar={b.left}
          borderColor={borderColor}
          textColor={textColor}
        />
      ))}

      {/* Bottom border */}
      <Text color={borderColor}>{botLine}</Text>
    </Box>
  );
}
