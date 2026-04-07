import { fileURLToPath } from 'node:url';
import { join, dirname } from 'node:path';

// Works for both:
//   dev  — tsx runs from apps/cli/src/registry.ts  → 3 levels up to monorepo root
//   prod — built file at apps/cli/dist/cli.js       → 3 levels up to monorepo root
const _dir      = dirname(fileURLToPath(import.meta.url));
const monoRoot  = join(_dir, '..', '..', '..');
const pkgsRoot  = join(monoRoot, 'packages');

export interface RegistryEntry {
  /** Short description shown in `inkui list` */
  description: string;
  /** Source file names inside packages/<name>/src/ */
  files: string[];
}

export const REGISTRY: Record<string, RegistryEntry> = {
  spinner: {
    description: 'Animated spinner — dots, line, arc, bounce styles',
    files: ['Spinner.tsx', 'index.ts'],
  },
  badge: {
    description: 'Status badge — default / success / warning / error / info',
    files: ['Badge.tsx', 'index.ts'],
  },
  'progress-bar': {
    description: 'Progress bar with fill chars, percent display, auto terminal width',
    files: ['ProgressBar.tsx', 'index.ts'],
  },
  'text-input': {
    description: 'Text input — cursor, backspace, arrow keys, placeholder, password',
    files: ['TextInput.tsx', 'index.ts'],
  },
  select: {
    description: 'Single-select menu with arrow navigation and disabled items',
    files: ['Select.tsx', 'index.ts'],
  },
  'multi-select': {
    description: 'Multi-select with space-toggle, set state, disabled items',
    files: ['MultiSelect.tsx', 'index.ts'],
  },
  table: {
    description: 'Data table — auto widths, overflow truncation, 5 border styles',
    files: ['Table.tsx', 'index.ts'],
  },
  dialog: {
    description: 'Modal dialog — title, message, action buttons, Escape to dismiss',
    files: ['Dialog.tsx', 'index.ts'],
  },
};

/** Absolute path to the source directory for a component package. */
export function pkgSrcDir(componentName: string): string {
  return join(pkgsRoot, componentName, 'src');
}

/** All component names, sorted alphabetically. */
export const componentNames = Object.keys(REGISTRY).sort();
