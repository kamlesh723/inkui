export interface PropDef {
  name: string;
  type: string;
  default?: string;
  required?: boolean;
  description: string;
}

export interface ComponentData {
  slug: string;
  name: string;
  description: string;
  props: PropDef[];
  usage: string;
  /** Static terminal preview lines — shown before PTY connects */
  preview: string;
}

export const COMPONENTS: ComponentData[] = [
  {
    slug: 'spinner',
    name: 'Spinner',
    description:
      'Animated terminal spinner with four animation styles. Drop-in replacement for any loading state.',
    props: [
      { name: 'label',    type: 'string',       default: "''",          description: 'Text shown after the spinner frame' },
      { name: 'type',     type: 'SpinnerType',  default: "'dots'",      description: 'Animation style: dots | line | arc | bounce' },
      { name: 'interval', type: 'number',       default: '80',          description: 'Frame interval in milliseconds' },
      { name: 'theme',    type: 'InkUITheme',   default: 'darkTheme',   description: 'Color theme — import darkTheme or lightTheme from @inkui-cli/core' },
    ],
    usage: `import { Spinner } from './components/ui/spinner';

// Basic
<Spinner label="Loading..." />

// Different styles
<Spinner type="dots"   label="Resolving packages..." />
<Spinner type="line"   label="Compiling..."           />
<Spinner type="arc"    label="Uploading..."           />
<Spinner type="bounce" label="Connecting..."          />`,
    preview:
      `⠹ Loading your stuff...  (dots)\n` +
      `| Crunching numbers...   (line)\n` +
      `◝ Orbiting...            (arc)\n` +
      `⣻ Bouncing...            (bounce)`,
  },

  {
    slug: 'badge',
    name: 'Badge',
    description:
      'Compact status label with five semantic variants. Uses inverse terminal colors for a filled-pill look.',
    props: [
      { name: 'children', type: 'string',       required: true,       description: 'Badge label text' },
      { name: 'variant',  type: 'BadgeVariant', default: "'default'", description: 'default | success | warning | error | info' },
      { name: 'theme',    type: 'InkUITheme',   default: 'darkTheme', description: 'Color theme' },
    ],
    usage: `import { Badge } from './components/ui/badge';

<Badge variant="success">deployed</Badge>
<Badge variant="warning">degraded</Badge>
<Badge variant="error">failed</Badge>
<Badge variant="info">pending</Badge>
<Badge variant="default">unknown</Badge>`,
    preview:
      ` default   success   warning   error   info `,
  },

  {
    slug: 'progress-bar',
    name: 'ProgressBar',
    description:
      'Terminal progress bar with block-fill characters. Auto-sizes to terminal width or accepts a fixed width.',
    props: [
      { name: 'value',       type: 'number',     required: true,      description: 'Progress value 0–100' },
      { name: 'label',       type: 'string',      default: 'undefined', description: 'Optional label to the left of the bar' },
      { name: 'showPercent', type: 'boolean',     default: 'true',     description: 'Show numeric percentage at the right' },
      { name: 'width',       type: 'number',      default: 'auto',     description: 'Fixed bar width (columns). Defaults to terminal width minus overhead' },
      { name: 'theme',       type: 'InkUITheme',  default: 'darkTheme', description: 'Color theme' },
    ],
    usage: `import { ProgressBar } from './components/ui/progress-bar';

// Controlled value
<ProgressBar value={progress} label="Downloading" />

// Fixed width, no percent
<ProgressBar value={66} width={40} showPercent={false} />`,
    preview:
      `Downloading ████████████████░░░░░░░░  64%\n` +
      `Installing  ████████████████████████ 100%`,
  },

  {
    slug: 'text-input',
    name: 'TextInput',
    description:
      'Controlled text input with block cursor, arrow-key navigation, backspace, placeholder, and password masking.',
    props: [
      { name: 'value',       type: 'string',    required: true,       description: 'Controlled value' },
      { name: 'onChange',    type: '(v: string) => void', required: true, description: 'Called on every keystroke' },
      { name: 'onSubmit',    type: '(v: string) => void', default: 'undefined', description: 'Called when Enter is pressed' },
      { name: 'placeholder', type: 'string',    default: "''",        description: 'Shown when value is empty' },
      { name: 'password',    type: 'boolean',   default: 'false',     description: 'Mask characters as *' },
      { name: 'focus',       type: 'boolean',   default: 'true',      description: 'Whether this input captures keyboard input' },
      { name: 'label',       type: 'string',    default: 'undefined', description: 'Optional label to the left' },
      { name: 'theme',       type: 'InkUITheme', default: 'darkTheme', description: 'Color theme' },
    ],
    usage: `import { TextInput } from './components/ui/text-input';

const [name, setName] = useState('');

<TextInput
  label="Name"
  value={name}
  onChange={setName}
  onSubmit={(v) => console.log('submitted:', v)}
  placeholder="Enter your name"
/>

// Password mode
<TextInput value={pass} onChange={setPass} password />`,
    preview:
      `Name     ❯ Kamlesh\n` +
      `Email    ❯ you@example.com\n` +
      `Password ❯ *********`,
  },

  {
    slug: 'select',
    name: 'Select',
    description:
      'Keyboard-navigable single-select menu. Generic over the option value type. Supports disabled items.',
    props: [
      { name: 'items',    type: 'SelectItem<T>[]',          required: true,       description: 'List of { label, value, disabled? } options' },
      { name: 'onSelect', type: '(item: SelectItem<T>) => void', required: true, description: 'Called when the user confirms a selection' },
      { name: 'focus',    type: 'boolean',                  default: 'true',      description: 'Whether this select captures keyboard input' },
      { name: 'theme',    type: 'InkUITheme',               default: 'darkTheme', description: 'Color theme' },
    ],
    usage: `import { Select } from './components/ui/select';
import type { SelectItem } from './components/ui/select';

const items: SelectItem<string>[] = [
  { label: 'React',   value: 'react' },
  { label: 'Vue',     value: 'vue' },
  { label: 'Angular', value: 'angular', disabled: true },
];

<Select items={items} onSelect={(item) => console.log(item.value)} />`,
    preview:
      `❯ React\n` +
      `  Vue\n` +
      `  Angular (disabled)`,
  },

  {
    slug: 'multi-select',
    name: 'MultiSelect',
    description:
      'Multi-select with space-to-toggle checkboxes, set-based internal state, and Enter-to-confirm. Fully generic.',
    props: [
      { name: 'items',           type: 'MultiSelectItem<T>[]',         required: true,       description: 'List of { label, value, disabled? } options' },
      { name: 'onSubmit',        type: '(selected: MultiSelectItem<T>[]) => void', required: true, description: 'Called on Enter with all selected items' },
      { name: 'defaultSelected', type: 'T[]',                          default: '[]',        description: 'Pre-selected values' },
      { name: 'focus',           type: 'boolean',                      default: 'true',      description: 'Whether this component captures keyboard input' },
      { name: 'theme',           type: 'InkUITheme',                   default: 'darkTheme', description: 'Color theme' },
    ],
    usage: `import { MultiSelect } from './components/ui/multi-select';

<MultiSelect
  items={[
    { label: 'TypeScript', value: 'ts' },
    { label: 'ESLint',     value: 'eslint' },
    { label: 'Prettier',   value: 'prettier' },
  ]}
  defaultSelected={['ts']}
  onSubmit={(selected) => console.log(selected.map(s => s.value))}
/>`,
    preview:
      `❯ ◉ TypeScript\n` +
      `  ◯ ESLint\n` +
      `  ◯ Prettier\n` +
      `\n` +
      `  space: toggle  ·  enter: confirm`,
  },

  {
    slug: 'table',
    name: 'Table',
    description:
      'Data table with dynamic column widths, overflow truncation, three alignment modes, and five box-drawing border styles.',
    props: [
      { name: 'columns',     type: 'TableColumn<T>[]', required: true,        description: 'Column definitions: { key, header, align?, width? }' },
      { name: 'data',        type: 'T[]',              required: true,        description: 'Array of row objects' },
      { name: 'borderStyle', type: 'BorderStyle',      default: "'single'",   description: 'single | double | rounded | bold | ascii' },
      { name: 'theme',       type: 'InkUITheme',       default: 'darkTheme',  description: 'Color theme' },
    ],
    usage: `import { Table } from './components/ui/table';

const columns = [
  { key: 'name',    header: 'Name',    align: 'left'  },
  { key: 'version', header: 'Version', align: 'center' },
  { key: 'size',    header: 'Size',    align: 'right' },
];

<Table columns={columns} data={packages} borderStyle="rounded" />`,
    preview:
      `╭──────────────────────┬─────────┬──────────╮\n` +
      `│ Package              │ Version │     Size │\n` +
      `├──────────────────────┼─────────┼──────────┤\n` +
      `│ @inkui-cli/spinner       │  0.1.0  │    837 B │\n` +
      `│ @inkui-cli/table         │  0.1.0  │   3.9 KB │\n` +
      `╰──────────────────────┴─────────┴──────────╯`,
  },

  {
    slug: 'dialog',
    name: 'Dialog',
    description:
      'Modal dialog with title, multi-line message body, left/right action navigation, and Escape-to-dismiss.',
    props: [
      { name: 'isOpen',      type: 'boolean',       required: true,       description: 'Controls whether the dialog renders' },
      { name: 'message',     type: 'string',        required: true,       description: 'Body message — supports \\n for multi-line' },
      { name: 'actions',     type: 'DialogAction[]', required: true,      description: 'Array of { label, value } buttons' },
      { name: 'onAction',    type: '(action: DialogAction) => void', required: true, description: 'Called when user confirms an action' },
      { name: 'onDismiss',   type: '() => void',    default: 'undefined', description: 'Called when user presses Escape' },
      { name: 'title',       type: 'string',        default: 'undefined', description: 'Bold title at the top of the dialog' },
      { name: 'focus',       type: 'boolean',       default: 'true',      description: 'Whether this dialog captures keyboard input' },
      { name: 'borderStyle', type: 'BorderStyle',   default: "'rounded'", description: 'Border style key from @inkui-cli/core' },
      { name: 'theme',       type: 'InkUITheme',    default: 'darkTheme', description: 'Color theme' },
    ],
    usage: `import { Dialog } from './components/ui/dialog';

<Dialog
  isOpen={open}
  title="Deploy to production?"
  message="This will push changes to all users."
  actions={[
    { label: 'Cancel',  value: 'cancel'  },
    { label: 'Confirm', value: 'confirm' },
  ]}
  onAction={(action) => handleAction(action.value)}
  onDismiss={() => setOpen(false)}
/>`,
    preview:
      `╭──────────────────────────────────╮\n` +
      `│ Deploy to production?            │\n` +
      `├──────────────────────────────────┤\n` +
      `│                                  │\n` +
      `│ Changes will go live for users.  │\n` +
      `│                                  │\n` +
      `├──────────────────────────────────┤\n` +
      `│                 Cancel  Confirm  │\n` +
      `╰──────────────────────────────────╯`,
  },
  {
    slug: 'toast',
    name: 'Toast',
    description:
      'Auto-dismissing notification messages with success, warning, error, and info variants. Includes a useToast hook for managing a queue.',
    props: [
      { name: 'message',   type: 'string',                                         required: true,       description: 'Notification text' },
      { name: 'variant',   type: "'success' | 'warning' | 'error' | 'info'",       default: "'info'",    description: 'Color and icon style' },
      { name: 'duration',  type: 'number',                                         default: '3000',      description: 'ms before auto-dismiss. 0 = permanent' },
      { name: 'onDismiss', type: '() => void',                                     default: 'undefined', description: 'Called when dismissed' },
      { name: 'theme',     type: 'InkUITheme',                                     default: 'darkTheme', description: 'Color theme' },
    ],
    usage: `import { useToast, ToastStack } from './components/ui/toast';

export default function App() {
  const { toasts, show, dismiss } = useToast();
  return (
    <>
      <MyApp onAction={() => show('Deployed!', 'success')} />
      <ToastStack toasts={toasts} onDismiss={dismiss} />
    </>
  );
}`,
    preview:
      `✓ Deployed successfully!\n` +
      `⚠ 3 deprecated packages\n` +
      `✕ Connection refused`,
  },

  {
    slug: 'status-indicator',
    name: 'StatusIndicator',
    description:
      'Animated dot indicator for displaying service or connection health. Six status states with optional pulse animation.',
    props: [
      { name: 'status', type: "'online' | 'offline' | 'loading' | 'warning' | 'error' | 'idle'", required: true, description: 'Current status value' },
      { name: 'label',  type: 'string',    required: true,       description: 'Description text shown next to the dot' },
      { name: 'pulse',  type: 'boolean',   default: 'auto',      description: 'Animate the dot. Auto-enabled for loading status' },
      { name: 'theme',  type: 'InkUITheme', default: 'darkTheme', description: 'Color theme' },
    ],
    usage: `import { StatusIndicator } from './components/ui/status-indicator';

<StatusIndicator status="online"  label="API Gateway" />
<StatusIndicator status="loading" label="Syncing database..." />
<StatusIndicator status="error"   label="Redis connection failed" />
<StatusIndicator status="offline" label="CDN node 3" />`,
    preview:
      `● API Gateway    online\n` +
      `◌ Database       syncing\n` +
      `○ CDN node       offline`,
  },

  {
    slug: 'loading-bar',
    name: 'LoadingBar',
    description:
      'Slim loading bar that supports both indeterminate (bouncing) and determinate (value-based) modes.',
    props: [
      { name: 'value', type: 'number',    default: 'undefined', description: '0–100. Omit for indeterminate bounce mode' },
      { name: 'width', type: 'number',    default: 'auto',      description: 'Bar width in columns. Defaults to terminal width' },
      { name: 'color', type: 'string',    default: 'theme primary', description: 'Bar fill color — hex or named color' },
      { name: 'theme', type: 'InkUITheme', default: 'darkTheme', description: 'Color theme' },
    ],
    usage: `import { LoadingBar } from './components/ui/loading-bar';

// Indeterminate — bouncing fill
<LoadingBar />

// Determinate
<LoadingBar value={progress} />
<LoadingBar value={65} width={40} color="#A855F7" />`,
    preview:
      `▓▓▓▓▓▓▓▓░░░░░░░░ 52%\n` +
      `▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ 100%`,
  },

  {
    slug: 'confirm',
    name: 'Confirm',
    description:
      'Simple y/N confirmation prompt. Supports a configurable default value and resolves to a static confirmation line after input.',
    props: [
      { name: 'message',      type: 'string',    required: true,       description: 'Question to display' },
      { name: 'defaultValue', type: 'boolean',   default: 'false',     description: 'true = Y default, false = N default' },
      { name: 'onConfirm',    type: '() => void', required: true,      description: 'Called when user confirms' },
      { name: 'onCancel',     type: '() => void', default: 'undefined', description: 'Called when user cancels' },
      { name: 'theme',        type: 'InkUITheme', default: 'darkTheme', description: 'Color theme' },
    ],
    usage: `import { Confirm } from './components/ui/confirm';

<Confirm
  message="Deploy to production?"
  defaultValue={false}
  onConfirm={deploy}
  onCancel={() => setStep('cancelled')}
/>`,
    preview:
      `? Deploy to production? (y/N) █`,
  },

  {
    slug: 'key-hint',
    name: 'KeyHint',
    description:
      'Displays a row of keyboard shortcut hints in [key] label format. Commonly placed at the bottom of interactive components.',
    props: [
      { name: 'keys',  type: '{ key: string; label: string }[]', required: true, description: 'Array of hint items' },
      { name: 'theme', type: 'InkUITheme', default: 'darkTheme', description: 'Color theme' },
    ],
    usage: `import { KeyHint } from './components/ui/key-hint';

<KeyHint keys={[
  { key: '↑↓',    label: 'Navigate' },
  { key: 'Enter', label: 'Select'   },
  { key: 'Esc',   label: 'Cancel'   },
]} />`,
    preview:
      `[↑↓] Navigate  [Enter] Select\n` +
      `[Esc] Cancel`,
  },

  {
    slug: 'divider',
    name: 'Divider',
    description:
      'Full-width horizontal separator with four line styles and an optional centered title. Auto-sizes to terminal width.',
    props: [
      { name: 'title', type: 'string',   default: 'undefined',  description: 'Optional label displayed in the center of the line' },
      { name: 'style', type: "'single' | 'double' | 'dashed' | 'bold'", default: "'single'", description: 'Line character style' },
      { name: 'width', type: 'number',   default: 'auto',       description: 'Total width in columns' },
      { name: 'theme', type: 'InkUITheme', default: 'darkTheme', description: 'Color theme' },
    ],
    usage: `import { Divider } from './components/ui/divider';

<Divider />
<Divider style="double" />
<Divider style="dashed" />
<Divider title="Configuration" />`,
    preview:
      `── Config ─────────────────\n` +
      `══════════════════════════`,
  },

  {
    slug: 'header',
    name: 'Header',
    description:
      'Application header bar with title, optional version string and subtitle. Three visual styles: box, line, and filled.',
    props: [
      { name: 'title',    type: 'string',  required: true,       description: 'Application name' },
      { name: 'version',  type: 'string',  default: 'undefined', description: 'Version string — displayed as v{version}' },
      { name: 'subtitle', type: 'string',  default: 'undefined', description: 'Second line inside box or below line' },
      { name: 'style',    type: "'box' | 'line' | 'filled'", default: "'box'", description: 'Visual style' },
      { name: 'align',    type: "'left' | 'center'", default: "'left'", description: 'Title alignment' },
      { name: 'theme',    type: 'InkUITheme', default: 'darkTheme', description: 'Color theme' },
    ],
    usage: `import { Header } from './components/ui/header';

<Header title="MyApp" version="1.2.0" style="box" subtitle="Deploy tool" />
<Header title="MyApp" version="1.2.0" style="line" />
<Header title="MyApp" style="filled" />`,
    preview:
      `┌─── MyApp v1.0 ──────────┐\n` +
      `│ Deploy tool             │\n` +
      `└─────────────────────────┘`,
  },
];

export const COMPONENT_MAP = Object.fromEntries(
  COMPONENTS.map((c) => [c.slug, c]),
);
