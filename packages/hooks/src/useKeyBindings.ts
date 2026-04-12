import { useCallback } from 'react';
import { useInput } from 'ink';
import type { Key } from 'ink';

export interface KeyBinding {
  key: string;
  handler: () => void;
  description?: string;
  when?: boolean;
}

export interface UseKeyBindingsOptions {
  bindings: KeyBinding[];
  active?: boolean;
}

export interface UseKeyBindingsResult {
  getHints: () => { key: string; label: string }[];
}

function matchesKey(input: string, key: Key, binding: string): boolean {
  const parts = binding.toLowerCase().split('+');
  const mainKey = parts[parts.length - 1];
  const needsCtrl = parts.includes('ctrl');
  const needsMeta = parts.includes('meta');
  const needsShift = parts.includes('shift');

  if (needsCtrl && !key.ctrl) return false;
  if (needsMeta && !key.meta) return false;
  if (needsShift && !key.shift) return false;

  switch (mainKey) {
    case 'escape': return key.escape ?? false;
    case 'return': case 'enter': return key.return ?? false;
    case 'tab': return key.tab ?? false;
    case 'delete': return key.delete ?? false;
    case 'backspace': return key.backspace ?? false;
    case 'uparrow': return key.upArrow ?? false;
    case 'downarrow': return key.downArrow ?? false;
    case 'leftarrow': return key.leftArrow ?? false;
    case 'rightarrow': return key.rightArrow ?? false;
    default: return input.toLowerCase() === mainKey;
  }
}

export function useKeyBindings({ bindings, active = true }: UseKeyBindingsOptions): UseKeyBindingsResult {
  useInput(
    (input, key) => {
      for (const binding of bindings) {
        if (binding.when === false) continue;
        if (matchesKey(input, key, binding.key)) {
          binding.handler();
          return;
        }
      }
    },
    { isActive: active }
  );

  const getHints = useCallback(
    () =>
      bindings
        .filter((b) => b.description && b.when !== false)
        .map((b) => ({ key: b.key, label: b.description! })),
    [bindings]
  );

  return { getHints };
}
