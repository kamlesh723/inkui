import React, { useState } from 'react';
import { Box, Text, useInput, useApp, useStdin } from 'ink';
import { darkTheme } from '@inkui/core';
import type { InkUITheme } from '@inkui/core';

export interface TextInputProps {
  /** Controlled value */
  value: string;
  /** Called on every keystroke with the new value */
  onChange: (value: string) => void;
  /** Called when Enter is pressed */
  onSubmit?: (value: string) => void;
  /** Shown when value is empty */
  placeholder?: string;
  /** Mask input characters as * */
  password?: boolean;
  /** Whether this input captures keyboard input */
  focus?: boolean;
  /** Optional label rendered to the left */
  label?: string;
  /** Theme override — defaults to darkTheme */
  theme?: InkUITheme;
}

// ─── shared display ──────────────────────────────────────────────────────────

interface DisplayProps {
  value: string;
  placeholder: string;
  password: boolean;
  isFocused: boolean;
  cursor: number;
  theme: InkUITheme;
}

const InputDisplay: React.FC<DisplayProps> = ({
  value,
  placeholder,
  password,
  isFocused,
  cursor,
  theme,
}) => {
  const display = password ? '*'.repeat(value.length) : value;
  const isEmpty = value.length === 0;

  const cursorBlock = (char: string) => (
    <Text key="cursor" color={theme.colors.focus} inverse>
      {char}
    </Text>
  );

  if (!isFocused) {
    return isEmpty ? (
      <Text color={theme.colors.muted}>{placeholder}</Text>
    ) : (
      <Text>{display}</Text>
    );
  }

  if (isEmpty) {
    if (placeholder.length === 0) return cursorBlock(' ');
    return (
      <Box>
        {cursorBlock(placeholder[0]!)}
        <Text key="rest" color={theme.colors.muted}>{placeholder.slice(1)}</Text>
      </Box>
    );
  }

  const before = display.slice(0, cursor);
  const at     = display[cursor] ?? ' ';
  const after  = display.slice(cursor + 1);

  return (
    <Box>
      {before ? <Text key="before">{before}</Text> : null}
      {cursorBlock(at)}
      {after  ? <Text key="after">{after}</Text>   : null}
    </Box>
  );
};

// ─── focused inner (mounts only when raw mode is available) ──────────────────

interface FocusedInputProps extends TextInputProps {
  theme: InkUITheme;
}

const FocusedInput: React.FC<FocusedInputProps> = ({
  value,
  onChange,
  onSubmit,
  placeholder = '',
  password = false,
  theme,
}) => {
  const { exit } = useApp();
  const [cursor, setCursor] = useState(value.length);

  useInput((input, key) => {
    if (key.ctrl && input === 'c') { exit(); return; }

    if (key.leftArrow)  { setCursor((c) => Math.max(0, c - 1));               return; }
    if (key.rightArrow) { setCursor((c) => Math.min(value.length, c + 1));    return; }

    if (key.backspace || key.delete) {
      if (cursor === 0) return;
      onChange(value.slice(0, cursor - 1) + value.slice(cursor));
      setCursor((c) => c - 1);
      return;
    }

    if (key.return) { onSubmit?.(value); return; }
    if (key.ctrl || key.meta || key.escape) return;

    onChange(value.slice(0, cursor) + input + value.slice(cursor));
    setCursor((c) => c + input.length);
  });

  return (
    <InputDisplay
      value={value}
      placeholder={placeholder}
      password={password}
      isFocused
      cursor={cursor}
      theme={theme}
    />
  );
};

// ─── public component ─────────────────────────────────────────────────────────

export const TextInput: React.FC<TextInputProps> = ({
  value,
  onChange,
  onSubmit,
  placeholder = '',
  password = false,
  focus = true,
  label,
  theme = darkTheme,
}) => {
  const { isRawModeSupported } = useStdin();
  const canFocus = focus && isRawModeSupported;

  return (
    <Box>
      {label ? <Text color={theme.colors.muted}>{label} </Text> : null}
      <Text color={theme.colors.border}>{'❯ '}</Text>
      {canFocus ? (
        <FocusedInput
          value={value}
          onChange={onChange}
          onSubmit={onSubmit}
          placeholder={placeholder}
          password={password}
          focus={focus}
          theme={theme}
        />
      ) : (
        <InputDisplay
          value={value}
          placeholder={placeholder}
          password={password}
          isFocused={false}
          cursor={value.length}
          theme={theme}
        />
      )}
    </Box>
  );
};
