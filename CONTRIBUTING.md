# Contributing to InkUI

Thanks for your interest in contributing! InkUI is a shadcn/ui-style component library for terminal UIs built on [Ink](https://github.com/vadimdemedes/ink).

---

## Prerequisites

- **Node.js** 20+
- **pnpm** 9+ (`npm install -g pnpm`)
- Basic React + TypeScript knowledge
- Familiarity with terminal UIs is helpful but not required

---

## Setup

```bash
git clone https://github.com/kamlesh723/InkUI.git
cd InkUI
pnpm install
pnpm build
```

Verify everything works:

```bash
cd packages/spinner
tsx example/demo.tsx
# Should show an animated spinner for 3 seconds
```

---

## Monorepo Structure

```
inkui/
├── packages/          # Published npm packages (@inkui-cli/*)
│   ├── core/          # Tokens + themes (darkTheme, lightTheme, spacing)
│   ├── spinner/       # Each component is its own package
│   ├── badge/
│   └── ...
├── apps/
│   ├── docs/          # Next.js docs site (inkui-lib.vercel.app)
│   ├── git-tidy/      # Showcase CLI — git branch cleanup
│   └── inkui-sysmon/  # Showcase CLI — system monitor
├── turbo.json         # Turborepo pipeline
└── pnpm-workspace.yaml
```

---

## Running Commands

```bash
# From repo root
pnpm build          # Build all packages (turbo, parallel)
pnpm test           # Run all tests

# From a specific package
cd packages/spinner
pnpm build          # tsup build
pnpm test           # vitest run
tsx example/demo.tsx  # Run the demo directly (no build needed)

# Docs site
cd apps/docs
pnpm dev            # Start Next.js dev server at localhost:3000

# Showcase CLIs
cd apps/git-tidy && pnpm dev
cd apps/inkui-sysmon && pnpm dev
```

---

## Building a New Component

Follow this exact structure (copy from `packages/spinner` as a template):

### 1. Scaffold the package

```bash
mkdir -p packages/<name>/src packages/<name>/example
```

### 2. Create `packages/<name>/package.json`

```json
{
  "name": "@inkui-cli/<name>",
  "version": "0.1.0",
  "type": "module",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js",
      "require": "./dist/index.cjs"
    }
  },
  "main": "./dist/index.cjs",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "dependencies": {
    "@inkui-cli/core": "workspace:*",
    "ink": "^6.0.0",
    "react": "^19.0.0"
  },
  "peerDependencies": {
    "ink": "^6.0.0",
    "react": "^19.0.0"
  },
  "devDependencies": {
    "@types/react": "^19.0.0",
    "tsup": "^8.0.0",
    "tsx": "^4.0.0",
    "typescript": "^5.4.0",
    "vitest": "^2.0.0"
  }
}
```

### 3. Write the component

```tsx
// packages/<name>/src/<Name>.tsx
import React from 'react';
import { Box, Text } from 'ink';
import { darkTheme } from '@inkui-cli/core';
import type { InkUITheme } from '@inkui-cli/core';

export interface <Name>Props {
  // your props here
  theme?: InkUITheme;
}

export const <Name>: React.FC<<Name>Props> = ({
  theme = darkTheme,
}) => {
  return (
    <Box>
      <Text>Your component</Text>
    </Box>
  );
};
```

### 4. Export from `src/index.ts`

```ts
export type { <Name>Props } from './<Name>.js';
export { <Name> } from './<Name>.js';
```

### 5. Write a demo

```tsx
// packages/<name>/example/demo.tsx
import React from 'react';
import { render } from 'ink';
import { <Name> } from '../src/index.js';

render(<Name> />);
setTimeout(() => process.exit(0), 3000);
```

### 6. Write tests

Create `packages/<name>/src/<Name>.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from 'ink-testing-library';
import { <Name> } from './<Name>.js';

describe('<Name>', () => {
  it('renders without crashing', () => {
    const { lastFrame } = render(<<Name> /* required props */ />);
    expect(lastFrame()).toBeTruthy();
    expect(lastFrame()!.length).toBeGreaterThan(0);
  });

  it('renders expected static output', () => {
    const { lastFrame } = render(<<Name> label="hello" />);
    expect(lastFrame()).toContain('hello');
  });
});
```

Rules:
- Static render only — do not test animations, timers, or keyboard events
- Wrap any raw string children in `<Text>` from `ink` (Ink requirement)
- Use `ink-testing-library`'s `render()` — it is already installed at the root

### 7. Install and build

```bash
pnpm install   # from repo root — links workspace deps
cd packages/<name>
pnpm build
pnpm test      # vitest run — must pass
tsx example/demo.tsx   # verify it works visually
```

---

## Component Requirements Checklist

Every component must pass this before a PR is merged:

- [ ] Accepts `theme?: InkUITheme` prop, defaults to `darkTheme` from `@inkui-cli/core`
- [ ] Uses `process.stdout.columns ?? 80` for any width calculations
- [ ] Uses Ink's `<Box>` + `<Text>` for layout — never import chalk
- [ ] Any keyboard input uses `useInput` with `{ isActive: focus }` to prevent leaking
- [ ] `ctrl+c` is never swallowed — always propagates to allow exit
- [ ] Named exports only — no `export default`, no `export * from`
- [ ] Props interface is exported from `src/index.ts`
- [ ] `example/demo.tsx` runs cleanly with `tsx example/demo.tsx`
- [ ] Demo exits automatically (use `setTimeout(() => process.exit(0), 3000)`)
- [ ] Tests exist in `src/<Name>.test.tsx` and `pnpm test` passes inside the package
- [ ] Tests use `ink-testing-library` — static render only, no timers or keyboard events
- [ ] `pnpm build` passes without errors or type errors

---

## Code Style

- **TypeScript strict mode** — no `any`, no `@ts-ignore`
- **No chalk** — colors only via Ink's `<Text color="">` prop
- **No `process.exit()`** in components — use `useApp().exit()`
- Component files use PascalCase: `Spinner.tsx`
- Keep components focused — one component per file
- Export all prop interfaces so users get good IntelliSense

---

## PR Process

1. Fork the repo and create a branch: `git checkout -b feat/my-component`
2. Make your changes following the checklist above
3. Run `pnpm build && pnpm test` from root — must pass
4. Open a PR against `main`
5. Fill in the PR template
6. A maintainer will review within a few days

---

## Questions?

Open a [GitHub Discussion](https://github.com/kamlesh723/InkUI/discussions) or file an issue using one of the templates.
