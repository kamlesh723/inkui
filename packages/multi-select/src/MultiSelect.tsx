import React, { useState } from 'react';
import { Box, Text, useInput, useApp, useStdin } from 'ink';
import { darkTheme } from '@inkui/core';
import type { InkUITheme } from '@inkui/core';

export interface MultiSelectItem<T = string> {
  label: string;
  value: T;
  disabled?: boolean;
}

export interface MultiSelectProps<T = string> {
  /** List of options */
  items: MultiSelectItem<T>[];
  /** Called when the user presses Enter — receives all selected items */
  onSubmit: (selected: MultiSelectItem<T>[]) => void;
  /** Values selected by default */
  defaultSelected?: T[];
  /** Whether this component captures keyboard input */
  focus?: boolean;
  /** Theme override — defaults to darkTheme */
  theme?: InkUITheme;
}

// ─── shared list display ─────────────────────────────────────────────────────

interface ListDisplayProps<T> {
  items: MultiSelectItem<T>[];
  activeIndex: number;
  selected: Set<string>;
  isFocused: boolean;
  theme: InkUITheme;
}

function ListDisplay<T>({
  items,
  activeIndex,
  selected,
  isFocused,
  theme,
}: ListDisplayProps<T>) {
  return (
    <Box flexDirection="column">
      {items.map((item, i) => {
        const key        = String(item.value);
        const isActive   = i === activeIndex;
        const isChecked  = selected.has(key);
        const isDisabled = item.disabled === true;

        const checkbox = isChecked ? '◉' : '◯';
        const checkColor = isDisabled
          ? theme.colors.muted
          : isChecked
          ? theme.colors.success
          : theme.colors.muted;

        const labelColor = isDisabled
          ? theme.colors.muted
          : isActive && isFocused
          ? theme.colors.focus
          : theme.colors.text;

        const indicator = isActive && isFocused ? '❯ ' : '  ';

        return (
          <Box key={key}>
            <Text color={isActive && isFocused ? theme.colors.focus : theme.colors.muted}>
              {indicator}
            </Text>
            <Text color={checkColor}>{checkbox} </Text>
            <Text color={labelColor} dimColor={isDisabled}>
              {item.label}
            </Text>
            {isDisabled ? (
              <Text color={theme.colors.muted}>{' (disabled)'}</Text>
            ) : null}
          </Box>
        );
      })}
      {isFocused ? (
        <Box marginTop={1}>
          <Text color={theme.colors.muted}>
            {'space: toggle  ·  enter: confirm'}
          </Text>
        </Box>
      ) : null}
    </Box>
  );
}

// ─── focused inner ────────────────────────────────────────────────────────────

interface FocusedMultiSelectProps<T> {
  items: MultiSelectItem<T>[];
  onSubmit: (selected: MultiSelectItem<T>[]) => void;
  defaultSelected: T[];
  theme: InkUITheme;
}

function FocusedMultiSelect<T>({
  items,
  onSubmit,
  defaultSelected,
  theme,
}: FocusedMultiSelectProps<T>) {
  const { exit } = useApp();

  const toKey = (v: T) => String(v);

  const firstEnabled = Math.max(0, items.findIndex((it) => !it.disabled));
  const [index, setIndex]   = useState(firstEnabled);
  const [selected, setSelected] = useState<Set<string>>(
    () => new Set(defaultSelected.map(toKey)),
  );

  const move = (dir: 1 | -1) => {
    setIndex((prev) => {
      let next = prev + dir;
      for (let i = 0; i < items.length; i++) {
        const wrapped = ((next % items.length) + items.length) % items.length;
        if (!items[wrapped]!.disabled) return wrapped;
        next += dir;
      }
      return prev;
    });
  };

  const toggle = () => {
    const item = items[index];
    if (!item || item.disabled) return;
    const key = toKey(item.value);
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  useInput((input, key) => {
    if (key.ctrl && input === 'c') { exit(); return; }
    if (key.upArrow)   { move(-1); return; }
    if (key.downArrow) { move(1);  return; }
    if (input === ' ')  { toggle(); return; }
    if (key.return) {
      const result = items.filter((it) => selected.has(toKey(it.value)));
      onSubmit(result);
      return;
    }
  });

  return (
    <ListDisplay
      items={items}
      activeIndex={index}
      selected={selected}
      isFocused
      theme={theme}
    />
  );
}

// ─── public component ─────────────────────────────────────────────────────────

export function MultiSelect<T = string>({
  items,
  onSubmit,
  defaultSelected = [],
  focus = true,
  theme = darkTheme,
}: MultiSelectProps<T>) {
  const { isRawModeSupported } = useStdin();
  const canFocus = focus && isRawModeSupported;

  if (canFocus) {
    return (
      <FocusedMultiSelect
        items={items}
        onSubmit={onSubmit}
        defaultSelected={defaultSelected}
        theme={theme}
      />
    );
  }

  const firstEnabled = Math.max(0, items.findIndex((it) => !it.disabled));
  const preSelected = new Set(defaultSelected.map(String));
  return (
    <ListDisplay
      items={items}
      activeIndex={firstEnabled}
      selected={preSelected}
      isFocused={false}
      theme={theme}
    />
  );
}
