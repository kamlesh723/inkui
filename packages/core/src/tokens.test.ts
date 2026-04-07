import { describe, it, expect } from 'vitest';
import { borderStyles, spinnerFrames, spacing } from './tokens.js';
import { darkTheme, lightTheme } from './theme.js';

describe('@inkui-cli/core tokens', () => {
  it('exports 5 border styles', () => {
    expect(Object.keys(borderStyles)).toHaveLength(5);
  });

  it('exports 4 spinner frame sets', () => {
    expect(Object.keys(spinnerFrames)).toHaveLength(4);
  });

  it('spacing values are non-negative numbers', () => {
    Object.values(spacing).forEach((v) => expect(v).toBeGreaterThanOrEqual(0));
  });

  it('darkTheme has all required color keys', () => {
    const keys = ['primary','secondary','success','warning','error','info','muted','text','textInverse','border','focus','selection'];
    keys.forEach((k) => expect(darkTheme.colors).toHaveProperty(k));
  });

  it('lightTheme has all required color keys', () => {
    expect(Object.keys(lightTheme.colors)).toHaveLength(Object.keys(darkTheme.colors).length);
  });
});
