# InkUI — Phase 2 Implementation Guide
### From "published library" to "product people actually use"

---

## YOUR CURRENT STATE (confirmed)

✅ 8 components built: Spinner, Badge, ProgressBar, TextInput, Select, MultiSelect, Table, Dialog  
✅ Published to npm under `@inkui-cli` scope (10 packages: 8 components + core + CLI)  
✅ GitHub repo live at kamlesh723/inkui with CI/CD  
✅ All commits under your name (no Claude traces)  
✅ Demo GIF recorded  

## WHAT'S NEXT (in order)


2. **Docs Website** — the shadcn-like site that makes people trust InkUI
3. **New Components** — the ones that make InkUI special
4. **Showcase Projects** — proof that InkUI builds real things
5. **Community + Launch** — how to get stars and users

---



## PART 1: THE DOCS WEBSITE

### Design Philosophy

Your site must feel like a **terminal brought to life on the web**. Not a dark-themed generic docs site — a site where every pixel feels like the terminal.

**Reference sites to study:**
- charm.sh — THIS is the exact vibe. Terminal tool company, terminal aesthetic on the web.
- ui.shadcn.com — Gold standard for component library docs. Study: sidebar, copy buttons, clean layout.
- magicui.design — Study: landing page animations, component previews.
- fumadocs.vercel.app — Study: this is actually what you'll build the docs on.

---

### Color Palette & Visual Identity

```
Background:        #0A0A0B   (near-black, like a real terminal)
Surface:           #141417   (cards, sidebars)
Surface hover:     #1C1C21
Border:            #27272A   (subtle — zinc-800)
Text primary:      #FAFAFA   (almost white)
Text secondary:    #A1A1AA   (zinc-400, muted)
Text muted:        #71717A   (zinc-500)

Accent primary:    #06B6D4   (cyan-500 — terminal cyan, your signature color)
Accent secondary:  #A855F7   (purple-500)
Accent success:    #22C55E   (green-500)
Accent warning:    #EAB308   (yellow-500)
Accent error:      #EF4444   (red-500)

Code background:   #18181B
Code border:       #27272A

Hero gradient:     cyan-500 → purple-500 (the InkUI signature gradient)
Glow effect:       rgba(6, 182, 212, 0.15) spread behind terminal mockup
```

### Typography

```
Headings:     "Geist Sans" — next/font/google (clean, modern, Vercel's font)
Body:         "Geist Sans"
Code:         "Geist Mono" — next/font/google (monospace — this is a terminal library)
Fallbacks:    system-ui, monospace (always set these for SSR flash prevention)
```

---

### Tech Stack — Exact Versions

```
Framework:         Next.js 15 (App Router) — canary has React 19 issues, use latest stable
Styling:           Tailwind CSS v4 — config via @theme in CSS, NO tailwind.config.js
Docs engine:       Fumadocs (fumadocs.vercel.app) — built for component library docs
Animations:        Framer Motion v11
Syntax highlight:  Shiki v1 (not v0 — different API)
Terminal preview:  Termynal.js (2KB, CSS/JS typewriter) for hero + component demos
                   asciinema-player only if you need full TTY recordings
Icons:             Lucide React
Search:            Pagefind (zero-config, static, free, works on Vercel)
OG Images:         @vercel/og (dynamic per-page social cards)
Analytics:         Vercel Analytics (one line, free)
Fonts:             next/font/google for Geist Sans + Geist Mono
Deploy:            Vercel
Domain:            inkui.dev (or what you have from Hostinger)
```

**Why Fumadocs over others:**
- Contentlayer is unmaintained and broken on Next.js 15 — DO NOT USE
- next-mdx-remote works but requires wiring up your own sidebar, search, TOC
- Fumadocs gives you sidebar, search, MDX, TOC, breadcrumbs, copy buttons out of the box
- Built specifically for component library docs — looks exactly like what you want

---

### Monorepo Update — Do This First

Your monorepo currently only has `packages/*` in workspaces. The docs app goes in `apps/`.

**Tell Claude Code:**

```
Update the monorepo to support the docs app:

1. Update root package.json workspaces:
   "workspaces": ["packages/*", "apps/*"]

2. Update turbo.json to add a docs pipeline:
   {
     "tasks": {
       "build": {
         "dependsOn": ["^build"],
         "outputs": [".next/**", "!.next/cache/**", "dist/**"]
       },
       "dev": {
         "cache": false,
         "persistent": true
       },
       "lint": {},
       "type-check": {}
     }
   }

3. Create apps/ directory with a .gitkeep

4. Verify `pnpm install` still works from root after changes.
```

---

### Site Structure — Every Page

```
inkui.dev/
├── /                          (landing page — this is everything)
├── /docs
│   ├── /introduction
│   ├── /installation
│   ├── /theming
│   └── /cli
├── /components
│   ├── /spinner
│   ├── /badge
│   ├── /progress-bar
│   ├── /text-input
│   ├── /select
│   ├── /multi-select
│   ├── /table
│   ├── /dialog
│   ├── /toast            (new)
│   ├── /status-indicator (new)
│   ├── /loading-bar      (new)
│   ├── /confirm          (new)
│   ├── /key-hint         (new)
│   ├── /divider          (new)
│   └── /header           (new)
├── /showcase              (real projects built with InkUI)
└── /github                (redirect → github.com/kamlesh723/inkui)
```

Note: `/themes` removed from v1 — it's listed in other guides but adds complexity without payoff. Add it in v2.

---

## PAGE 1: LANDING PAGE (/) — THIS IS EVERYTHING

The landing page decides whether people use InkUI. 80% of your marketing happens here. Most visitors decide in under 5 seconds.

---

### Section 1: Hero

```
Layout:     Full viewport height, content centered vertically + horizontally
Background: Subtle dot grid pattern (CSS background-image: radial-gradient)
            with a very faint scanline overlay (CSS repeating-linear-gradient)

Content stack (top to bottom):
  1. Small badge: "8+ Components · TypeScript · Open Source"
     Style: pill shape, border cyan-500/30, text cyan-400, bg cyan-500/5

  2. Heading: "Beautiful UI components for the terminal"
     Style: 4xl-6xl, font-bold, white
     The word "terminal" gets the cyan→purple gradient text effect

  3. Sub-heading: "shadcn/ui, but for CLIs. Copy-paste components.
                   TypeScript. Built on Ink."
     Style: lg, text-zinc-400, max-w-xl

  4. Two buttons side by side:
     [Get Started →]   → /docs/introduction
     [GitHub]          → github.com/kamlesh723/inkui
     Style: primary btn = solid cyan-500, secondary = ghost with border

  5. Animated terminal window (the money shot)
     See "Terminal Mockup" section below for full spec

Animation:
  - Badge fades in first (0.2s delay)
  - Heading slides up (0.3s delay)
  - Sub-heading slides up (0.4s delay)
  - Buttons fade in (0.5s delay)
  - Terminal window fades in + slides up (0.6s delay)
  All use Framer Motion: initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
```

