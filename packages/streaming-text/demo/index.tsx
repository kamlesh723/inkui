import React, { useState, useEffect } from 'react';
import { render } from 'ink';
import { Box, Text } from 'ink';
import { StreamingText } from '../src/StreamingText.js';

const FULL_TEXT = 'The capital of France is Paris. It is known for its iconic Eiffel Tower and world-class cuisine.';

const App = () => {
  const [text, setText] = useState('');
  const [streaming, setStreaming] = useState(true);

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      i++;
      setText(FULL_TEXT.slice(0, i));
      if (i >= FULL_TEXT.length) {
        clearInterval(id);
        setStreaming(false);
      }
    }, 30);
    return () => clearInterval(id);
  }, []);

  return (
    <Box flexDirection="column">
      <Text bold color="cyan">StreamingText Demo</Text>
      <Box marginTop={1}>
        <StreamingText text={text} streaming={streaming} />
      </Box>
      {!streaming && <Text color="green" dimColor>✓ Complete</Text>}
    </Box>
  );
};

render(<App />);
setTimeout(() => process.exit(0), 5000);
