import React, { useState, useEffect } from 'react';
import { Text, Box } from 'ink';
import { spinnerFrames, darkTheme } from '@inkui-cli/core';
import type { SpinnerType, InkUITheme } from '@inkui-cli/core';

export interface SpinnerProps {
  /** Text shown after the spinner frame */
  label?: string;
  /** Animation style — dots | line | arc | bounce */
  type?: SpinnerType;
  /** Frame interval in milliseconds */
  interval?: number;
  /** Theme override — defaults to darkTheme */
  theme?: InkUITheme;
}

export const Spinner: React.FC<SpinnerProps> = ({
  label = '',
  type = 'dots',
  interval = 80,
  theme = darkTheme,
}) => {
  const frames = spinnerFrames[type];
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setFrame((prev) => (prev + 1) % frames.length);
    }, interval);
    return () => clearInterval(timer);
  }, [frames.length, interval]);

  return (
    <Box>
      <Text color={theme.colors.primary}>{frames[frame]}</Text>
      {label ? <Text> {label}</Text> : null}
    </Box>
  );
};