**Terminal Mockup in Hero:**

```
This is a fake terminal built with CSS — NOT xterm.js (too heavy for hero).
Use Termynal.js or a custom React component.

Visual structure:
  ┌─────────────────────────────────────────────────┐
  │ ● ● ●  ~/my-cli                                 │  ← traffic light dots + path
  ├─────────────────────────────────────────────────┤
  │                                                  │
  │  $ npx inkui add spinner table select            │  ← types out character by character
  │                                                  │
  │  ✔ Added spinner                                 │  ← appears after typing
  │  ✔ Added table                                   │
  │  ✔ Added select                                  │
  │                                                  │
  │  ⠹ Loading data...                               │  ← spinner animates
  │                                                  │
  │  ┌─────────────────────────────┐                 │
  │  │ Name       Status   Score   │                 │  ← table appears
  │  ├─────────────────────────────┤                 │
  │  │ Kamlesh    Active   98/100  │                 │
  │  │ Priya      Active   87/100  │                 │
  │  └─────────────────────────────┘                 │
  │                                                  │
  └─────────────────────────────────────────────────┘

Styling:
  bg: #0D0D10
  border: 1px solid #27272A
  border-radius: 10px
  box-shadow: 0 0 60px rgba(6, 182, 212, 0.12), 0 25px 50px rgba(0,0,0,0.5)
  (the cyan glow is the signature effect — subtle but makes it pop)

Animation sequence (Termynal or custom):
  1. $ types out slowly (50ms per char)
  2. ✔ Added lines appear one by one (300ms apart)
  3. Spinner renders and actually spins (CSS animation)
  4. Table draws line by line
  5. Sequence loops after 3 second pause
```

---

### Section 2: Stats Bar

```
A single row of 4 stats, separated by thin vertical lines:

  8+ Components  |  10 npm packages  |  TypeScript  |  Open Source

Style: subtle, text-zinc-400, centered, py-8
```

---

### Section 3: Component Showcase Grid

```
A grid of mini terminal cards — one per component (8 cards + placeholders for new ones).

Each card:
  ┌──────────────────┐
  │ ● ● ●           │  ← traffic light dots (5px circles)
  │                  │
  │   [component]    │  ← actual rendered output (ASCII art simulation)
  │                  │
  │  Spinner         │  ← component name
  │  Loading states  │  ← one-line description
  └──────────────────┘

Grid: 2 cols on mobile, 3 cols on tablet, 4 cols on desktop
Hover: translateY(-4px), border-color changes from zinc-800 to cyan-500/50
       box-shadow appears: 0 8px 30px rgba(6, 182, 212, 0.1)
Click: navigates to /components/[slug]

Cards content per component:
  Spinner:      ⠹ Loading...
  Badge:        ● Active  ✖ Error  ⚠ Warning
  ProgressBar:  ████████░░░░ 67%
  TextInput:    > Enter name: Kamlesh_
  Select:       ❯ Option 1 / Option 2 / Option 3
  MultiSelect:  [✔] Item 1  [✔] Item 3  [ ] Item 2
  Table:        mini 3x2 table with box chars
  Dialog:       ┌─ Confirm ─┐ / │ Delete?  │ / └──────────┘
```

---

### Section 4: Features Grid

```
Heading: "Everything you need to build beautiful CLIs"

6 feature cards in a 3x2 grid (2x3 on mobile):

1. "Copy & Paste"
   Icon: Copy (Lucide)
   "Own the code. Every component is copied into your project.
    No black-box dependency. Modify anything."

2. "TypeScript First"
   Icon: Code (Lucide)
   "Full type safety. Generics for Table<T> and Select<T>.
    IntelliSense that actually works in terminal apps."

3. "Theme Everything"
   Icon: Palette (Lucide)
   "Dark and light themes built in. Customize every color,
    border style, and spacing token."

4. "8+ Components"
   Icon: Layers (Lucide)
   "Spinner, Badge, ProgressBar, TextInput, Select, MultiSelect,
    Table, Dialog — and growing fast."

5. "Battle-tested Renderer"
   Icon: Terminal (Lucide)
   "Built on Ink, the React renderer used by Vercel, Prisma,
    and Gatsby CLIs."

6. "One Command Install"
   Icon: Zap (Lucide)
   "npx inkui add table. Copies the component into your project.
    That's it."

Card style:
  bg: #141417
  border: 1px solid #27272A
  padding: 24px
  border-radius: 8px
  Icon: 20px, cyan-500
  Title: white, font-semibold
  Body: text-zinc-400, text-sm
```

---

### Section 5: Code Example

```
Heading: "Simple API. Real results."

Split view (50/50 on desktop, stacked on mobile):

LEFT — Code editor panel:
  Language badge: "tsx" (top right of panel)
  Copy button: top right corner
  Shiki syntax highlighting with a dark terminal theme
  
  Code to show:
  ─────────────────────────────────────────────
  import { Select } from './components/ui/Select'
  
  export default function Deploy() {
    return (
      <Select
        label="Where to deploy?"
        items={[
          { label: 'AWS',     value: 'aws'     },
          { label: 'Vercel',  value: 'vercel'  },
          { label: 'Railway', value: 'railway' },
        ]}
        onSelect={(item) => deploy(item.value)}
      />
    )
  }
  ─────────────────────────────────────────────

RIGHT — Terminal output panel:
  Fake terminal (CSS, not xterm.js):
  bg: #0D0D10
  
  Content:
  ─────────────────────────────────────────────
  ? Where to deploy?

  ❯ AWS
    Vercel
    Railway

  Use ↑↓ to navigate, Enter to select
  ─────────────────────────────────────────────
  
  The selected item (AWS) should have cyan highlight.
  Optional: arrow keys "work" (CSS animation cycles through options).

Connector: a subtle arrow icon between the panels pointing right.
```

---

### Section 6: Install Banner

```
Full-width section, slightly different background (#0F0F12):

  "Start in seconds."

  ┌────────────────────────────────────────────────────┐
  │  $ npx inkui add spinner table select              │  [Copy]
  └────────────────────────────────────────────────────┘
  
  "Or install the package directly: npm install @inkui-cli/spinner"

The $ has text-zinc-600, the command text has text-cyan-400.
The cursor at the end blinks (CSS animation, 1s interval).
Copy button uses the Clipboard API — show a checkmark for 2s after copy.
```

---

### Section 7: Footer

```
Three columns:

Left:
  InkUI logo/wordmark
  "Beautiful UI components for the terminal."
  "Built by Kamlesh Yadav"

Middle — Links:
  Docs
  Components
  Changelog (link to GitHub releases)
  npm

Right — External:
  GitHub (with star count from GitHub API if possible)
  Twitter/X (if you have one)

Bottom bar:
  "Built with Ink, React, and TypeScript"
  "MIT License"

Copyright line: "© 2025 InkUI"
```

