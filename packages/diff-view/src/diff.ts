export type DiffLineType = 'add' | 'remove' | 'context';

export interface DiffLine {
  type: DiffLineType;
  text: string;
  beforeNum?: number;
  afterNum?: number;
}

function lcs(a: string[], b: string[]): number[][] {
  const m = a.length;
  const n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = a[i - 1] === b[j - 1] ? dp[i - 1][j - 1] + 1 : Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
  }
  return dp;
}

export function computeDiff(before: string, after: string, contextLines = 3): DiffLine[] {
  const aLines = before.split('\n');
  const bLines = after.split('\n');
  const dp = lcs(aLines, bLines);

  const raw: DiffLine[] = [];
  let i = aLines.length;
  let j = bLines.length;
  let bi = 0;
  let ai = 0;

  // Backtrack through LCS table
  const backtrack = (i: number, j: number): void => {
    if (i === 0 && j === 0) return;
    if (i > 0 && j > 0 && aLines[i - 1] === bLines[j - 1]) {
      backtrack(i - 1, j - 1);
      raw.push({ type: 'context', text: aLines[i - 1], beforeNum: i, afterNum: j });
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      backtrack(i, j - 1);
      raw.push({ type: 'add', text: bLines[j - 1], afterNum: j });
    } else {
      backtrack(i - 1, j);
      raw.push({ type: 'remove', text: aLines[i - 1], beforeNum: i });
    }
  };

  backtrack(aLines.length, bLines.length);

  // Filter to only show contextLines around changes
  const changed = new Set(raw.map((l, idx) => (l.type !== 'context' ? idx : -1)).filter((i) => i >= 0));
  const visible = new Set<number>();
  for (const idx of changed) {
    for (let k = Math.max(0, idx - contextLines); k <= Math.min(raw.length - 1, idx + contextLines); k++) {
      visible.add(k);
    }
  }

  return raw.filter((_, idx) => visible.has(idx));
}
