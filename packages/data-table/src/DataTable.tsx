import React, { useState } from 'react';
import { Box, Text, useInput } from 'ink';
import { darkTheme } from '@inkui-cli/core';
import type { InkUITheme } from '@inkui-cli/core';

export interface DataTableColumn<T> {
  key: keyof T & string;
  header: string;
  align?: 'left' | 'center' | 'right';
  sortable?: boolean;
  render?: (value: unknown, row: T) => string;
  width?: number;
}

export interface DataTableProps<T> {
  columns: DataTableColumn<T>[];
  data: T[];
  pageSize?: number;
  searchable?: boolean;
  searchPlaceholder?: string;
  onSelect?: (row: T, index: number) => void;
  selectable?: boolean;
  borderStyle?: 'single' | 'double' | 'rounded' | 'bold' | 'classic';
  showFooter?: boolean;
  emptyMessage?: string;
  focus?: boolean;
  theme?: InkUITheme;
}

export function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  pageSize = 10,
  searchable = true,
  searchPlaceholder = 'Filter...',
  onSelect,
  selectable = true,
  borderStyle = 'single',
  showFooter = true,
  emptyMessage = 'No data',
  focus = true,
  theme = darkTheme,
}: DataTableProps<T>): React.ReactElement {
  const [selectedRow, setSelectedRow] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchMode, setSearchMode] = useState(false);

  // Filter
  const filtered = data.filter((row) => {
    if (!searchQuery) return true;
    return columns.some((col) => {
      const val = row[col.key];
      return String(val).toLowerCase().includes(searchQuery.toLowerCase());
    });
  });

  // Sort
  const sorted = sortColumn
    ? [...filtered].sort((a, b) => {
        const av = String(a[sortColumn] ?? '');
        const bv = String(b[sortColumn] ?? '');
        return sortDirection === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av);
      })
    : filtered;

  const totalPages = Math.ceil(sorted.length / pageSize);
  const pageData = sorted.slice(currentPage * pageSize, (currentPage + 1) * pageSize);

  useInput(
    (input, key) => {
      if (searchMode) {
        if (key.escape) { setSearchMode(false); setSearchQuery(''); return; }
        if (key.return) { setSearchMode(false); return; }
        if (key.backspace || key.delete) { setSearchQuery((q) => q.slice(0, -1)); return; }
        if (input && input.length === 1 && !key.ctrl) setSearchQuery((q) => q + input);
        return;
      }

      if (key.upArrow) setSelectedRow((r) => Math.max(0, r - 1));
      else if (key.downArrow) setSelectedRow((r) => Math.min(pageData.length - 1, r + 1));
      else if (key.leftArrow) setCurrentPage((p) => Math.max(0, p - 1));
      else if (key.rightArrow) setCurrentPage((p) => Math.min(totalPages - 1, p + 1));
      else if (input === '/') setSearchMode(true);
      else if (input === 's') {
        const col = columns.find((c) => c.sortable);
        if (col) {
          if (sortColumn === col.key) setSortDirection((d) => (d === 'asc' ? 'desc' : 'asc'));
          else { setSortColumn(col.key); setSortDirection('asc'); }
        }
      } else if (key.return) {
        const row = pageData[selectedRow];
        if (row) onSelect?.(row, currentPage * pageSize + selectedRow);
      } else if (input === 'g') setSelectedRow(0);
      else if (input === 'G') setSelectedRow(pageData.length - 1);
    },
    { isActive: focus }
  );

  // Column widths
  const colWidths = columns.map((col) => {
    if (col.width) return col.width;
    const maxData = pageData.reduce((max, row) => {
      const val = col.render ? col.render(row[col.key], row) : String(row[col.key] ?? '');
      return Math.max(max, val.length);
    }, 0);
    return Math.max(col.header.length + 2, maxData + 2, 6);
  });

  const pad = (s: string, w: number, align: 'left' | 'center' | 'right' = 'left') => {
    if (s.length >= w) return s.slice(0, w);
    const extra = w - s.length;
    if (align === 'right') return ' '.repeat(extra) + s;
    if (align === 'center') return ' '.repeat(Math.floor(extra / 2)) + s + ' '.repeat(Math.ceil(extra / 2));
    return s + ' '.repeat(extra);
  };

  const bord = borderStyle === 'rounded' ? 'round' : borderStyle === 'bold' ? 'bold' : 'single';

  return (
    <Box flexDirection="column">
      {/* Search bar */}
      {searchable && (
        <Box marginBottom={0}>
          <Text color={theme.colors.muted}>
            {searchMode ? (
              <Text>
                <Text color={theme.colors.primary}>/ Filter: </Text>
                <Text color={theme.colors.text}>{searchQuery}</Text>
                <Text color={theme.colors.primary}>█</Text>
              </Text>
            ) : searchQuery ? (
              <Text color={theme.colors.muted}>/ Filter: {searchQuery}</Text>
            ) : null}
          </Text>
        </Box>
      )}

      {/* Table */}
      <Box flexDirection="column" borderStyle={bord as 'single'} borderColor={theme.colors.border}>
        {/* Header */}
        <Box flexDirection="row">
          {selectable && <Text color={theme.colors.muted}>{'  '}</Text>}
          {columns.map((col, i) => {
            const sortArrow =
              sortColumn === col.key ? (sortDirection === 'asc' ? ' ▲' : ' ▼') : '';
            return (
              <Box key={col.key} width={colWidths[i]}>
                <Text bold color={theme.colors.primary}>
                  {pad(col.header + sortArrow, colWidths[i], col.align)}
                </Text>
              </Box>
            );
          })}
        </Box>

        {/* Divider */}
        <Box flexDirection="row">
          <Text color={theme.colors.border}>
            {'─'.repeat(colWidths.reduce((a, b) => a + b, 0) + (selectable ? 2 : 0))}
          </Text>
        </Box>

        {/* Rows */}
        {pageData.length === 0 ? (
          <Box paddingX={1}>
            <Text color={theme.colors.muted}>{emptyMessage}</Text>
          </Box>
        ) : (
          pageData.map((row, i) => {
            const isSelected = i === selectedRow && selectable;
            return (
              <Box key={i} flexDirection="row">
                {selectable && (
                  <Text color={isSelected ? theme.colors.primary : theme.colors.muted}>
                    {isSelected ? '❯ ' : '  '}
                  </Text>
                )}
                {columns.map((col, ci) => {
                  const val = col.render
                    ? col.render(row[col.key], row)
                    : String(row[col.key] ?? '');
                  return (
                    <Box key={col.key} width={colWidths[ci]}>
                      <Text
                        color={isSelected ? theme.colors.text : theme.colors.muted}
                        bold={isSelected}
                      >
                        {pad(val, colWidths[ci], col.align)}
                      </Text>
                    </Box>
                  );
                })}
              </Box>
            );
          })
        )}
      </Box>

      {/* Footer */}
      {showFooter && (
        <Box marginTop={0}>
          <Text color={theme.colors.muted} dimColor>
            Showing {currentPage * pageSize + 1}-{Math.min((currentPage + 1) * pageSize, sorted.length)} of {sorted.length} · Page {currentPage + 1}/{totalPages || 1}
            {' · '}[←→] Page [/] Search [s] Sort
          </Text>
        </Box>
      )}
    </Box>
  );
}