---

## PAGE 2: COMPONENT DOCS PAGES (/components/[slug])

Every component page has the exact same structure. Consistency = trust.

### Layout

```
┌─────────────────┬───────────────────────────────────────────┐
│                 │                                           │
│   SIDEBAR       │   MAIN CONTENT                           │
│   (fixed)       │   (scrollable)                           │
│                 │                                           │
│ Getting Started │  # Spinner                               │
│  Introduction   │  An animated loading indicator for       │
│  Installation   │  terminal apps.                          │
│  Theming        │                                          │
│  CLI            │  ┌─────────────────────────────────┐    │
│                 │  │  TERMINAL PREVIEW                │    │
│ Components      │  │  (Termynal animation)            │    │
│  ● Spinner      │  │  ⠹ Loading data...               │    │
│  ○ Badge        │  └─────────────────────────────────┘    │
│  ○ ProgressBar  │                                          │
│  ○ TextInput    │  ## Installation                         │
│  ○ Select       │  $ npx inkui add spinner        [Copy]  │
│  ○ MultiSelect  │                                          │
│  ○ Table        │  ## Usage                                │
│  ○ Dialog       │  ```tsx                                  │
│                 │  import { Spinner } from                 │
│ (new ones)      │    './components/ui/Spinner'             │
│  ○ Toast        │  ...                                     │
│  ○ StatusInd.   │  ```                                     │
│  ○ ...          │                                          │
│                 │  ## Props                                │
│                 │  [props table]                           │
│                 │                                          │
│                 │  ## Examples                             │
│                 │  [multiple examples with code]           │
│                 │                                          │
└─────────────────┴───────────────────────────────────────────┘

Sidebar: sticky, 240px wide, scrollable independently
Top of sidebar: Cmd+K search trigger ("Search docs...")
Current page: highlighted in cyan-500
Active section: shown with a left border indicator
```

### Every Component Page Has (in this order):

1. **Breadcrumb** — Components / Spinner
2. **Title** — "Spinner" (H1)
3. **Description** — One paragraph, what it does and when to use it
4. **Terminal Preview** — Termynal animation showing the component
5. **Installation** — `npx inkui add spinner` with copy button + npm fallback
6. **Usage** — Full code example with Shiki highlighting
7. **Props Table** — Manual MDX table (NOT auto-generated — too fragile)
8. **Examples** — 3-4 variants (basic, custom theme, different options)
9. **Source** — Link to GitHub file

### Props Table Format (manual MDX):

```mdx
| Prop    | Type                              | Default      | Description                    |
|---------|-----------------------------------|--------------|--------------------------------|
| label   | `string`                          | `undefined`  | Text shown next to spinner     |
| type    | `'dots' \| 'line' \| 'bounce'`   | `'dots'`     | Spinner animation style        |
| theme   | `InkUITheme`                      | `darkTheme`  | Theme object for colors        |
```

**Write these manually in MDX for every component. Do not attempt auto-generation from TypeScript — it will break and waste days.**

### Fumadocs Setup:

```
Tell Claude Code:
"Set up Fumadocs for the docs site in apps/docs.
Follow the Fumadocs Next.js setup guide exactly.
Use the source.config.ts approach (not the older setup).
The docs structure is:
  content/docs/introduction.mdx
  content/docs/installation.mdx
  content/docs/theming.mdx
  content/docs/cli.mdx
  content/components/spinner.mdx
  content/components/badge.mdx
  (etc for all 8 components)

Customize the Fumadocs theme to use InkUI colors:
  primary: cyan-500 (#06B6D4)
  background: #0A0A0B
  Use the CSS variable overrides Fumadocs supports.

Configure the sidebar to show 'Getting Started' group and
'Components' group separately."
```

---

## TERMINAL PREVIEW SYSTEM

### Use Termynal (not asciinema, not xterm.js) for v1

**Why:**
- asciinema-player = 500KB+, limited styling control, looks dated
- xterm.js = requires a backend PTY server, doesn't work on Vercel serverless
- Termynal = 2KB, pure CSS/JS, full design control, works everywhere

**How to implement:**

```tsx
// components/TerminalPreview.tsx
// A React wrapper for Termynal-style animations

type Line =
  | { type: 'input'; text: string }
  | { type: 'output'; text: string }
  | { type: 'progress' }
  | { type: 'blank' }

interface TerminalPreviewProps {
  lines: Line[]
  title?: string
}

// Renders a fake terminal that types out the lines in sequence.
// Input lines type character by character (40ms per char).
// Output lines fade in instantly.
// Progress line shows a CSS loading bar.
```

**For each component, define its lines in the MDX frontmatter or a data file:**

```ts
// lib/component-demos.ts

export const demos = {
  spinner: [
    { type: 'input', text: 'npx inkui add spinner' },
    { type: 'output', text: '✔ Added spinner' },
    { type: 'blank' },
    { type: 'output', text: '⠹ Loading data...' },
  ],
  select: [
    { type: 'output', text: '? Where to deploy?' },
    { type: 'blank' },
    { type: 'output', text: '❯ \x1b[36mAWS\x1b[0m' },
    { type: 'output', text: '  Vercel' },
    { type: 'output', text: '  Railway' },
    { type: 'blank' },
    { type: 'output', text: 'Use ↑↓ to navigate, Enter to select' },
  ],
  // ... for all 8 components
}
```

---

## SEARCH — PAGEFIND (do not skip this)

Cmd+K search is non-negotiable for a component library docs site in 2025. Add it in Week 1.

**Setup:**

```json
// package.json in apps/docs — add to scripts:
{
  "scripts": {
    "build": "next build",
    "postbuild": "npx pagefind --site .next/server/app --output-path public/pagefind"
  }
}
```

```tsx
// Trigger Pagefind search on Cmd+K:
// Add a search button in the sidebar that opens a modal.
// Fumadocs has built-in Pagefind integration — use it.

// In source.config.ts for Fumadocs:
// search: { enabled: true, provider: 'static' }
// This automatically sets up Pagefind with the right config.
```

---

## OG IMAGES — ADD BEFORE LAUNCH

When someone shares your component page on Twitter/HN/LinkedIn, the link preview matters.

```tsx
// app/components/[slug]/opengraph-image.tsx
import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OGImage({ params }) {
  return new ImageResponse(
    (
      <div style={{
        background: '#0A0A0B',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'monospace',
      }}>
        {/* InkUI logo */}
        <div style={{ color: '#06B6D4', fontSize: 24, marginBottom: 16 }}>
          InkUI
        </div>
        {/* Component name */}
        <div style={{ color: '#FAFAFA', fontSize: 64, fontWeight: 'bold' }}>
          {params.slug}
        </div>
        {/* Description */}
        <div style={{ color: '#A1A1AA', fontSize: 24, marginTop: 16 }}>
          Terminal UI component for Ink + React
        </div>
        {/* Terminal mockup strip */}
        <div style={{
          marginTop: 40,
          background: '#141417',
          border: '1px solid #27272A',
          borderRadius: 8,
          padding: '16px 24px',
          color: '#06B6D4',
          fontSize: 20,
        }}>
          $ npx inkui add {params.slug}
        </div>
      </div>
    ),
    { ...size }
  )
}
```

