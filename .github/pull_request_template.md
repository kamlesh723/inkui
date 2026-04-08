## What does this PR do?

<!-- One sentence summary -->

## Type of change

- [ ] Bug fix
- [ ] New component
- [ ] Enhancement to existing component
- [ ] Docs / chore

## Component checklist (for new/changed components)

- [ ] Accepts `theme?: InkUITheme`, defaults to `darkTheme`
- [ ] Uses `process.stdout.columns ?? 80` for width
- [ ] No chalk — colors via Ink `<Text color="">`
- [ ] `useInput` uses `{ isActive: focus }` to prevent leaking
- [ ] Props interface exported from `src/index.ts`
- [ ] `tsx example/demo.tsx` runs and exits cleanly
- [ ] `pnpm build && pnpm test` passes from repo root

## Screenshots / demo

<!-- Paste a terminal recording or screenshot if visual -->
