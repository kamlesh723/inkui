import React, { useState, useEffect } from 'react';
import { render, Box, Text } from 'ink';
import { ProgressBar } from '../src/index.js';
import { darkTheme, lightTheme } from '@inkui/core';

const Demo = () => {
  const [progress, setProgress] = useState(0);

  // Animate from 0 → 100 over ~2.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 2;
      });
    }, 50);
    return () => clearInterval(timer);
  }, []);

  return (
    <Box flexDirection="column" gap={1}>
      <Text bold>@inkui/progress-bar — live demo</Text>

      <Box flexDirection="column" gap={1}>
        <Text dimColor>── animated (dark theme) ───────────────────────</Text>
        <ProgressBar value={progress} label="Downloading" width={40} theme={darkTheme} />
        <ProgressBar value={progress} label="Installing " width={40} theme={darkTheme} />
      </Box>

      <Box flexDirection="column" gap={1}>
        <Text dimColor>── fixed values ────────────────────────────────</Text>
        <ProgressBar value={0}   label="  0%" width={40} theme={darkTheme} />
        <ProgressBar value={25}  label=" 25%" width={40} theme={darkTheme} />
        <ProgressBar value={50}  label=" 50%" width={40} theme={darkTheme} />
        <ProgressBar value={75}  label=" 75%" width={40} theme={darkTheme} />
        <ProgressBar value={100} label="100%" width={40} theme={darkTheme} />
      </Box>

      <Box flexDirection="column" gap={1}>
        <Text dimColor>── light theme ─────────────────────────────────</Text>
        <ProgressBar value={progress} label="Progress" width={40} theme={lightTheme} />
        <ProgressBar value={66} label="No percent" width={40} showPercent={false} theme={lightTheme} />
      </Box>
    </Box>
  );
};

render(<Demo />);

setTimeout(() => process.exit(0), 3000);