Also create one for the root `/` page and `/docs` pages.

---

## ANALYTICS — ONE LINE

```tsx
// app/layout.tsx — add inside <body>:
import { Analytics } from '@vercel/analytics/react'

// <Analytics /> — that's it. Free on Vercel.
```

This tells you which components get the most traffic → which new ones to build first.

---

## IMPLEMENTATION STEPS — EXACT ORDER

### Step 1: Scaffold the Docs App

**Tell Claude Code (paste this exactly):**

```
I'm building the docs site for InkUI at apps/docs in my monorepo at ~/Desktop/inkui.

First, update the monorepo:
1. Update root package.json workspaces to ["packages/*", "apps/*"]
2. Update turbo.json with a build task that outputs [".next/**", "!.next/cache/**"]
3. Verify pnpm install works from root

Then scaffold the docs app:
- Create apps/docs with Next.js 15 using App Router + TypeScript
- Use Tailwind CSS v4: configure via @theme directive in app/globals.css,
  install @tailwindcss/postcss, do NOT create tailwind.config.js
- Install Fumadocs: follow fumadocs.vercel.app/docs/ui/manual-setup exactly
- Install: framer-motion, lucide-react, @vercel/analytics, @vercel/og
- Install Shiki v1 (not v0) for syntax highlighting

Font setup via next/font/google:
  - Geist Sans (variable font, for headings and body)
  - Geist Mono (variable font, for code blocks)
  Apply as CSS variables: --font-sans, --font-mono

Color tokens in globals.css using Tailwind v4 @theme:
  --color-background: #0A0A0B;
  --color-surface: #141417;
  --color-surface-hover: #1C1C21;
  --color-border: #27272A;
  --color-text: #FAFAFA;
  --color-text-muted: #A1A1AA;
  --color-accent: #06B6D4;
  --color-accent-secondary: #A855F7;
  --color-code-bg: #18181B;

After scaffolding, verify `pnpm dev` from apps/docs shows a blank Next.js page without errors.
```

---

### Step 2: Build the Landing Page

**Tell Claude Code:**

```
Build the InkUI landing page at apps/docs/app/page.tsx.

Use Framer Motion for all entrance animations.
All sections are server components except the terminal mockup (client component).

Sections in order:

1. HERO SECTION
   - Background: dot grid pattern using CSS (bg radial-gradient dots)
   - Badge: pill shape "8+ Components · TypeScript · Open Source"
     style: border border-cyan-500/30 text-cyan-400 bg-cyan-500/5 rounded-full px-3 py-1 text-sm
   - H1: "Beautiful UI components for the terminal"
     "terminal" word gets bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent
   - Subtitle: "shadcn/ui, but for CLIs. Copy-paste components. TypeScript. Built on Ink."
   - Two buttons: Get Started (bg-cyan-500 text-black), GitHub (border border-zinc-700)
   - Terminal window mockup (client component, see spec below)
   - Glow: the terminal div gets filter drop-shadow(0 0 60px rgba(6,182,212,0.15))
   Framer Motion: stagger children 0.1s, each slides up from y:20 opacity:0

2. STATS BAR
   4 stats: "8+ Components | 10 npm packages | TypeScript | MIT License"
   Separated by pipe chars, text-zinc-500, centered, py-12

3. COMPONENT SHOWCASE GRID
   8 mini terminal cards in a responsive grid (2→3→4 cols)
   Each card has: traffic light dots, component name, ASCII preview content, description
   Hover: -translate-y-1, border-cyan-500/50, shadow-cyan-500/10
   Click: navigate to /components/[slug]
   Animate in on scroll using Framer Motion whileInView

4. FEATURES GRID (3x2 grid, 2x3 on mobile)
   6 features as described in this doc
   Cards: bg-surface border-border, icon in cyan-500, animate on scroll

5. CODE EXAMPLE SPLIT VIEW
   Left: Shiki-highlighted Select component code (tsx, dark theme)
   Right: Fake terminal showing the rendered output
   Copy button on the code panel

6. INSTALL BANNER
   Full-width #0F0F12 background
   Terminal command: $ npx inkui add spinner table select
   Blinking cursor at end
   Copy button (Clipboard API, 2s checkmark feedback)

7. FOOTER
   3 columns: branding / links / external
   Bottom bar with license and build info

TERMINAL MOCKUP for hero (client component):
Create a <TerminalMockup /> component that:
- Renders a div styled as a terminal window
- Has traffic light dots (flex row, gap 6px, circles: #FF5F57 #FFBD2E #28C840, 10px diameter)
- Has a title bar with text "~/my-cli"
- Auto-types through this sequence using setTimeout + useState:
  1. "$ npx inkui add spinner table select" (types at 40ms/char)
  2. After typing: show "✔ Added spinner", "✔ Added table", "✔ Added select" (300ms apart)
  3. Show "⠹ Loading data..." with a CSS spin animation on ⠹
  4. Show a mini table with box-drawing characters
  5. Pause 3 seconds, reset and loop
- No external deps. Pure React useState/useEffect/setTimeout.
```

---

### Step 3: Content Structure + Fumadocs

**Tell Claude Code:**

```
Set up Fumadocs content structure for InkUI docs.

Create content/ directory at apps/docs/content/ with:

content/docs/
  introduction.mdx   — What is InkUI, why terminal UI matters, quick overview
  installation.mdx   — Prerequisites (Node 18+, pnpm), monorepo vs standalone setup
  theming.mdx        — darkTheme vs lightTheme, InkUITheme type, custom themes
  cli.mdx            — How npx inkui add works, all available components to add

content/components/
  spinner.mdx        — Full docs page for Spinner
  badge.mdx
  progress-bar.mdx
  text-input.mdx
  select.mdx
  multi-select.mdx
  table.mdx
  dialog.mdx

Each component MDX file has this structure:
---
title: Spinner
description: An animated loading indicator for terminal apps.
---

## Installation
## Usage
## Props (manual table)
## Examples

Create the full docs layout with Fumadocs:
- Sidebar showing "Getting Started" group and "Components" group
- Top navigation with InkUI logo, GitHub link, npm link
- Search powered by Pagefind (static provider in Fumadocs config)
- Theme matches InkUI colors (override Fumadocs CSS variables)

Fill in real content for the Spinner page as a template.
Leave other component pages with placeholder content that I'll fill in.
```

---

### Step 4: Syntax Highlighting with Shiki v1

**Tell Claude Code:**

