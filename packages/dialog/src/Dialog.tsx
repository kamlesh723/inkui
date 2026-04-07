import React, { useState } from 'react';
import { Box, Text, useInput, useApp, useStdin } from 'ink';
import { borderStyles, darkTheme } from '@inkui-cli/core';
import type { BorderStyle, InkUITheme } from '@inkui-cli/core';

export interface DialogAction {
  label: string;
  value: string;
}

export interface DialogProps {
  /** Controls whether the dialog renders */
  isOpen: boolean;
  /** Bold title line at the top of the dialog */
  title?: string;
  /** Body message */
  message: string;
  /** Action buttons rendered at the bottom */
  actions: DialogAction[];
  /** Called when the user presses Enter on an action */
  onAction: (action: DialogAction) => void;
  /** Called when the user presses Escape */
  onDismiss?: () => void;
  /** Whether the dialog captures keyboard input */
  focus?: boolean;
  /** Border style — defaults to 'rounded' */
  borderStyle?: BorderStyle;
  /** Theme override — defaults to darkTheme */
  theme?: InkUITheme;
}

// ─── shared dialog shell (layout only, no interaction) ───────────────────────

interface DialogShellProps {
  title?: string;
  message: string;
  actions: DialogAction[];
  activeIndex: number;
  isFocused: boolean;
  borderStyle: BorderStyle;
  theme: InkUITheme;
}

const DialogShell: React.FC<DialogShellProps> = ({
  title,
  message,
  actions,
  activeIndex,
  isFocused,
  borderStyle,
  theme,
}) => {
  const b = borderStyles[borderStyle];
  const bc = theme.colors.border;

  // Measure the widest line so the box has a consistent width
  const lines       = message.split('\n');
  const titleLen    = title ? title.length : 0;
  const maxLine     = Math.max(titleLen, ...lines.map((l) => l.length));
  const actionRow   = actions.map((a) => `[ ${a.label} ]`).join('  ');
  const innerWidth  = Math.max(maxLine, actionRow.length, 30);

  const hRule = b.top.repeat(innerWidth + 2); // +2 for single space padding each side

  const topBorder = `${b.topLeft}${hRule}${b.topRight}`;
  const midBorder = `${b.leftT}${hRule}${b.rightT}`;
  const botBorder = `${b.bottomLeft}${hRule}${b.bottomRight}`;

  const padLine = (content: string) => {
    const padded = content.padEnd(innerWidth);
    return (
      <Box key={content}>
        <Text color={bc}>{b.left} </Text>
        <Text>{padded}</Text>
        <Text color={bc}> {b.right}</Text>
      </Box>
    );
  };

  const emptyLine = (
    <Box>
      <Text color={bc}>{b.left}</Text>
      <Text>{' '.repeat(innerWidth + 2)}</Text>
      <Text color={bc}>{b.right}</Text>
    </Box>
  );

  return (
    <Box flexDirection="column">
      {/* Top border */}
      <Text color={bc}>{topBorder}</Text>

      {/* Title */}
      {title ? (
        <>
          <Box>
            <Text color={bc}>{b.left} </Text>
            <Text color={theme.colors.primary} bold>
              {title.padEnd(innerWidth)}
            </Text>
            <Text color={bc}> {b.right}</Text>
          </Box>
          <Text color={bc}>{midBorder}</Text>
        </>
      ) : null}

      {/* Body */}
      {emptyLine}
      {lines.map((line) => padLine(line))}
      {emptyLine}

      {/* Actions separator */}
      <Text color={bc}>{midBorder}</Text>

      {/* Action buttons */}
      <Box>
        <Text color={bc}>{b.left} </Text>
        <Box flexGrow={1} justifyContent="flex-end" gap={2}>
          {actions.map((action, i) => {
            const isActive = i === activeIndex && isFocused;
            return (
              <Text
                key={action.value}
                color={isActive ? theme.colors.focus : theme.colors.muted}
                bold={isActive}
                inverse={isActive}
              >
                {` ${action.label} `}
              </Text>
            );
          })}
        </Box>
        <Text color={bc}> {b.right}</Text>
      </Box>

      {/* Bottom border */}
      <Text color={bc}>{botBorder}</Text>

      {/* Hint */}
      {isFocused ? (
        <Text color={theme.colors.muted}>
          {'  ← → navigate  ·  enter: confirm  ·  esc: dismiss'}
        </Text>
      ) : null}
    </Box>
  );
};

// ─── focused inner ────────────────────────────────────────────────────────────

interface FocusedDialogProps {
  title?: string;
  message: string;
  actions: DialogAction[];
  onAction: (action: DialogAction) => void;
  onDismiss?: () => void;
  borderStyle: BorderStyle;
  theme: InkUITheme;
}

const FocusedDialog: React.FC<FocusedDialogProps> = ({
  title,
  message,
  actions,
  onAction,
  onDismiss,
  borderStyle,
  theme,
}) => {
  const { exit } = useApp();
  const [index, setIndex] = useState(0);

  useInput((input, key) => {
    if (key.ctrl && input === 'c') { exit(); return; }

    if (key.leftArrow) {
      setIndex((i) => Math.max(0, i - 1));
      return;
    }
    if (key.rightArrow) {
      setIndex((i) => Math.min(actions.length - 1, i + 1));
      return;
    }
    if (key.return) {
      const action = actions[index];
      if (action) onAction(action);
      return;
    }
    if (key.escape) {
      onDismiss?.();
      return;
    }
  });

  return (
    <DialogShell
      title={title}
      message={message}
      actions={actions}
      activeIndex={index}
      isFocused
      borderStyle={borderStyle}
      theme={theme}
    />
  );
};

// ─── public component ─────────────────────────────────────────────────────────

export const Dialog: React.FC<DialogProps> = ({
  isOpen,
  title,
  message,
  actions,
  onAction,
  onDismiss,
  focus = true,
  borderStyle = 'rounded',
  theme = darkTheme,
}) => {
  const { isRawModeSupported } = useStdin();

  if (!isOpen) return null;

  const canFocus = focus && isRawModeSupported;

  if (canFocus) {
    return (
      <FocusedDialog
        title={title}
        message={message}
        actions={actions}
        onAction={onAction}
        onDismiss={onDismiss}
        borderStyle={borderStyle}
        theme={theme}
      />
    );
  }

  return (
    <DialogShell
      title={title}
      message={message}
      actions={actions}
      activeIndex={0}
      isFocused={false}
      borderStyle={borderStyle}
      theme={theme}
    />
  );
};
