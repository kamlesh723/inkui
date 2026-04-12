export type Language =
  | 'javascript' | 'typescript' | 'python' | 'json' | 'bash'
  | 'html' | 'css' | 'rust' | 'go' | 'yaml' | 'markdown' | 'diff' | 'plain';

export interface Token {
  text: string;
  color?: string;
}

type TokenRule = { pattern: RegExp; color: string };

const jsRules: TokenRule[] = [
  { pattern: /\/\/.*$/gm, color: 'muted' },
  { pattern: /\/\*[\s\S]*?\*\//g, color: 'muted' },
  { pattern: /(["'`])(?:(?!\1|\\).|\\.)*\1/g, color: 'success' },
  { pattern: /\b\d+\.?\d*\b/g, color: 'warning' },
  { pattern: /\b(const|let|var|function|return|if|else|for|while|import|export|from|class|new|this|async|await|try|catch|throw|typeof|instanceof|of|in|default|switch|case|break|continue|void|delete|yield|extends|implements|interface|type|enum|namespace|declare|abstract|readonly|static|private|public|protected)\b/g, color: 'error' },
  { pattern: /\b(true|false|null|undefined|NaN|Infinity)\b/g, color: 'info' },
];

const pythonRules: TokenRule[] = [
  { pattern: /#.*$/gm, color: 'muted' },
  { pattern: /("""[\s\S]*?"""|'''[\s\S]*?''')/g, color: 'success' },
  { pattern: /(["'])(?:(?!\1|\\).|\\.)*\1/g, color: 'success' },
  { pattern: /\b\d+\.?\d*\b/g, color: 'warning' },
  { pattern: /\b(def|class|import|from|return|if|elif|else|for|while|try|except|finally|with|as|in|not|and|or|is|lambda|pass|break|continue|raise|yield|global|nonlocal|del|assert)\b/g, color: 'error' },
  { pattern: /\b(True|False|None)\b/g, color: 'info' },
];

const jsonRules: TokenRule[] = [
  { pattern: /"(?:[^"\\]|\\.)*"(?=\s*:)/g, color: 'info' },
  { pattern: /"(?:[^"\\]|\\.)*"/g, color: 'success' },
  { pattern: /\b\d+\.?\d*\b/g, color: 'warning' },
  { pattern: /\b(true|false|null)\b/g, color: 'error' },
];

const bashRules: TokenRule[] = [
  { pattern: /#.*$/gm, color: 'muted' },
  { pattern: /(["'])(?:(?!\1|\\).|\\.)*\1/g, color: 'success' },
  { pattern: /\b(if|then|else|elif|fi|for|while|do|done|case|esac|function|return|export|local|readonly|echo|cd|ls|mkdir|rm|cp|mv|grep|awk|sed|curl|cat|chmod|chown)\b/g, color: 'error' },
  { pattern: /\$\w+|\$\{[^}]+\}/g, color: 'warning' },
];

const rulesMap: Record<Language, TokenRule[]> = {
  javascript: jsRules,
  typescript: jsRules,
  python: pythonRules,
  json: jsonRules,
  bash: bashRules,
  html: [
    { pattern: /<\/?[\w-]+/g, color: 'error' },
    { pattern: /[\w-]+=(?=")/g, color: 'info' },
    { pattern: /"[^"]*"/g, color: 'success' },
    { pattern: /<!--[\s\S]*?-->/g, color: 'muted' },
  ],
  css: [
    { pattern: /\/\*[\s\S]*?\*\//g, color: 'muted' },
    { pattern: /#[0-9a-fA-F]{3,8}\b/g, color: 'success' },
    { pattern: /\b[\w-]+(?=\s*:)/g, color: 'info' },
    { pattern: /\b\d+\.?\d*(px|em|rem|%|vh|vw|s|ms)?\b/g, color: 'warning' },
    { pattern: /\b(body|html|div|span|p|a|ul|li|h[1-6]|input|button|form|img|table|tr|td|th)\b/g, color: 'error' },
  ],
  rust: [
    { pattern: /\/\/.*$/gm, color: 'muted' },
    { pattern: /(["'])(?:(?!\1|\\).|\\.)*\1/g, color: 'success' },
    { pattern: /\b\d+\.?\d*\b/g, color: 'warning' },
    { pattern: /\b(fn|let|mut|const|struct|enum|impl|trait|use|mod|pub|self|super|crate|return|if|else|match|for|while|loop|break|continue|async|await|move|ref|where|type|unsafe|extern)\b/g, color: 'error' },
    { pattern: /\b(true|false|None|Some|Ok|Err)\b/g, color: 'info' },
  ],
  go: [
    { pattern: /\/\/.*$/gm, color: 'muted' },
    { pattern: /(["'])(?:(?!\1|\\).|\\.)*\1/g, color: 'success' },
    { pattern: /`[^`]*`/g, color: 'success' },
    { pattern: /\b\d+\.?\d*\b/g, color: 'warning' },
    { pattern: /\b(func|var|const|type|struct|interface|map|chan|go|defer|select|case|default|break|continue|goto|fallthrough|return|if|else|for|range|import|package|switch)\b/g, color: 'error' },
    { pattern: /\b(true|false|nil|iota)\b/g, color: 'info' },
  ],
  yaml: [
    { pattern: /#.*$/gm, color: 'muted' },
    { pattern: /^[\w-]+(?=:)/gm, color: 'info' },
    { pattern: /(["'])(?:(?!\1|\\).|\\.)*\1/g, color: 'success' },
    { pattern: /\b\d+\.?\d*\b/g, color: 'warning' },
    { pattern: /\b(true|false|null|yes|no)\b/g, color: 'error' },
  ],
  markdown: [
    { pattern: /^#{1,3} .+$/gm, color: 'error' },
    { pattern: /\*\*[^*]+\*\*/g, color: 'info' },
    { pattern: /`[^`]+`/g, color: 'success' },
    { pattern: /^\s*[-*]\s/gm, color: 'warning' },
  ],
  diff: [],
  plain: [],
};

export function tokenizeLine(line: string, language: Language): Token[] {
  if (language === 'diff') {
    if (line.startsWith('+')) return [{ text: line, color: 'success' }];
    if (line.startsWith('-')) return [{ text: line, color: 'error' }];
    if (line.startsWith('@@')) return [{ text: line, color: 'info' }];
    return [{ text: line, color: 'muted' }];
  }

  if (language === 'plain') return [{ text: line }];

  const rules = rulesMap[language] ?? [];
  if (!rules.length) return [{ text: line }];

  // Mark matched ranges so we don't double-highlight
  const matched: Array<{ start: number; end: number; color: string }> = [];

  for (const rule of rules) {
    rule.pattern.lastIndex = 0;
    let m: RegExpExecArray | null;
    while ((m = rule.pattern.exec(line)) !== null) {
      const start = m.index;
      const end = start + m[0].length;
      // Skip if overlaps any existing match
      if (!matched.some((r) => start < r.end && end > r.start)) {
        matched.push({ start, end, color: rule.color });
      }
    }
  }

  matched.sort((a, b) => a.start - b.start);

  const tokens: Token[] = [];
  let cursor = 0;
  for (const { start, end, color } of matched) {
    if (cursor < start) tokens.push({ text: line.slice(cursor, start) });
    tokens.push({ text: line.slice(start, end), color });
    cursor = end;
  }
  if (cursor < line.length) tokens.push({ text: line.slice(cursor) });
  return tokens;
}
