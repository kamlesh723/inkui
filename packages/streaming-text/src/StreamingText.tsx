import React, { useState, useEffect, useRef } from 'react';
import { Text } from 'ink';
import { darkTheme } from '@inkui-cli/core';
import type { InkUITheme } from '@inkui-cli/core';

export interface StreamingTextProps {
  text: string;
  streaming?: boolean;
  cursor?: string;
  cursorBlinkSpeed?: number;
  color?: string;
  onComplete?: () => void;
  theme?: InkUITheme;
}

export const StreamingText: React.FC<StreamingTextProps> = ({
  text,
  streaming = true,
  cursor = '█',
  cursorBlinkSpeed = 530,
  color,
  onComplete,
  theme = darkTheme,
}) => {
  const [cursorVisible, setCursorVisible] = useState(true);
  const prevStreaming = useRef(streaming);

  useEffect(() => {
    if (!streaming) {
      if (prevStreaming.current) onComplete?.();
      prevStreaming.current = false;
      return;
    }
    prevStreaming.current = true;
    const id = setInterval(() => setCursorVisible((v) => !v), cursorBlinkSpeed);
    return () => clearInterval(id);
  }, [streaming, cursorBlinkSpeed, onComplete]);

  const textColor = color ?? theme.colors.text;

  return (
    <Text color={textColor}>
      {text}
      {streaming && cursorVisible ? cursor : ''}
    </Text>
  );
};
