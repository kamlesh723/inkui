import React, { useState } from 'react';
import { render } from 'ink';
import { Text } from 'ink';
import { Tabs } from '../src/Tabs.js';

const tabs = [
  { key: 'logs', label: 'Logs', badge: 5 },
  { key: 'metrics', label: 'Metrics' },
  { key: 'config', label: 'Config' },
  { key: 'disabled', label: 'Disabled', disabled: true },
];

const App = () => {
  const [active, setActive] = useState('logs');

  return (
    <Tabs tabs={tabs} activeKey={active} onChange={setActive} variant="underline">
      <Text color="green">📋 Log output here...</Text>
      <Text color="cyan">📊 Metrics dashboard...</Text>
      <Text color="yellow">⚙️  Configuration panel...</Text>
      <Text>Disabled tab content</Text>
    </Tabs>
  );
};

render(<App />);
setTimeout(() => process.exit(0), 3000);
