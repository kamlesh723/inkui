import React from 'react';
import { render } from 'ink';
import { Text } from 'ink';
import { ScrollArea } from '../src/ScrollArea.js';

const items = Array.from({ length: 30 }, (_, i) => (
  <Text key={i} color={i % 3 === 0 ? 'cyan' : i % 3 === 1 ? 'green' : 'white'}>
    {`Line ${String(i + 1).padStart(3, ' ')}: ${'─'.repeat(20)} item content here`}
  </Text>
));

render(
  <ScrollArea height={10} focus={false}>
    {items}
  </ScrollArea>
);

setTimeout(() => process.exit(0), 3000);