```
Set up Shiki v1 for syntax highlighting in the InkUI docs.

Note: Shiki v1 has a different API from v0. Use the new API:
  import { createHighlighter } from 'shiki'  (NOT getHighlighter from v0)

Create a lib/shiki.ts utility:
- Initialize Shiki once (singleton pattern with module-level cache)
- Support languages: tsx, typescript, bash, json, mdx
- Use theme: 'one-dark-pro' or 'tokyo-night'
- Export a highlight(code, lang) async function

Create a <CodeBlock> React component:
- Takes code string and language
- Uses the highlight() function
- Has a copy button (Clipboard API, shows Check icon for 2s after copy)
- Has a language badge (top right)
- Has a filename prop (optional, shows as tab at top)
- Uses the InkUI code-bg color (#18181B) as background

Use this CodeBlock in the landing page split view and all component pages.
```

---

### Step 5: Add Pagefind Search

**Tell Claude Code:**

```
Add Pagefind search to the InkUI docs site.

1. Add to apps/docs/package.json scripts:
   "postbuild": "npx pagefind --site .next/server/app --output-path public/pagefind"

2. Fumadocs has built-in support for Pagefind as the static search provider.
   In source.config.ts, configure: search: { enabled: true }
   Fumadocs will handle the search UI (Cmd+K modal) automatically.

3. If Fumadocs static search needs manual setup, create a search modal:
   - Trigger: Cmd+K (keyboard shortcut) + a search button in sidebar
   - Uses the Pagefind JS API loaded from /pagefind/pagefind.js
   - Shows results as component name + description + link
   - Dark themed modal matching InkUI colors

4. Add the search command button in the sidebar:
   "Search docs...  ⌘K"
   Style: bg-surface border-border text-muted, w-full, rounded
```

---

### Step 6: OG Images

**Tell Claude Code:**

```
Add dynamic OG images to the InkUI docs site using @vercel/og.

Create these OG image routes:
1. app/opengraph-image.tsx — for the landing page
2. app/docs/[...slug]/opengraph-image.tsx — for docs pages
3. app/components/[slug]/opengraph-image.tsx — for component pages

For component pages, the OG image should show:
- Dark background (#0A0A0B)
- "InkUI" in cyan at the top left (small)
- The component name large and centered (#FAFAFA, bold)
- A description line in zinc-400
- A terminal snippet at the bottom: $ npx inkui add [slug]
- A subtle cyan gradient line at the top of the image (the InkUI signature)

Size: 1200x630 (standard OG size)
Runtime: edge (for fast generation)
Export: size, contentType, default function

No external images needed — pure JSX to image.
```

---

### Step 7: Deploy to Vercel

**Tell Claude Code:**

```
Set up Vercel deployment for apps/docs in the inkui monorepo.

Create vercel.json at the monorepo root:
{
  "buildCommand": "pnpm turbo build --filter=docs",
  "outputDirectory": "apps/docs/.next",
  "installCommand": "pnpm install",
  "framework": "nextjs"
}

Also make sure turbo.json has the correct pipeline for the docs app.

The Vercel project should be configured to:
- Root Directory: . (monorepo root, not apps/docs)
- Build Command: pnpm turbo build --filter=docs
- Install Command: pnpm install
- Framework Preset: Next.js

Add a .env.example in apps/docs with any required variables
(NEXT_PUBLIC_SITE_URL=https://inkui.dev)

After this config is set up, I will:
1. Push to GitHub
2. Import the repo on Vercel
3. Set the environment variables
4. Deploy
```

---

## PART 2: NEW COMPONENTS TO BUILD

Build these AFTER the docs site is live. Add each to the docs site immediately after building.

### Priority 1 — Ship within 2 weeks of docs launch

---

**Toast / Notification**

```tsx
// What it does:
// Shows a temporary success/error/warning message that auto-dismisses.
// Renders at the bottom of the terminal.
//
// Example output:
//   ✔ Successfully deployed to production    (green, fades after 3s)
//   ⚠ Warning: 3 deprecated packages         (yellow)
//   ✖ Error: Connection refused              (red)
//   ℹ Server started on port 3000            (cyan)

interface ToastProps {
  message: string
  variant: 'success' | 'warning' | 'error' | 'info'
  duration?: number      // ms before auto-dismiss, default 3000, 0 = permanent
  onDismiss?: () => void
  theme?: InkUITheme
}

// Icons: ✔ for success, ⚠ for warning, ✖ for error, ℹ for info
// Left border color matches variant
// Fade out animation using Ink's opacity or unmounting after duration

// Tell Claude Code:
"Build @inkui-cli/toast. It's a notification component for terminal apps.
Follow the exact package structure as @inkui-cli/spinner.
The component renders a styled message line with an icon prefix.
It uses useEffect + setTimeout to auto-dismiss after `duration` ms.
Support variants: success (green ✔), warning (yellow ⚠), error (red ✖), info (cyan ℹ).
Include a useToast() hook that manages a toast queue (show multiple toasts stacked).
Demo shows all 4 variants appearing one by one."
```

---

**StatusIndicator**

```tsx
// What it does:
// A colored dot + label showing real-time status.
// Common in CLIs that have background workers, connections, syncing.
//
// Example output:
//   ● Connected          (solid green dot)
//   ◉ Syncing...         (yellow, dot pulses via frame animation)
//   ○ Disconnected       (hollow red dot)
//   ◌ Checking...        (spinning animation)

interface StatusIndicatorProps {
  status: 'online' | 'offline' | 'loading' | 'warning' | 'error' | 'idle'
  label: string
  pulse?: boolean         // animate the dot (for loading/syncing states)
  theme?: InkUITheme
}

// Dot characters: ● (online/error), ◉ or ⠿ for pulse, ○ (offline)
// Colors: green=online, red=offline/error, yellow=warning/loading, gray=idle
// Pulse: cycle through dot chars [●, ◉, ●, ○] using setInterval

// Tell Claude Code:
"Build @inkui-cli/status-indicator. Shows a colored dot + label for status.
Support statuses: online (green ●), offline (red ○), loading (yellow, animated dot),
warning (yellow ⚠), error (red ●), idle (gray ○).
The pulse prop makes the dot animate through frames using setInterval + useState.
This is useful for background workers, network status, build status."
```

---

**LoadingBar**

```tsx
// What it does:
// A slim animated progress bar at the top of output.
// Different from ProgressBar — this is for "something is happening"
// not "this task is X% done".
//
// Example output:
//   ━━━━━━━━━━━━━━━░░░░░░░░░░░░      (indeterminate, bounces left-right)
//   ━━━━━━━━━━━━━━━━━━━━░░░░░░░      (determinate, shows progress)

interface LoadingBarProps {
  value?: number          // 0-100, if undefined = indeterminate mode
  width?: number          // chars wide, defaults to terminal width
  color?: string          // defaults to theme.colors.primary (cyan)
  theme?: InkUITheme
}

// Indeterminate: a filled block that sweeps left→right→left using setInterval
// Determinate: filled portion = (value/100) * width chars
// Characters: ━ for filled, ░ for empty (or use block chars: █ ▓ ▒ ░)

// Tell Claude Code:
"Build @inkui-cli/loading-bar. A horizontal bar that shows loading progress.
Two modes: indeterminate (bouncing animation, no value prop) and
determinate (value 0-100). Use ━ for filled and ░ for empty sections.
Indeterminate mode: a filled segment sweeps across using setInterval + useState,
reversing direction at the ends. Demo shows both modes."
```

