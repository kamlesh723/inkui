import React, { useState } from 'react';
import { render, Box, Text } from 'ink';
import { TextInput } from '../src/index.js';
import { darkTheme, lightTheme } from '@inkui-cli/core';

const Demo = () => {
  const [name, setName]         = useState('Kamlesh');
  const [email, setEmail]       = useState('');
  const [pass, setPass]         = useState('secret123');
  const [submitted, setSubmit]  = useState('');
  const [activeField, setActive] = useState<'name' | 'email' | 'pass'>('name');

  return (
    <Box flexDirection="column" gap={1}>
      <Text bold>@inkui-cli/text-input — live demo</Text>
      <Text dimColor>Tab not wired in demo — fields shown with pre-filled states</Text>

      <Box flexDirection="column" gap={1}>
        <Text dimColor>── focused (dark theme) ─────────────────────</Text>

        {/* Focused with existing value — cursor at end */}
        <TextInput
          label="Name   "
          value={name}
          onChange={setName}
          onSubmit={(v) => setSubmit(`name: ${v}`)}
          focus={activeField === 'name'}
          theme={darkTheme}
        />

        {/* Focused empty — placeholder cursor */}
        <TextInput
          label="Email  "
          value={email}
          onChange={setEmail}
          placeholder="you@example.com"
          focus={activeField === 'email'}
          theme={darkTheme}
        />

        {/* Password mask */}
        <TextInput
          label="Password"
          value={pass}
          onChange={setPass}
          password
          focus={activeField === 'pass'}
          theme={darkTheme}
        />
      </Box>

      <Box flexDirection="column" gap={1}>
        <Text dimColor>── unfocused ────────────────────────────────</Text>
        <TextInput
          label="Username"
          value="inkui_dev"
          onChange={() => {}}
          focus={false}
          theme={darkTheme}
        />
        <TextInput
          label="Token   "
          value=""
          onChange={() => {}}
          placeholder="paste token here"
          focus={false}
          theme={darkTheme}
        />
      </Box>

      <Box flexDirection="column" gap={1}>
        <Text dimColor>── light theme ──────────────────────────────</Text>
        <TextInput
          label="Search"
          value="inkui components"
          onChange={() => {}}
          focus={false}
          theme={lightTheme}
        />
      </Box>

      {submitted ? <Text color="green">✔ Submitted — {submitted}</Text> : null}
    </Box>
  );
};

render(<Demo />);

setTimeout(() => process.exit(0), 3000);
