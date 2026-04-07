import React from 'react';
import { Text, Box } from 'ink';
import { darkTheme } from '@inkui-cli/core';
import type { InkUITheme } from '@inkui-cli/core';

export type BadgeVariant = 'default' | 'success' | 'warning' | 'error' | 'info';

export interface BadgeProps {
  /** Badge label text */
  children: string;
  /** Visual style — maps to theme colors */
  variant?: BadgeVariant;
  /** Theme override — defaults to darkTheme */
  theme?: InkUITheme;
}

function variantColor(variant: BadgeVariant, theme: InkUITheme): string {
  switch (variant) {
    case 'success': return theme.colors.success;
    case 'warning': return theme.colors.warning;
    case 'error':   return theme.colors.error;
    case 'info':    return theme.colors.info;
    default:        return theme.colors.muted;
  }
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  theme = darkTheme,
}) => {
  const color = variantColor(variant, theme);
  return (
    <Box>
      <Text color={color} bold inverse>{` ${children} `}</Text>
    </Box>
  );
};
