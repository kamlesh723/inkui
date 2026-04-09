import React from 'react';
import { render, Box, Text } from 'ink';
import { Panel } from '../src/Panel.js';

function Demo() {
  return (
    <Box flexDirection="column" paddingLeft={1} paddingTop={1} gap={1}>

      {/* Basic panel with title */}
      <Panel title="System Info" borderStyle="rounded">
        <Text>OS: Ubuntu 24.04</Text>
        <Text>Node: v22.0.0</Text>
        <Text>Uptime: 3 days, 4 hours</Text>
      </Panel>

      {/* Fixed width */}
      <Panel title="Status" borderStyle="rounded" width={42}>
        <Text color="green">● API Gateway    online</Text>
        <Text color="yellow">◌ Database       syncing</Text>
        <Text color="red">○ CDN node       offline</Text>
      </Panel>

      {/* No title */}
      <Panel borderStyle="single" width={42}>
        <Text color="cyan">⠹ Loading data...</Text>
      </Panel>

      {/* Double border */}
      <Panel title="Double Border" borderStyle="double" width={42}>
        <Text color="magenta">Content inside a double-border panel</Text>
      </Panel>

      {/* Bold border */}
      <Panel title="Bold Border" borderStyle="bold" width={42}>
        <Text>Bold box-drawing characters</Text>
      </Panel>

      {/* ASCII fallback */}
      <Panel title="ASCII" borderStyle="ascii" width={42}>
        <Text color="gray">Safe for any terminal</Text>
      </Panel>

    </Box>
  );
}

render(<Demo />);
setTimeout(() => process.exit(0), 4000);