---

**Confirm**

```tsx
// What it does:
// A yes/no confirmation prompt. The most common CLI interaction.
//
// Example output:
//   ? Are you sure you want to delete 47 files? (y/N) _

interface ConfirmProps {
  message: string
  defaultValue?: boolean  // true=Y default, false=N default (shown uppercase)
  onConfirm: () => void
  onCancel?: () => void
  theme?: InkUITheme
}

// Uses Ink's useInput hook to listen for y/Y/n/N/Enter/Escape
// Enter confirms with defaultValue
// Shows (Y/n) when defaultValue=true, (y/N) when false
// After answer: shows "✔ Yes" or "✖ No" and resolves

// Tell Claude Code:
"Build @inkui-cli/confirm. A yes/no prompt using Ink's useInput.
Shows: ? [message] (y/N) with a blinking cursor.
Key handling: y/Y = confirm, n/N/Escape = cancel, Enter = use defaultValue.
After selection, show a static confirmation line: ✔ Confirmed or ✖ Cancelled.
Demo shows a destructive action confirmation flow."
```

---

**KeyHint**

```tsx
// What it does:
// Shows keyboard shortcut hints at the bottom of interactive components.
// Every Select, Dialog, and MultiSelect should use this.
//
// Example output:
//   ↑↓ Navigate   Enter Select   Esc Cancel   Space Toggle

interface KeyHintProps {
  keys: Array<{
    key: string     // displayed in brackets: [Enter], [↑↓], [Space]
    label: string   // description: "Select", "Navigate", "Cancel"
  }>
  theme?: InkUITheme
}

// Renders each key hint as: dim("[Enter]") + " " + muted("Select")
// Separated by "  " (two spaces)
// Key text styled dim/bold, label text styled muted

// Tell Claude Code:
"Build @inkui-cli/key-hint. Renders a row of keyboard shortcut hints.
Takes an array of {key, label} objects. Renders them in a row as:
[key] label  [key] label
The key part is dimmed/bold, the label is muted.
This is used by other InkUI components internally and exported for user apps too.
Go back and integrate KeyHint into Select, MultiSelect, and Dialog components."
```

---

**Divider**

```tsx
// What it does:
// A horizontal separator line with optional title.
//
// Example output:
//   ─────────────────────────────────────────────   (plain)
//   ── Settings ──────────────────────────────────   (with title)
//   ═════════════════════════════════════════════   (double style)

interface DividerProps {
  title?: string
  style?: 'single' | 'double' | 'dashed' | 'bold'
  width?: number          // defaults to terminal width
  theme?: InkUITheme
}

// Characters per style:
//   single: ─
//   double: ═
//   dashed: ╌
//   bold:   ━
// With title: "── Title " + remaining ─ chars to fill width

// Tell Claude Code:
"Build @inkui-cli/divider. A horizontal separator line.
Supports single (─), double (═), dashed (╌), and bold (━) styles.
With a title prop: renders '── Title ──────────' filling to width.
Width defaults to process.stdout.columns ?? 80.
Demo shows all 4 styles and a titled divider."
```

---

**Header**

```tsx
// What it does:
// A styled header bar typically shown at the top of a CLI app.
//
// Example output:
//   ┌─── MyApp v1.2.0 ────────────────────────────────────────┐
//   or:
//   ══ MyApp ══════════════════════════════════════════════════
//   or:
//   ▓▓▓▓▓ MyApp v1.2.0 ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓

interface HeaderProps {
  title: string
  version?: string
  subtitle?: string       // shown below on a second line
  style?: 'box' | 'line' | 'filled'
  align?: 'left' | 'center'
  theme?: InkUITheme
}

// box style:   ┌─── Title v1.0 ─────────────────────────────────┐
// line style:  ══ Title v1.0 ═══════════════════════════════════
// filled style: ██ Title v1.0 ██████████████████████████████████

// Tell Claude Code:
"Build @inkui-cli/header. A styled header bar for CLI apps.
Three styles: box (box-drawing chars), line (double line ══), filled (blocks █).
Supports title, optional version (shown as 'v1.0' appended), optional subtitle.
Width defaults to terminal width. Demo shows all 3 styles."
```

---

### How to Build Each New Component (tell Claude Code this template):

```
Build a new InkUI component: [ComponentName].

Create it at packages/[name]/ following the exact same structure as
packages/spinner:

packages/[name]/
├── src/
│   ├── [Name].tsx       (the component)
│   └── index.ts         (export everything)
├── example/
│   └── demo.tsx         (runnable: tsx example/demo.tsx)
├── package.json         (name: @inkui-cli/[name], same pattern as spinner)
└── tsconfig.json        (copy from packages/spinner/tsconfig.json)

[Describe what it does, props, behavior, key handling if interactive]

Requirements:
- Accept theme prop (InkUITheme), default to darkTheme from @inkui-cli/core
- Use Ink's Box + Text for layout (no CSS)
- Use useInput from ink for any keyboard interaction
- Use process.stdout.columns ?? 80 for any width calculations
- TypeScript strict mode, export the props interface
- demo.tsx must be runnable with: cd packages/[name] && tsx example/demo.tsx

After building, run the demo to verify it works.
Then add it to the turbo build pipeline.
Then publish it: cd packages/[name] && npm publish --access public
```

---

## PART 3: SHOWCASE PROJECTS

Build these after the docs site is live. These are proof InkUI works for real apps.

### Showcase Project 1 — git-tidy (build this first)

**Why this one first:** Every developer has used git. Everyone understands deleting branches.
It's immediately relatable in a Show HN or Reddit post.

**What it is:**
A CLI tool that lets you interactively clean up git branches.

```
$ npx git-tidy

  Fetching branches...

  ┌─────────────────────────────────────────────────┐
  │ Branch                 Last Commit    Status     │
  ├─────────────────────────────────────────────────┤
  │ [✔] feature/login      3 days ago     merged    │
  │ [✔] fix/navbar-bug     1 week ago     merged    │
  │ [ ] feature/payments   2 hours ago    active    │
  │ [✔] chore/deps-update  2 weeks ago    merged    │
  └─────────────────────────────────────────────────┘

  Selected: 3 branches

  ? Delete 3 merged branches? (y/N)

  ✔ Deleted feature/login
  ✔ Deleted fix/navbar-bug
  ✔ Deleted chore/deps-update
```

**InkUI components used:** Spinner (loading), Table (branch list), MultiSelect (selection),
Confirm (deletion confirmation), Toast (success/error per branch), KeyHint (navigation hints)

**Tell Claude Code:**

