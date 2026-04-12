import React, { useState, useEffect, useRef } from 'react';
import { Text } from 'ink';
import { darkTheme } from '@inkui-cli/core';
import type { InkUITheme } from '@inkui-cli/core';

export interface TypewriterProps {
  text: string;
  speed?: number;
  delay?: number;
  cursor?: boolean;
  cursorChar?: string;
  onComplete?: () => void;
  playing?: boolean;
  theme?: InkUITheme;
}

export const Typewriter: React.FC<TypewriterProps> = ({
  text,
  speed = 30,
  delay = 0,
  cursor = true,
  cursorChar = '▌',
  onComplete,
  playing = true,
  theme = darkTheme,
}) => {
  const [visibleLength, setVisibleLength] = useState(playing ? 0 : text.length);
  const [started, setStarted] = useState(delay === 0 && playing);
  const prevText = useRef(text);
  const completedRef = useRef(false);

  useEffect(() => {
    if (!playing) {
      setVisibleLength(text.length);
      return;
    }
    if (prevText.current !== text) {
      prevText.current = text;
      setVisibleLength(0);
      setStarted(false);
      completedRef.current = false;
    }
  }, [text, playing]);

  useEffect(() => {
    if (!playing || started) return;
    if (delay === 0) { setStarted(true); return; }
    const t = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(t);
  }, [playing, started, delay]);

  useEffect(() => {
    if (!started || !playing) return;
    if (visibleLength >= text.length) {
      if (!completedRef.current) {
        completedRef.current = true;
        onComplete?.();
      }
      return;
    }
    const interval = Math.round(1000 / speed);
    const id = setInterval(() => {
      setVisibleLength((prev) => {
        if (prev >= text.length) { clearInterval(id); return prev; }
        return prev + 1;
      });
    }, interval);
    return () => clearInterval(id);
  }, [started, playing, text, speed, visibleLength, onComplete]);

  const done = visibleLength >= text.length;

  return (
    <Text color={theme.colors.text}>
      {text.slice(0, visibleLength)}
      {cursor && !done ? <Text color={theme.colors.primary}>{cursorChar}</Text> : ''}
    </Text>
  );
};
