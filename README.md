# InkUI

**shadcn/ui for the terminal.** Copy-paste terminal UI components for [Ink](https://github.com/vadimdemedes/ink) — the React renderer for CLIs.

[![CI](https://github.com/kamleshyadav723/inkui/actions/workflows/ci.yml/badge.svg)](https://github.com/kamleshyadav723/inkui/actions/workflows/ci.yml)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4+-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Ink 6](https://img.shields.io/badge/Ink-6.x-61dafb?logo=react&logoColor=white)](https://github.com/vadimdemedes/ink)
[![pnpm workspace](https://img.shields.io/badge/pnpm-workspace-f69220?logo=pnpm&logoColor=white)](https://pnpm.io/workspaces)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

---

## What is InkUI?

InkUI works exactly like [shadcn/ui](https://ui.shadcn.com/) — but for **terminal apps built with Ink**.

Instead of installing a component library as a dependency, you **copy the component source directly into your project**. Run one command, get the TypeScript file, own it forever. Customise the colours, change the layout, strip what you don't need — it's just your code.

```
npx inkui add spinner
```

```
./components/ui/spinner/
  ├── Spinner.tsx   ← your file now
  └── index.ts
```

No lock-in. No version drift. No surprise breaking changes.

---

## Live preview

```
@inkui/spinner — live demo

⠹ Loading your stuff...  (dots)
| Crunching numbers...   (line)
◝ Orbiting...            (arc)
⣻ Bouncing...            (bounce)
```

```
@inkui/badge — live demo

 default   success   warning   error   info
```

```
@inkui/progress-bar — live demo

Downloading ████████████████████░░░░░░░░░░░░░░░░░░░░  50%
Installing  ████████████████████████████████████████ 100%
```

```
@inkui/table — live demo

╭─────────────────────┬─────────┬──────────╮
│ Package             │ Version │ ESM Size │
├─────────────────────┼─────────┼──────────┤
│ @inkui/core         │  0.1.0  │   2.6 KB │
│ @inkui/spinner      │  0.1.0  │    837 B │
│ @inkui/badge        │  0.1.0  │    743 B │
│ @inkui/progress-bar │  0.1.0  │   1.3 KB │
│ @inkui/table        │  0.1.0  │   3.9 KB │
╰─────────────────────┴─────────┴──────────╯
```

```
@inkui/select — live demo

❯ React
  Vue
  Svelte
  Angular  (disabled)
  Solid
```

```
@inkui/dialog — live demo

╭─────────────────────────────────╮
│ Deploy to production?           │
├─────────────────────────────────┤
│                                 │
│ This will push changes to prod. │
│ All users will be affected.     │
│                                 │
├─────────────────────────────────┤
│              Cancel    Confirm  │
╰─────────────────────────────────╯
  ← → navigate  ·  enter: confirm  ·  esc: dismiss
```

---

## Quick start

**Step 1 — Add a component to your Ink project**

```bash
npx inkui add spinner
```

**Step 2 — Import it**

```tsx
import { Spinner } from './components/ui/spinner';
```

**Step 3 — Use it**

```tsx
import React from 'react';
import { render } from 'ink';
import { Spinner } from './components/ui/spinner';

const App = () => <Spinner label="Deploying..." type="dots" />;

render(<App />);
```

That's it. The component is yours.

---

## Available components

| Component | What it does | Add it |
|---|---|---|
| **Spinner** | Animated spinner — dots, line, arc, bounce | `npx inkui add spinner` |
| **Badge** | Status badge — default / success / warning / error / info | `npx inkui add badge` |
| **ProgressBar** | Fill-bar with percent, auto terminal width | `npx inkui add progress-bar` |
| **TextInput** | Text field — cursor, arrows, backspace, placeholder, password | `npx inkui add text-input` |
| **Select** | Arrow-key single-select, disabled items, generic `Select<T>` | `npx inkui add select` |
| **MultiSelect** | Space-toggle checkboxes, set state, generic `MultiSelect<T>` | `npx inkui add multi-select` |
| **Table** | Data table — auto widths, overflow truncation, 5 border styles | `npx inkui add table` |
| **Dialog** | Modal dialog — title, message, action buttons, Escape to dismiss | `npx inkui add dialog` |

**Add everything at once:**

```bash
npx inkui add --all
```

**See what's available:**

```bash
npx inkui list
```

---

## Component usage examples

### Spinner

```tsx
import { Spinner } from './components/ui/spinner';

// Dots (default)
<Spinner label="Resolving packages..." />

// Other styles: line | arc | bounce
<Spinner type="arc" label="Uploading..." />
```

**Props**

| Prop | Type | Default | Description |
|---|---|---|---|
| `label` | `string` | `''` | Text shown after the spinner frame |
| `type` | `'dots' \| 'line' \| 'arc' \| 'bounce'` | `'dots'` | Animation style |
| `interval` | `number` | `80` | Frame speed in ms |
| `theme` | `InkUITheme` | `darkTheme` | Color theme |

---

### Badge

```tsx
import { Badge } from './components/ui/badge';

<Badge variant="success">deployed</Badge>
<Badge variant="warning">degraded</Badge>
<Badge variant="error">failed</Badge>
<Badge variant="info">pending</Badge>
<Badge variant="default">unknown</Badge>
```

**Props**

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `string` | — *required* | Badge label |
| `variant` | `'default' \| 'success' \| 'warning' \| 'error' \| 'info'` | `'default'` | Visual style |
| `theme` | `InkUITheme` | `darkTheme` | Color theme |

---

### ProgressBar

```tsx
import { ProgressBar } from './components/ui/progress-bar';

// Controlled — hook up to your own state
const [progress, setProgress] = useState(0);
<ProgressBar value={progress} label="Downloading" />

// Fixed width, no percent label
<ProgressBar value={66} width={40} showPercent={false} />
```

**Props**

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `number` | — *required* | 0–100 |
| `label` | `string` | — | Left-side label |
| `showPercent` | `boolean` | `true` | Show `%` on the right |
| `width` | `number` | auto | Fixed bar width (columns) |
| `theme` | `InkUITheme` | `darkTheme` | Color theme |

---

### TextInput

```tsx
import { TextInput } from './components/ui/text-input';

const [name, setName] = useState('');

<TextInput
  label="Name"
  value={name}
  onChange={setName}
  onSubmit={(v) => console.log('submitted:', v)}
  placeholder="Enter your name"
/>

// Password mode — masks input as *
<TextInput value={pass} onChange={setPass} password />
```

**Props**

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `string` | — *required* | Controlled value |
| `onChange` | `(v: string) => void` | — *required* | Called on every keystroke |
| `onSubmit` | `(v: string) => void` | — | Called on Enter |
| `placeholder` | `string` | `''` | Shown when empty |
| `password` | `boolean` | `false` | Mask as `*` |
| `focus` | `boolean` | `true` | Whether this field is active |
| `label` | `string` | — | Left-side label |
| `theme` | `InkUITheme` | `darkTheme` | Color theme |

---

### Select

```tsx
import { Select } from './components/ui/select';
import type { SelectItem } from './components/ui/select';

// Fully generic — value type can be anything
type Framework = 'react' | 'vue' | 'svelte';

const items: SelectItem<Framework>[] = [
  { label: 'React',  value: 'react' },
  { label: 'Vue',    value: 'vue' },
  { label: 'Svelte', value: 'svelte' },
  // Disable an option
  { label: 'Angular', value: 'angular' as any, disabled: true },
];

<Select
  items={items}
  onSelect={(item) => console.log(item.value)} // typed as Framework
/>
```

**Keys:** `↑ ↓` to navigate · `Enter` to confirm · disabled items are skipped

---

### MultiSelect

```tsx
import { MultiSelect } from './components/ui/multi-select';

<MultiSelect
  items={[
    { label: 'TypeScript', value: 'ts' },
    { label: 'ESLint',     value: 'eslint' },
    { label: 'Prettier',   value: 'prettier' },
    { label: 'Husky',      value: 'husky', disabled: true },
  ]}
  defaultSelected={['ts']}
  onSubmit={(selected) => {
    // selected is MultiSelectItem<string>[]
    console.log(selected.map((s) => s.value));
  }}
/>
```

**Keys:** `↑ ↓` to navigate · `Space` to toggle `◯/◉` · `Enter` to confirm

---

### Table

```tsx
import { Table } from './components/ui/table';
import type { TableColumn } from './components/ui/table';

type Package = { name: string; version: string; size: string };

const columns: TableColumn<Package>[] = [
  { key: 'name',    header: 'Package',  align: 'left'   },
  { key: 'version', header: 'Version',  align: 'center' },
  { key: 'size',    header: 'Size',     align: 'right'  },
];

const data: Package[] = [
  { name: '@inkui/spinner', version: '0.1.0', size: '837 B' },
  { name: '@inkui/table',   version: '0.1.0', size: '3.9 KB' },
];

// Border styles: 'single' | 'double' | 'rounded' | 'bold' | 'ascii'
<Table columns={columns} data={data} borderStyle="rounded" />
```

Columns auto-size to content. Cells that overflow are truncated with `…`. The table shrinks to fit the terminal width.

---

### Dialog

```tsx
import { Dialog } from './components/ui/dialog';

const [open, setOpen] = useState(true);

<Dialog
  isOpen={open}
  title="Deploy to production?"
  message="This will push changes to all users."
  actions={[
    { label: 'Cancel',  value: 'cancel'  },
    { label: 'Confirm', value: 'confirm' },
  ]}
  onAction={(action) => {
    if (action.value === 'confirm') deploy();
    setOpen(false);
  }}
  onDismiss={() => setOpen(false)}
  borderStyle="rounded"
/>
```

**Keys:** `←→` navigate actions · `Enter` confirm · `Escape` dismiss

---

## Theming

Every component accepts a `theme` prop. InkUI ships two built-in themes and makes it trivial to build your own.

```tsx
import { darkTheme, lightTheme } from '@inkui/core';
import type { InkUITheme } from '@inkui/core';

// Use a built-in theme
<Spinner theme={darkTheme} />
<Spinner theme={lightTheme} />

// Build your own
const myTheme: InkUITheme = {
  colors: {
    primary: 'magenta',
    secondary: 'cyan',
    success: 'green',
    warning: 'yellow',
    error: 'red',
    info: 'blue',
    muted: 'gray',
    text: 'white',
    textInverse: 'black',
    border: 'gray',
    focus: 'magenta',
    selection: 'cyan',
  },
  border: 'rounded',
};

<Table theme={myTheme} borderStyle={myTheme.border} columns={cols} data={rows} />
```

Colors are passed directly as Ink `<Text color="">` values — named colors, hex `#rrggbb`, or `rgb(r,g,b)`. No chalk, no ANSI codes, no cross-platform headaches.

---

## How the CLI works

```
npx inkui add table
```

1. Looks up `table` in the registry
2. Reads `Spinner.tsx` + `index.ts` from the InkUI source
3. Copies them into `./components/ui/table/` in **your project**
4. You get the TypeScript source, not a compiled artifact

The component is yours to modify. If InkUI releases a better version later, you can diff and cherry-pick what you want.

---

## Requirements

| Dependency | Version |
|---|---|
| Node.js | `>=20` |
| React | `^19.0.0` |
| Ink | `^6.0.0` |
| TypeScript | `^5.4.0` (recommended) |

InkUI components use the React 19 JSX transform and Ink 6 APIs. Both are peer dependencies — your project supplies them.

---

## Project structure

```
inkui/
├── packages/
│   ├── core/           @inkui/core      — design tokens + themes
│   ├── spinner/        @inkui/spinner   — animated spinner
│   ├── badge/          @inkui/badge     — status badge
│   ├── progress-bar/   @inkui/progress-bar
│   ├── text-input/     @inkui/text-input
│   ├── select/         @inkui/select
│   ├── multi-select/   @inkui/multi-select
│   ├── table/          @inkui/table
│   └── dialog/         @inkui/dialog
├── apps/
│   ├── cli/            @inkui/cli       — npx inkui add <component>
│   └── docs/           @inkui/docs      — Next.js docs + live terminal previews
├── turbo.json
└── pnpm-workspace.yaml
```

---

## Local development

```bash
# 1. Clone
git clone https://github.com/kamleshyadav723/inkui.git
cd inkui

# 2. Install (requires pnpm)
pnpm install

# 3. Build all packages
pnpm build

# 4. Run a component demo
cd packages/spinner && pnpm demo

# 5. Run the CLI locally
cd apps/cli && pnpm demo          # inkui list
cd apps/cli && pnpm demo:add      # inkui add spinner

# 6. Run the docs site
cd apps/docs
pnpm dev        # Next.js on :3000
pnpm dev:pty    # PTY WebSocket server on :3001 (live terminal previews)
```

---

## Adding a new component

1. `mkdir -p packages/<name>/src packages/<name>/example`
2. Follow the pattern in `packages/spinner/` (package.json, tsup.config.ts, tsconfig.json)
3. Build: `pnpm build` — must pass before opening a PR
4. Demo: `pnpm demo` — must show correct visual output
5. Add the component to `apps/cli/src/registry.ts`
6. Add component data to `apps/docs/lib/components-data.ts`
7. Open a PR

---

## Contributing

Contributions are welcome. Please open an issue first if you want to add a new component or make a significant change.

- **Bug fixes** — open a PR directly
- **New components** — open an issue first to discuss the API
- **Theme additions** — PRs welcome

Before submitting:
```bash
pnpm build   # must pass
pnpm test    # must pass
```

---

## License

MIT © [Kamlesh Yadav](https://github.com/kamleshyadav723)
