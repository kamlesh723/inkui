import { useState, useCallback } from 'react';
import { useInput } from 'ink';

export interface FocusManagerOptions {
  count: number;
  initialIndex?: number;
  cycle?: boolean;
  nextKey?: string;
  prevKey?: string;
}

export interface FocusManagerResult {
  focusedIndex: number;
  setFocus: (index: number) => void;
  isFocused: (index: number) => boolean;
  focusNext: () => void;
  focusPrev: () => void;
}

export function useFocusManager({
  count,
  initialIndex = 0,
  cycle = true,
  nextKey = 'tab',
  prevKey = 'shift+tab',
}: FocusManagerOptions): FocusManagerResult {
  const [focusedIndex, setFocusedIndex] = useState(initialIndex);

  const focusNext = useCallback(() => {
    setFocusedIndex((prev) => {
      if (prev >= count - 1) return cycle ? 0 : prev;
      return prev + 1;
    });
  }, [count, cycle]);

  const focusPrev = useCallback(() => {
    setFocusedIndex((prev) => {
      if (prev <= 0) return cycle ? count - 1 : prev;
      return prev - 1;
    });
  }, [count, cycle]);

  const setFocus = useCallback((index: number) => {
    setFocusedIndex(Math.max(0, Math.min(count - 1, index)));
  }, [count]);

  const isFocused = useCallback((index: number) => index === focusedIndex, [focusedIndex]);

  useInput((input, key) => {
    const isNext =
      (nextKey === 'tab' && key.tab && !key.shift) ||
      (nextKey !== 'tab' && input === nextKey);
    const isPrev =
      (prevKey === 'shift+tab' && key.tab && key.shift) ||
      (prevKey !== 'shift+tab' && input === prevKey);

    if (isNext) focusNext();
    else if (isPrev) focusPrev();
  });

  return { focusedIndex, setFocus, isFocused, focusNext, focusPrev };
}
