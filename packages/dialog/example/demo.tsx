import React, { useState } from 'react';
import { render, Box, Text } from 'ink';
import { Dialog } from '../src/index.js';
import type { DialogAction } from '../src/index.js';
import { darkTheme, lightTheme } from '@inkui/core';

const confirmActions: DialogAction[] = [
  { label: 'Cancel',  value: 'cancel'  },
  { label: 'Confirm', value: 'confirm' },
];

const deleteActions: DialogAction[] = [
  { label: 'Keep',   value: 'keep'   },
  { label: 'Delete', value: 'delete' },
];

const Demo = () => {
  const [result, setResult] = useState<string | null>(null);

  return (
    <Box flexDirection="column" gap={1}>
      <Text bold>@inkui/dialog — live demo</Text>

      {/* rounded border, dark theme, focused */}
      <Box flexDirection="column">
        <Text dimColor>── rounded · dark theme · focused ──────────────</Text>
        <Box marginTop={1}>
          <Dialog
            isOpen
            title="Deploy to production?"
            message={'This will push changes to prod.\nAll users will be affected.'}
            actions={confirmActions}
            onAction={(a) => setResult(`confirmed: ${a.value}`)}
            onDismiss={() => setResult('dismissed')}
            borderStyle="rounded"
            theme={darkTheme}
          />
        </Box>
      </Box>

      {/* double border, dark theme, unfocused */}
      <Box flexDirection="column">
        <Text dimColor>── double · dark theme · unfocused ─────────────</Text>
        <Box marginTop={1}>
          <Dialog
            isOpen
            title="Delete project?"
            message="This action cannot be undone."
            actions={deleteActions}
            onAction={() => {}}
            focus={false}
            borderStyle="double"
            theme={darkTheme}
          />
        </Box>
      </Box>

      {/* bold border, light theme, no title */}
      <Box flexDirection="column">
        <Text dimColor>── bold · light theme · no title ────────────────</Text>
        <Box marginTop={1}>
          <Dialog
            isOpen
            message="Are you sure you want to log out?"
            actions={[
              { label: 'No',  value: 'no'  },
              { label: 'Yes', value: 'yes' },
            ]}
            onAction={() => {}}
            focus={false}
            borderStyle="bold"
            theme={lightTheme}
          />
        </Box>
      </Box>

      {/* isOpen=false renders nothing */}
      <Dialog
        isOpen={false}
        message="You should never see this"
        actions={[{ label: 'OK', value: 'ok' }]}
        onAction={() => {}}
      />

      {result ? (
        <Text color="green">✔ Action — {result}</Text>
      ) : null}
    </Box>
  );
};

render(<Demo />);

setTimeout(() => process.exit(0), 3000);