```
Create a standalone CLI project at ~/Desktop/git-tidy.
(Separate from the inkui monorepo — this is a user of the library.)

It's a git branch cleanup tool. Install InkUI components from npm:
  npm install @inkui-cli/spinner @inkui-cli/table @inkui-cli/multi-select
  npm install @inkui-cli/confirm @inkui-cli/toast @inkui-cli/key-hint
  npm install ink react

The tool:
1. Shows a Spinner while running: git branch -vv
2. Parses output to get branch name, last commit date, and merged status
3. Shows branches in a Table with columns: Branch, Last Commit, Status
4. Lets user multi-select branches to delete (pre-selects merged ones)
5. Shows a Confirm dialog before deleting
6. Deletes with: git branch -d [name]
7. Shows a Toast for each result (success green, error red if unmerged)

Use child_process.execSync for git commands.
Handle the case where not inside a git repo (show an error Badge).
Make it work cross-platform (Windows uses different git output format — parse carefully).

Add a bin entry in package.json so it can run as: npx git-tidy
```

---

### Showcase Project 2 — inkui-sysmon (build this second)

**Why this one second:** More visually impressive, shows InkUI at full capability.
Better for screenshots and GIFs.

**What it is:** A terminal system monitor.

```
  ┌─── inkui-sysmon ──────────────────────────────────────────┐

  CPU Usage          ████████████░░░░░░░░  61%   ● Normal
  Memory             ██████████████████░░  89%   ⚠ High
  Disk (/)           ████████░░░░░░░░░░░░  42%   ● Normal

  ┌─────────────────────────────────────────────────────────┐
  │ Process          PID      CPU%     MEM%     Status      │
  ├─────────────────────────────────────────────────────────┤
  │ node             12847    12.3     4.2      ● Running   │
  │ chrome           9234     8.1      18.7     ● Running   │
  │ code             11203    3.2      9.1      ● Running   │
  └─────────────────────────────────────────────────────────┘

  Refreshes every 2s   Press Q to quit   Press P for processes
```

**InkUI components used:** Header, ProgressBar, Badge, StatusIndicator, Table, Divider, KeyHint

**Tell Claude Code:**

```
Create a standalone CLI at ~/Desktop/inkui-sysmon.
Install: @inkui-cli/header, progress-bar, badge, status-indicator, table,
         divider, key-hint, ink, react, systeminformation

Use the `systeminformation` npm package for ALL system data — it's cross-platform
(works on Linux, macOS, Windows). Do NOT use child_process.exec('df -h') or
similar unix-only commands. systeminformation has:
  si.currentLoad()    → CPU usage %
  si.mem()            → memory total/used
  si.fsSize()         → disk partitions
  si.processes()      → process list with CPU/mem
  si.networkStats()   → network in/out

Update every 2 seconds using useEffect + setInterval.

Layout:
1. Header at top: "inkui-sysmon v1.0.0"
2. Divider
3. CPU row: label + ProgressBar + Badge (Normal/High/Critical based on %)
4. Memory row: same
5. Disk rows: one per partition
6. Divider
7. Process table: top 10 by CPU usage, sortable by pressing 'c' (cpu) or 'm' (memory)
8. KeyHint at bottom: [Q] Quit  [P] Processes  [C] Sort CPU  [M] Sort Memory

Color thresholds for Badge:
  < 70%: success (green)
  70-90%: warning (yellow)
  > 90%: error (red)

Handle Q keypress to exit cleanly (process.exit(0)).
```

---

## PART 4: LAUNCH STRATEGY

### When to Launch

Launch only when ALL of these are true:
- [ ] Docs site is live at inkui.dev (or your domain)
- [ ] All 8 original component pages are done
- [ ] `npx inkui add [component]` works perfectly on a fresh machine
- [ ] git-tidy showcase project exists and is on GitHub
- [ ] A GIF exists showing the docs site + a component demo
- [ ] README on GitHub links to the docs site

Do NOT wait for: new components to be done, sysmon to be built, 100% coverage.
Ship the core, iterate publicly.

---

### Pre-Launch Checklist

```
[ ] Test npx inkui add on a completely fresh machine (not your dev machine)
[ ] Verify all 8 component npm packages install correctly
[ ] Check docs site on mobile (sidebar collapses, content readable)
[ ] Check docs site on Firefox and Safari (not just Chrome)
[ ] Run Lighthouse — aim for 90+ performance, 100 accessibility
[ ] Verify Cmd+K search returns results
[ ] Test all copy buttons work
[ ] Check OG images appear correctly (use opengraph.xyz to preview)
[ ] Verify GitHub repo has: good README, LICENSE, CONTRIBUTING.md, description, topics
[ ] Add GitHub topics: ink, terminal, cli, react, typescript, component-library
[ ] Star your own repo (obvious but easy to forget)
```

---

### Launch Posts

**Order matters. Do them in this sequence:**

**1. Hacker News — Show HN (most important)**
```
Title: Show HN: shadcn/ui for the terminal – copy-paste CLI components built on Ink

Body:
I built InkUI — a component library for terminal UIs in the style of shadcn/ui.

Instead of installing a monolithic package, you copy components into your project
with: npx inkui add spinner table select

Built on Ink (the React renderer used by Vercel and Prisma CLIs). TypeScript first.
Dark/light themes. 8 components so far.

[link to inkui.dev]

Happy to answer questions about building UI abstractions for the terminal.
```
Post at: Tuesday-Thursday, 8-10am US Eastern (highest traffic)
Do NOT post on weekends or Monday.

**2. Reddit r/node**
```
Title: I built a shadcn/ui-style component library for terminal UIs (Ink + React)

Body: Similar to HN but more conversational. Include a GIF.
Talk about the technical challenge of doing layout without CSS.
Link to the github repo and docs.
```

**3. Reddit r/javascript**
Same approach, slightly less technical framing.

**4. Dev.to Article**
```
Title: "I built a design system for terminal UIs — here's what terminal constraints
        taught me about component architecture"

Content:
- What is Ink and why does it matter
- The challenge: layout without CSS (Yoga flexbox, ANSI colors, Unicode chars)
- How shadcn's copy-paste model translates perfectly to terminal components
- What I learned about component APIs for constrained environments
- The architecture: monorepo, packages, CLI installer
- Link to inkui.dev

This article is SEO value long-term. Write it well.
```

