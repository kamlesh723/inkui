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

  // ─── Phase 3A — Layout & Navigation ────────────────────────────────────────

  {
    slug: 'scroll-area',
    name: 'ScrollArea',
    description: 'Scrollable content region with a visible scrollbar track, keyboard navigation, and configurable height.',
    props: [
      { name: 'height',        type: 'number',    required: true,       description: 'Visible height in rows' },
      { name: 'scrollbar',     type: 'boolean',   default: 'true',      description: 'Show/hide the scrollbar' },
      { name: 'scrollbarChar', type: 'string',    default: "'█'",       description: 'Scrollbar thumb character' },
      { name: 'trackChar',     type: 'string',    default: "'░'",       description: 'Scrollbar track character' },
      { name: 'onScroll',      type: '(offset: number, total: number) => void', default: 'undefined', description: 'Called on scroll' },
      { name: 'focus',         type: 'boolean',   default: 'true',      description: 'Accept keyboard input' },
      { name: 'theme',         type: 'InkUITheme', default: 'darkTheme', description: 'Color theme' },
    ],
    usage: `import { ScrollArea } from './components/ui/scroll-area';

const items = Array.from({ length: 50 }, (_, i) => <Text key={i}>Line {i + 1}</Text>);

<ScrollArea height={10}>{items}</ScrollArea>`,
    preview: 'Line 1\nLine 2\nLine 3\nLine 4\nLine 5  █',
  },

  {
    slug: 'tabs',
    name: 'Tabs',
    description: 'Keyboard-navigable tab panels with underline, boxed, and pills variants. Supports disabled tabs and badge counts.',
    props: [
      { name: 'tabs',      type: 'TabItem[]',  required: true,       description: 'Array of { key, label, content, disabled?, badge? }' },
      { name: 'activeKey', type: 'string',     default: 'first tab', description: 'Controlled active tab key' },
      { name: 'onChange',  type: '(key: string) => void', default: 'undefined', description: 'Called when active tab changes' },
      { name: 'variant',   type: "'underline' | 'boxed' | 'pills'", default: "'underline'", description: 'Visual style' },
      { name: 'position',  type: "'top' | 'bottom'", default: "'top'", description: 'Tab bar position' },
      { name: 'focus',     type: 'boolean',    default: 'true',      description: 'Accept keyboard input' },
      { name: 'theme',     type: 'InkUITheme', default: 'darkTheme', description: 'Color theme' },
    ],
    usage: `import { Tabs } from './components/ui/tabs';

<Tabs
  tabs={[
    { key: 'files',   label: 'Files',   content: <FileTree /> },
    { key: 'logs',    label: 'Logs',    content: <LogView />, badge: 3 },
    { key: 'config',  label: 'Config',  content: <Config />, disabled: true },
  ]}
  activeKey={activeTab}
  onChange={setActiveTab}
/>`,
    preview: 'Files  Logs(3)  Config\n──────────────────\ncontent area',
  },

  {
    slug: 'accordion',
    name: 'Accordion',
    description: 'Expandable/collapsible sections with keyboard navigation. Supports single or multiple open sections.',
    props: [
      { name: 'items',       type: 'AccordionItem[]', required: true,  description: 'Array of { key, title, content, disabled?, defaultOpen? }' },
      { name: 'multiple',    type: 'boolean',   default: 'false',      description: 'Allow multiple sections open at once' },
      { name: 'borderStyle', type: "'single' | 'rounded' | 'none'", default: "'single'", description: 'Border around sections' },
      { name: 'focus',       type: 'boolean',   default: 'true',       description: 'Accept keyboard input' },
      { name: 'theme',       type: 'InkUITheme', default: 'darkTheme', description: 'Color theme' },
    ],
    usage: `import { Accordion } from './components/ui/accordion';

<Accordion
  items={[
    { key: 'db',  title: 'Database Config', content: <DBForm /> },
    { key: 'api', title: 'API Settings',    content: <APIForm />, defaultOpen: true },
  ]}
/>`,
    preview: '▾ API Settings\n│ base: https://api.example.com\n▸ Database Config',
  },

  // ─── Phase 3B — AI-Era Components ────────────────────────────────────────────

  {
    slug: 'streaming-text',
    name: 'StreamingText',
    description: 'Renders text token-by-token as it streams in from an LLM, with a blinking cursor at the insertion point.',
    props: [
      { name: 'text',       type: 'string',    required: true,        description: 'Current text content (grows as tokens arrive)' },
      { name: 'streaming',  type: 'boolean',   default: 'true',       description: 'Show cursor while true, hide on false' },
      { name: 'cursorChar', type: 'string',    default: "'█'",        description: 'Cursor character' },
      { name: 'cursorInterval', type: 'number', default: '500',       description: 'Cursor blink interval in ms' },
      { name: 'onComplete', type: '() => void', default: 'undefined', description: 'Fired when streaming transitions false→true' },
      { name: 'theme',      type: 'InkUITheme', default: 'darkTheme', description: 'Color theme' },
    ],
    usage: `import { StreamingText } from './components/ui/streaming-text';

const [text, setText] = useState('');
const [streaming, setStreaming] = useState(true);

// Push tokens as they arrive from the LLM
onToken((token) => setText((t) => t + token));
onDone(() => setStreaming(false));

<StreamingText text={text} streaming={streaming} onComplete={() => setStep('done')} />`,
    preview: '◆ Analyzing your codebase..._',
  },

  {
    slug: 'token-counter',
    name: 'TokenCounter',
    description: 'Visual token usage display with a budget bar that shifts from green → yellow → red as usage grows.',
    props: [
      { name: 'used',      type: 'number',    required: true,        description: 'Tokens used' },
      { name: 'limit',     type: 'number',    required: true,        description: 'Token budget limit' },
      { name: 'model',     type: 'string',    default: 'undefined',  description: 'Model name label' },
      { name: 'variant',   type: "'compact' | 'detailed' | 'minimal'", default: "'compact'", description: 'Display style' },
      { name: 'warnAt',    type: 'number',    default: '0.6',        description: 'Warning threshold (0–1)' },
      { name: 'errorAt',   type: 'number',    default: '0.8',        description: 'Error threshold (0–1)' },
      { name: 'showCost',  type: 'boolean',   default: 'false',      description: 'Show estimated cost' },
      { name: 'theme',     type: 'InkUITheme', default: 'darkTheme', description: 'Color theme' },
    ],
    usage: `import { TokenCounter } from './components/ui/token-counter';

<TokenCounter used={2048} limit={4096} model="gpt-4o" variant="detailed" />`,
    preview: 'gpt-4o  ████████░░░░ 2048/4096\n50% used · ~2,048 remaining',
  },

  {
    slug: 'code-block',
    name: 'CodeBlock',
    description: 'Syntax-highlighted code with line numbers, a title bar, and a built-in regex tokenizer. No external deps.',
    props: [
      { name: 'code',             type: 'string',   required: true,       description: 'Source code to display' },
      { name: 'language',         type: 'string',   default: "'text'",    description: 'Language for syntax highlighting' },
      { name: 'title',            type: 'string',   default: 'undefined', description: 'Title shown in the top border' },
      { name: 'showLineNumbers',  type: 'boolean',  default: 'true',      description: 'Show line number gutter' },
      { name: 'showBorder',       type: 'boolean',  default: 'true',      description: 'Show outer border' },
      { name: 'highlightLines',   type: 'number[]', default: '[]',        description: 'Lines to highlight' },
      { name: 'theme',            type: 'InkUITheme', default: 'darkTheme', description: 'Color theme' },
    ],
    usage: `import { CodeBlock } from './components/ui/code-block';

<CodeBlock
  code={src}
  language="typescript"
  title="server.ts"
  highlightLines={[3, 4]}
/>`,
    preview: '╭─ server.ts ────────────╮\n│ 1 │ import express      │\n│ 2 │ const app = express │\n╰────────────────────────╯',
  },

  {
    slug: 'diff-view',
    name: 'DiffView',
    description: 'Unified diff viewer using a built-in LCS algorithm. Highlights added/removed lines with context.',
    props: [
      { name: 'before',        type: 'string',  required: true,       description: 'Original text' },
      { name: 'after',         type: 'string',  required: true,       description: 'Modified text' },
      { name: 'contextLines',  type: 'number',  default: '2',         description: 'Lines of context around changes' },
      { name: 'showLineNumbers', type: 'boolean', default: 'true',    description: 'Show line numbers' },
      { name: 'showBorder',    type: 'boolean', default: 'true',      description: 'Show outer border' },
      { name: 'theme',         type: 'InkUITheme', default: 'darkTheme', description: 'Color theme' },
    ],
    usage: `import { DiffView } from './components/ui/diff-view';

<DiffView before={oldContent} after={newContent} contextLines={3} />`,
    preview: '@@ -1,3 +1,4 @@\n  import express\n- const PORT = 3000\n+ const PORT = process.env.PORT',
  },

  {
    slug: 'typewriter',
    name: 'Typewriter',
    description: 'Character-by-character text animation with configurable speed, start delay, and optional loop.',
    props: [
      { name: 'text',       type: 'string',    required: true,        description: 'Text to animate' },
      { name: 'speed',      type: 'number',    default: '50',         description: 'ms per character' },
      { name: 'delay',      type: 'number',    default: '0',          description: 'ms before starting' },
      { name: 'loop',       type: 'boolean',   default: 'false',      description: 'Restart after completion' },
      { name: 'playing',    type: 'boolean',   default: 'true',       description: 'false = show full text immediately' },
      { name: 'onComplete', type: '() => void', default: 'undefined', description: 'Fired when animation finishes' },
      { name: 'theme',      type: 'InkUITheme', default: 'darkTheme', description: 'Color theme' },
    ],
    usage: `import { Typewriter } from './components/ui/typewriter';

<Typewriter text="Welcome to InkUI." speed={60} loop onComplete={() => {}} />`,
    preview: 'Welcome to InkUI._',
  },

  // ─── Phase 3C — Data & Power Components ──────────────────────────────────────

  {
    slug: 'tree-view',
    name: 'TreeView',
    description: 'Hierarchical collapsible tree with keyboard navigation, guide lines, and icon support.',
    props: [
      { name: 'nodes',      type: 'TreeNode[]', required: true,       description: 'Array of { id, label, children?, icon?, disabled? }' },
      { name: 'expanded',   type: 'Set<string>', default: 'new Set()', description: 'Controlled set of expanded node IDs' },
      { name: 'onExpand',   type: '(id: string) => void', default: 'undefined', description: 'Called on expand' },
      { name: 'onCollapse', type: '(id: string) => void', default: 'undefined', description: 'Called on collapse' },
      { name: 'onSelect',   type: '(id: string) => void', default: 'undefined', description: 'Called when leaf is selected' },
      { name: 'focus',      type: 'boolean',   default: 'true',       description: 'Accept keyboard input' },
      { name: 'theme',      type: 'InkUITheme', default: 'darkTheme', description: 'Color theme' },
    ],
    usage: `import { TreeView } from './components/ui/tree-view';

<TreeView
  nodes={[
    { id: 'src', label: 'src/', children: [
      { id: 'index', label: 'index.ts' },
      { id: 'utils', label: 'utils.ts' },
    ]},
  ]}
  onSelect={(id) => openFile(id)}
/>`,
    preview: '▾ src/\n  ├ index.ts\n  └ utils.ts',
  },

  {
    slug: 'autocomplete',
    name: 'Autocomplete',
    description: 'Text input with a live-filtered dropdown. Tab-to-complete, arrow keys to navigate, Esc to clear.',
    props: [
      { name: 'options',    type: 'string[]',  required: true,        description: 'Full option list to filter' },
      { name: 'value',      type: 'string',    required: true,        description: 'Controlled input value' },
      { name: 'onChange',   type: '(v: string) => void', required: true, description: 'Called on each keystroke' },
      { name: 'onSelect',   type: '(v: string) => void', default: 'undefined', description: 'Called when option is chosen' },
      { name: 'label',      type: 'string',    default: 'undefined',  description: 'Input label' },
      { name: 'maxSuggestions', type: 'number', default: '5',         description: 'Max visible suggestions' },
      { name: 'focus',      type: 'boolean',   default: 'true',       description: 'Accept keyboard input' },
      { name: 'theme',      type: 'InkUITheme', default: 'darkTheme', description: 'Color theme' },
    ],
    usage: `import { Autocomplete } from './components/ui/autocomplete';

<Autocomplete
  label="Package"
  options={['react', 'react-dom', 'react-query', 'react-router']}
  value={pkg}
  onChange={setPkg}
  onSelect={(v) => install(v)}
/>`,
    preview: '? Package: rea█\n❯ react\n  react-dom\n  react-query',
  },

  {
    slug: 'stepper',
    name: 'Stepper',
    description: 'Multi-step wizard progress indicator. Purely presentational — the parent controls the active step.',
    props: [
      { name: 'steps',       type: 'StepItem[]',  required: true,      description: 'Array of { key, label, description? }' },
      { name: 'activeStep',  type: 'string',      required: true,      description: 'Key of the current step' },
      { name: 'completed',   type: 'string[]',    default: '[]',       description: 'Keys of completed steps' },
      { name: 'errors',      type: 'string[]',    default: '[]',       description: 'Keys of error steps' },
      { name: 'orientation', type: "'horizontal' | 'vertical'", default: "'horizontal'", description: 'Layout direction' },
      { name: 'theme',       type: 'InkUITheme',  default: 'darkTheme', description: 'Color theme' },
    ],
    usage: `import { Stepper } from './components/ui/stepper';

<Stepper
  steps={[
    { key: 'install',   label: 'Install'   },
    { key: 'configure', label: 'Configure' },
    { key: 'deploy',    label: 'Deploy'    },
  ]}
  activeStep="configure"
  completed={['install']}
/>`,
    preview: '✓ ── ● ── ○\nInstall Configure Deploy',
  },

  {
    slug: 'data-table',
    name: 'DataTable',
    description: 'Interactive data table with row selection, column sorting, text search filtering, and pagination.',
    props: [
      { name: 'columns',     type: 'DataColumn<T>[]', required: true,   description: 'Array of { key, header, sortable?, width? }' },
      { name: 'data',        type: 'T[]',             required: true,   description: 'Row data array' },
      { name: 'pageSize',    type: 'number',          default: '10',    description: 'Rows per page' },
      { name: 'selectable',  type: 'boolean',         default: 'false', description: 'Enable row selection' },
      { name: 'onSelect',    type: '(row: T) => void', default: 'undefined', description: 'Called when row is selected' },
      { name: 'focus',       type: 'boolean',         default: 'true',  description: 'Accept keyboard input' },
      { name: 'theme',       type: 'InkUITheme',      default: 'darkTheme', description: 'Color theme' },
    ],
    usage: `import { DataTable } from './components/ui/data-table';

<DataTable
  columns={[
    { key: 'name',   header: 'Process', sortable: true },
    { key: 'cpu',    header: 'CPU',     sortable: true },
    { key: 'status', header: 'Status' },
  ]}
  data={processes}
  pageSize={5}
  selectable
  onSelect={(row) => inspect(row)}
/>`,
    preview: '┌──────────┬───────┐\n│ nginx    │ 2.1%  │\n│ node     │ 8.4%  │\n└──────────┴───────┘',
  },

  {
    slug: 'gauge',
    name: 'Gauge',
    description: 'Metric gauge with automatic color thresholds. Switches from success → warning → error as value rises.',
    props: [
      { name: 'value',      type: 'number',    required: true,        description: 'Current value (0–max)' },
      { name: 'max',        type: 'number',    default: '100',        description: 'Maximum value' },
      { name: 'label',      type: 'string',    default: 'undefined',  description: 'Metric label' },
      { name: 'variant',    type: "'bar' | 'arc' | 'ring'", default: "'bar'", description: 'Visual style' },
      { name: 'thresholds', type: '{ warn: number; error: number }', default: '{ warn: 0.6, error: 0.8 }', description: 'Color change points (0–1)' },
      { name: 'theme',      type: 'InkUITheme', default: 'darkTheme', description: 'Color theme' },
    ],
    usage: `import { Gauge } from './components/ui/gauge';

<Gauge value={cpuUsage} max={100} label="CPU" thresholds={{ warn: 0.6, error: 0.8 }} />`,
    preview: 'CPU  ████████████░░░░ 72%\n     ⚡ Warning',
  },

  {
    slug: 'sparkline',
    name: 'Sparkline',
    description: 'Inline mini chart using Unicode block characters ▁▂▃▄▅▆▇█. Downsamples automatically for wide data.',
    props: [
      { name: 'data',    type: 'number[]',  required: true,        description: 'Array of numeric values' },
      { name: 'width',   type: 'number',    default: 'auto',       description: 'Chart width in columns' },
      { name: 'label',   type: 'string',    default: 'undefined',  description: 'Label shown before the chart' },
      { name: 'color',   type: 'string',    default: 'theme success', description: 'Bar color' },
      { name: 'theme',   type: 'InkUITheme', default: 'darkTheme', description: 'Color theme' },
    ],
    usage: `import { Sparkline } from './components/ui/sparkline';

<Sparkline data={[3, 6, 4, 8, 5, 7, 2, 9, 4, 6]} label="req/s" />`,
    preview: 'req/s  ▁▃▅▇█▆▄▂▃▅▇▆',
  },

  {
    slug: 'markdown',
    name: 'Markdown',
    description: 'Terminal Markdown renderer. Handles headings, lists, bold/italic, inline code, code blocks, and blockquotes.',
    props: [
      { name: 'children', type: 'string',    required: true,        description: 'Markdown source text' },
      { name: 'theme',    type: 'InkUITheme', default: 'darkTheme', description: 'Color theme' },
    ],
    usage: `import { Markdown } from './components/ui/markdown';

const md = \`
# Getting Started

Install with \\\`npx inkui add spinner\\\`.

> Copy once, own forever.

- Run the command
- **Import** the component
\`;

<Markdown>{md}</Markdown>`,
    preview: '# Getting Started\n> blockquote here\n- **bold** and `code`',
  },

  {
    slug: 'json-viewer',
    name: 'JSONViewer',
    description: 'Interactive JSON explorer with collapsible nodes, syntax coloring, and vim-style keyboard navigation.',
    props: [
      { name: 'data',         type: 'any',       required: true,        description: 'JSON data to display (required)' },
      { name: 'initialDepth', type: 'number',    default: '1',          description: 'Auto-expand depth' },
      { name: 'maxHeight',    type: 'number',    default: 'undefined',  description: 'Max visible rows' },
      { name: 'showTypes',    type: 'boolean',   default: 'false',      description: 'Show type annotations' },
      { name: 'showIndices',  type: 'boolean',   default: 'true',       description: 'Show array indices' },
      { name: 'rootLabel',    type: 'string',    default: "'root'",     description: 'Root node label' },
      { name: 'focus',        type: 'boolean',   default: 'true',       description: 'Accept keyboard input' },
      { name: 'theme',        type: 'InkUITheme', default: 'darkTheme', description: 'Color theme' },
    ],
    usage: `import { JSONViewer } from './components/ui/json-viewer';

<JSONViewer
  data={{ name: 'InkUI', version: '0.4.0', config: { debug: false, port: 3000 } }}
  initialDepth={2}
  rootLabel="config"
/>`,
    preview: '▾ root\n  "name": "InkUI"\n  ▾ "config": {...}\n    "port": 3000',
  },
];

export const COMPONENT_MAP = Object.fromEntries(
  COMPONENTS.map((c) => [c.slug, c]),
);
