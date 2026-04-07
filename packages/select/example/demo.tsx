import React, { useState } from 'react';
import { render, Box, Text } from 'ink';
import { Select } from '../src/index.js';
import type { SelectItem } from '../src/index.js';
import { darkTheme, lightTheme } from '@inkui-cli/core';

type Framework = 'react' | 'vue' | 'svelte' | 'angular' | 'solid';

const frameworks: SelectItem<Framework>[] = [
  { label: 'React',   value: 'react' },
  { label: 'Vue',     value: 'vue' },
  { label: 'Svelte',  value: 'svelte' },
  { label: 'Angular', value: 'angular', disabled: true },
  { label: 'Solid',   value: 'solid' },
];

const plans: SelectItem<string>[] = [
  { label: 'Free',       value: 'free' },
  { label: 'Pro — $12/mo', value: 'pro' },
  { label: 'Team — $49/mo', value: 'team' },
  { label: 'Enterprise', value: 'enterprise', disabled: true },
];

const Demo = () => {
  const [picked, setPicked] = useState<string | null>(null);

  return (
    <Box flexDirection="column" gap={1}>
      <Text bold>@inkui-cli/select — live demo</Text>

      <Box flexDirection="column">
        <Text dimColor>── dark theme · generic Select{'<Framework>'} ────</Text>
        <Box marginTop={1}>
          <Select
            items={frameworks}
            onSelect={(item) => setPicked(`framework: ${item.value}`)}
            theme={darkTheme}
          />
        </Box>
      </Box>

      <Box flexDirection="column">
        <Text dimColor>── light theme · unfocused ──────────────────────</Text>
        <Box marginTop={1}>
          <Select
            items={plans}
            onSelect={() => {}}
            focus={false}
            theme={lightTheme}
          />
        </Box>
      </Box>

      {picked ? (
        <Text color="green">✔ Selected — {picked}</Text>
      ) : null}
    </Box>
  );
};

render(<Demo />);

setTimeout(() => process.exit(0), 3000);
