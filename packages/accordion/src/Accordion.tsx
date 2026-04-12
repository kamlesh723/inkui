import React, { useState } from 'react';
import { Box, Text, useInput } from 'ink';
import { darkTheme } from '@inkui-cli/core';
import type { InkUITheme } from '@inkui-cli/core';

export interface AccordionItem {
  key: string;
  title: string;
  content: React.ReactNode;
  disabled?: boolean;
  defaultOpen?: boolean;
}

export interface AccordionProps {
  items: AccordionItem[];
  multiple?: boolean;
  borderStyle?: 'single' | 'rounded' | 'none';
  focus?: boolean;
  theme?: InkUITheme;
}

export const Accordion: React.FC<AccordionProps> = ({
  items,
  multiple = false,
  borderStyle = 'none',
  focus = true,
  theme = darkTheme,
}) => {
  const [openKeys, setOpenKeys] = useState<Set<string>>(
    new Set(items.filter((i) => i.defaultOpen && !i.disabled).map((i) => i.key))
  );
  const [focusedIndex, setFocusedIndex] = useState(0);

  const enabledIndices = items
    .map((item, i) => ({ item, i }))
    .filter(({ item }) => !item.disabled)
    .map(({ i }) => i);

  useInput(
    (input, key) => {
      if (key.upArrow || input === 'k') {
        setFocusedIndex((prev) => {
          const idx = enabledIndices.indexOf(prev);
          return enabledIndices[Math.max(0, idx - 1)] ?? prev;
        });
      } else if (key.downArrow || input === 'j') {
        setFocusedIndex((prev) => {
          const idx = enabledIndices.indexOf(prev);
          return enabledIndices[Math.min(enabledIndices.length - 1, idx + 1)] ?? prev;
        });
      } else if (key.return || input === ' ') {
        const item = items[focusedIndex];
        if (!item || item.disabled) return;
        setOpenKeys((prev) => {
          const next = new Set(prev);
          if (next.has(item.key)) {
            next.delete(item.key);
          } else {
            if (!multiple) next.clear();
            next.add(item.key);
          }
          return next;
        });
      } else if (input === 'g') {
        setFocusedIndex(enabledIndices[0] ?? 0);
      } else if (input === 'G') {
        setFocusedIndex(enabledIndices[enabledIndices.length - 1] ?? 0);
      }
    },
    { isActive: focus }
  );

  return (
    <Box flexDirection="column">
      {items.map((item, i) => {
        const isOpen = openKeys.has(item.key);
        const isFocused = i === focusedIndex && focus;
        const isDisabled = item.disabled;

        return (
          <Box key={item.key} flexDirection="column">
            <Box
              borderStyle={borderStyle !== 'none' ? (borderStyle === 'rounded' ? 'round' : borderStyle) as 'single' : undefined}
              borderColor={isFocused ? theme.colors.focus : theme.colors.border}
            >
              <Text
                bold={isFocused}
                color={isDisabled ? theme.colors.muted : isFocused ? theme.colors.text : theme.colors.text}
                dimColor={isDisabled}
              >
                <Text color={isOpen ? theme.colors.primary : theme.colors.muted}>
                  {isOpen ? '▾' : '▸'}
                </Text>
                {' '}{item.title}
              </Text>
            </Box>
            {isOpen && (
              <Box flexDirection="column" marginLeft={1}>
                {React.Children.toArray(
                  typeof item.content === 'string'
                    ? [<Text key="c">{item.content}</Text>]
                    : [item.content]
                ).map((child, ci) => (
                  <Box key={ci} flexDirection="row">
                    <Text color={theme.colors.border}>{'│ '}</Text>
                    {child}
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        );
      })}
    </Box>
  );
};
