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
      { name: 'theme',    type: 'InkUITheme',   default: 'darkTheme',   description: 'Color theme — import darkTheme or lightTheme from @inkui/core' },
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
      `│ @inkui/spinner       │  0.1.0  │    837 B │\n` +
      `│ @inkui/table         │  0.1.0  │   3.9 KB │\n` +
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
      { name: 'borderStyle', type: 'BorderStyle',   default: "'rounded'", description: 'Border style key from @inkui/core' },
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
];

export const COMPONENT_MAP = Object.fromEntries(
  COMPONENTS.map((c) => [c.slug, c]),
);
