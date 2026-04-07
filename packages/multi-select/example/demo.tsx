import React, { useState } from 'react';
import { render, Box, Text } from 'ink';
import { MultiSelect } from '../src/index.js';
import type { MultiSelectItem } from '../src/index.js';
import { darkTheme, lightTheme } from '@inkui/core';

type Feature = 'ts' | 'eslint' | 'prettier' | 'vitest' | 'husky' | 'ci';

const features: MultiSelectItem<Feature>[] = [
  { label: 'TypeScript',  value: 'ts' },
  { label: 'ESLint',      value: 'eslint' },
  { label: 'Prettier',    value: 'prettier' },
  { label: 'Vitest',      value: 'vitest' },
  { label: 'Husky hooks', value: 'husky', disabled: true },
  { label: 'CI / GitHub Actions', value: 'ci' },
];

const roles: MultiSelectItem<string>[] = [
  { label: 'Read',    value: 'read' },
  { label: 'Write',   value: 'write' },
  { label: 'Delete',  value: 'delete', disabled: true },
  { label: 'Admin',   value: 'admin' },
];

const Demo = () => {
  const [submitted, setSubmitted] = useState<string | null>(null);

  return (
    <Box flexDirection="column" gap={1}>
      <Text bold>@inkui/multi-select — live demo</Text>

      <Box flexDirection="column">
        <Text dimColor>── dark theme · generic MultiSelect{'<Feature>'} ─</Text>
        <Box marginTop={1}>
          <MultiSelect
            items={features}
            defaultSelected={['ts', 'eslint']}
            onSubmit={(sel) =>
              setSubmitted(sel.map((s) => s.value).join(', '))
            }
            theme={darkTheme}
          />
        </Box>
      </Box>

      <Box flexDirection="column">
        <Text dimColor>── light theme · unfocused · pre-selected ────────</Text>
        <Box marginTop={1}>
          <MultiSelect
            items={roles}
            defaultSelected={['read', 'write']}
            onSubmit={() => {}}
            focus={false}
            theme={lightTheme}
          />
        </Box>
      </Box>

      {submitted ? (
        <Text color="green">✔ Submitted — {submitted}</Text>
      ) : null}
    </Box>
  );
};

render(<Demo />);

setTimeout(() => process.exit(0), 3000);