**5. Twitter/X thread (if you're active there)**
```
Tweet 1: "I just shipped InkUI — shadcn/ui for the terminal 🖥️"
Tweet 2: [GIF of components]
Tweet 3: "The hard part: no CSS. Layout is Yoga flexbox via Ink. Colors are ANSI..."
Tweet 4: "8 components so far: [list]. More coming."
Tweet 5: "npx inkui add spinner — that's all it takes. [link]"
```

---

### CONTRIBUTING.md — Create Before Launch

**Tell Claude Code:**

```
Create CONTRIBUTING.md at the root of the inkui monorepo.

Include:
1. Prerequisites: Node 18+, pnpm 8+, basic React/TypeScript knowledge
2. Setup: git clone, pnpm install, pnpm dev
3. Monorepo structure explanation (packages/, apps/, turbo.json)
4. How to build a new component (step by step, following existing package structure)
5. Running tests: pnpm test
6. Running a component demo: cd packages/spinner && tsx example/demo.tsx
7. PR process: fork, branch, PR against main
8. Code style: TypeScript strict, no any, export all props interfaces
9. Component requirements checklist:
   - [ ] Accepts theme prop with InkUITheme type
   - [ ] Defaults to darkTheme
   - [ ] Uses process.stdout.columns ?? 80 for width
   - [ ] Has working demo.tsx
   - [ ] Has TypeScript types exported
   - [ ] Has README with props documented

Also create GitHub issue templates:
  .github/ISSUE_TEMPLATE/bug_report.md
  .github/ISSUE_TEMPLATE/feature_request.md
  .github/ISSUE_TEMPLATE/new_component.md

And create a PR template:
  .github/pull_request_template.md
```

---

## EXECUTION ORDER — WEEK BY WEEK

### Pre-Work (before Week 1)

```
Day 0:  Verify npx inkui add works on a fresh machine — fix everything that breaks
        This is the ONLY thing blocking Week 1. Nothing else matters until this works.
```

### Week 1: Docs Site

```
Day 1:  Update monorepo workspaces, scaffold Next.js + Fumadocs + Tailwind v4
Day 2:  Build landing page (hero, stats, showcase grid, features)
Day 3:  Build landing page (code example, install banner, footer) + Shiki setup
Day 4:  Build component page template, fill in Spinner page as reference
Day 5:  Add remaining 7 component pages, integrate Pagefind search
Day 6:  Add OG images, Analytics, deploy to Vercel, connect domain
Day 7:  Mobile polish, cross-browser test, Lighthouse audit, fix issues
```

### Week 2: New Components

```
Day 1:  Build Toast + StatusIndicator → add to docs site immediately
Day 2:  Build LoadingBar + Confirm → add to docs site
Day 3:  Build KeyHint + Divider + Header → add to docs site, integrate KeyHint into Select/Dialog
Day 4:  Build git-tidy showcase project
Day 5:  Polish git-tidy, record a GIF of it running
Day 6:  Publish all 7 new components to npm
Day 7:  Record final demo GIF of the docs site
```

### Week 3: Launch

```
Day 1:  Write CONTRIBUTING.md, create GitHub issues (good first issues)
Day 2:  Write Dev.to article
Day 3:  Pre-launch checklist, fix any issues
Day 4:  LAUNCH — HN post (8-10am Eastern), then r/node, then r/javascript
Day 5:  Monitor, respond to comments, fix reported bugs
Day 6:  Start inkui-sysmon if you have energy
Day 7:  Rest
```

---

## CLAUDE CODE PROMPT — PASTE THIS TO START

When you're ready to start the docs site, paste this entire block into Claude Code:

```
I'm building the InkUI docs website — a terminal UI component library docs site.

Context:
- Monorepo at ~/Desktop/inkui
- Library is @inkui-cli scope on npm (10 packages: spinner, badge, progress-bar,
  text-input, select, multi-select, table, dialog, core, cli)
- GitHub: kamlesh723/inkui
- Target domain: inkui.dev

BEFORE STARTING: Update the monorepo.
1. Update root package.json: add "apps/*" to workspaces array
2. Update turbo.json: ensure build task outputs ".next/**" and "!.next/cache/**"
3. Verify pnpm install works from root after the change.

THEN scaffold apps/docs:

Tech stack — use EXACTLY these versions and setup:
- Next.js 15 (latest stable, App Router, TypeScript)
- Tailwind CSS v4: use @tailwindcss/postcss, configure via @theme in globals.css,
  do NOT create tailwind.config.js (v4 doesn't use it)
- Fumadocs: follow fumadocs.vercel.app/docs/ui/manual-setup for the docs system
- Framer Motion v11
- Shiki v1 (import from 'shiki', use createHighlighter not getHighlighter)
- Lucide React
- @vercel/analytics
- @vercel/og

Fonts via next/font/google (apply as CSS vars --font-sans, --font-mono):
- Geist (sans)
- Geist Mono

Color tokens in globals.css using Tailwind v4 @theme:
  --color-background: #0A0A0B;
  --color-surface: #141417;
  --color-surface-hover: #1C1C21;
  --color-border: #27272A;
  --color-text: #FAFAFA;
  --color-text-muted: #A1A1AA;
  --color-text-dim: #71717A;
  --color-accent: #06B6D4;
  --color-accent-secondary: #A855F7;
  --color-success: #22C55E;
  --color-warning: #EAB308;
  --color-error: #EF4444;
  --color-code-bg: #18181B;

Site structure to build:
  app/
    page.tsx              ← landing page (START HERE)
    layout.tsx            ← root layout with fonts + analytics
    globals.css           ← Tailwind v4 @theme config
    docs/
      [[...slug]]/
        page.tsx          ← Fumadocs docs pages
    components/
      [slug]/
        page.tsx          ← component docs pages
        opengraph-image.tsx

Content structure for Fumadocs:
  content/
    docs/
      introduction.mdx
      installation.mdx
      theming.mdx
      cli.mdx
    components/
      spinner.mdx         ← fill this one fully as a template
      badge.mdx           ← placeholder content, I'll fill it
      (etc for all 8)

Start with:
1. The monorepo update
2. The scaffold (package.json, layout, globals.css, fonts)
3. The landing page at app/page.tsx

Build the landing page with these sections:
- Hero: badge + h1 with gradient on "terminal" + subtitle + 2 buttons + animated terminal mockup
  The terminal mockup is a pure React/CSS component (no xterm.js) that types out:
  $ npx inkui add spinner table select → shows ✔ confirmations → shows a Spinner + mini Table
  It loops. No external animation library for this — use useEffect + setTimeout + useState.
- Stats bar: 4 stats separated by pipes
- Component showcase: 8 mini terminal cards in responsive grid, hover effects
- Features: 6 feature cards in 3x2 grid
- Code example: Shiki-highlighted tsx on left, fake terminal output on right
- Install banner: full-width dark section with the npx command + copy button
- Footer: 3 columns

Props tables in MDX will be MANUAL (I'll write them) — do not attempt auto-generation.
Pagefind search: add postbuild script, use Fumadocs static search provider.
OG images: create for root page and component pages using @vercel/og.

After landing page is done, build the Fumadocs layout and the Spinner component page
as a reference template.

Let's start with the monorepo update, then the scaffold.
```

---

## THE ONE THING TO REMEMBER

The library is done. The product work starts now.

A docs site that makes people feel something → stars, users, contributors.
A docs site that just lists props → nobody comes back.

Make people feel the terminal aesthetic in every pixel. Then ship.
