import React from 'react';
import { render } from 'ink';
import { Box, Text } from 'ink';
import { Stepper } from '../src/Stepper.js';

const steps = [
  { key: 'setup', title: 'Setup', description: 'Database' },
  { key: 'configure', title: 'Configure', description: 'API Settings' },
  { key: 'deploy', title: 'Deploy', description: 'Production' },
  { key: 'verify', title: 'Verify', description: 'Health check' },
];

render(
  <Box flexDirection="column" gap={2}>
    <Text bold color="cyan">Stepper Demo — Horizontal</Text>
    <Stepper steps={steps} currentStep="configure" completedSteps={['setup']} />
    <Text bold color="cyan">Stepper Demo — Vertical</Text>
    <Stepper
      steps={steps}
      currentStep="configure"
      completedSteps={['setup']}
      orientation="vertical"
    />
  </Box>
);

setTimeout(() => process.exit(0), 3000);
