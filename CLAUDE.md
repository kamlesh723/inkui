# InkUI — CLAUDE.md

> shadcn/ui-style terminal component library built on Ink (React for CLI).
> Users run `npx inkui add <component>` and own the source — same model as shadcn.

---

## What exists right now (Phase 1 complete)

| Package | Status |
|---|---|
| `packages/core` | Built — tokens (borderStyles, spinnerFrames, spacing) + themes (darkTheme, lightTheme) |
| `packages/spinner` | Built — `<Spinner type label interval theme>`, all 4 animation styles, demo works |

Everything else (badge, progress-bar, text-input, select, multi-select, table, dialog, CLI app, docs site) does NOT exist yet.

---

## Critical conventions decided in Phase 1

### Module format: explicit extensions, `"type": "module"` on every package
- Every component package has `"type": "module"` in its `package.json`
- tsup `outExtension` outputs `.js` for ESM, `.cjs` for CJS — avoids ambiguity
- Exports map: `"import": "./dist/index.js"`, `"require": "./dist/index.cjs"`, `"types": "./dist/index.d.ts"` (types goes FIRST in exports map)
- This is required because Ink 6 uses top-level await in yoga-layout — CJS mode breaks

### No esbuild `"types"` ordering warning
- Put `"types"` condition FIRST in the exports map (before "import" and "require")

### pnpm + esbuild native builds
- Root `package.json` must have `"pnpm": { "onlyBuiltDependencies": ["esbuild"] }` to allow esbuild's postinstall
- Root `package.json` must have `"packageManager": "pnpm@<version>"` for Turborepo workspace resolution

### Demos run directly from src (no pre-build needed)
- `tsx example/demo.tsx` — tsx resolves `.ts`/`.tsx` source files directly
- `setTimeout(() => process.exit(0), 3000)` in every demo to prevent hangs

---

## Build commands

```bash
# From repo root
pnpm install          # install all deps
pnpm build            # turbo build (builds core first, then components in dep order)
pnpm test             # turbo test

# From a specific package
cd packages/spinner
pnpm build            # tsup
pnpm demo             # tsx example/demo.tsx
pnpm test             # vitest run
```

---

## Adding a new component package

1. `mkdir -p packages/<name>/src packages/<name>/example`
2. Copy the package.json template (with `"type": "module"`, exact versions from prompt)
3. Copy tsup.config.ts with `outExtension` and `external: ['react', 'ink']`
4. Copy tsconfig.json extending `../../tsconfig.base.json`
5. Write `src/<Name>.tsx`, `src/index.ts`, `example/demo.tsx`
6. Add `"@inkui/core": "workspace:*"` to dependencies
7. `pnpm install` from root (workspace link is auto-resolved)
8. `pnpm build` inside package — must pass before moving on
9. `pnpm demo` — verify visual output

---

## Component build order (from CLAUDE-CODE-PROMPT.md)

1. Spinner ✅
2. Badge
3. ProgressBar
4. TextInput
5. Select
6. MultiSelect
7. Table
8. Dialog

Then: apps/cli (Ink-based CLI installer) → apps/docs (Next.js + xterm.js)

---

## Component rules (no exceptions)

- Accept `theme?: InkUITheme` — default to `darkTheme` from `@inkui/core`
- Colors ONLY via Ink's `<Text color="">` — never import chalk
- Never call `process.exit()` — use `useApp().exit()`
- `useInput` always gets `{ isActive: focus }` to prevent leaking
- `ctrl+c` must never be swallowed — check and call `useApp().exit()`
- Terminal width: `const { stdout } = useStdout(); const w = stdout?.columns ?? 80;`
- Named exports only — no `export * from`
- Cross-package imports require `workspace:*` in package.json first

---

## Known working versions (pinned)

| Package | Version |
|---|---|
| ink | ^6.0.0 |
| react | ^19.0.0 |
| @types/react | ^19.0.0 |
| typescript | ^5.4.0 |
| tsup | ^8.0.0 |
| tsx | ^4.0.0 |
| vitest | ^2.0.0 |
| turbo | ^2.0.0 |

Runtime: Node 22 works (spec says >=20). pnpm 10 works (spec says 9+).

---

## Reference files

- `~/Desktop/inkui-research/src/spinner.tsx` — animation pattern reference
- `~/Desktop/inkui-research/src/select.tsx` — useInput + arrow key reference
- `~/Desktop/inkui-research/src/table.tsx` — box-drawing + column width reference

Use as reference only. Rewrite with theme support, proper TS generics, Ink 6 patterns.
