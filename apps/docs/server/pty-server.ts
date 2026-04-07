/**
 * InkUI PTY WebSocket server
 *
 * Spawns an Ink demo process per WebSocket connection and pipes its PTY
 * output to the browser's xterm.js instance.
 *
 * Usage (from apps/docs):
 *   pnpm dev:pty
 *
 * Connects to:
 *   ws://localhost:3001?component=<slug>
 *
 * Requires node-pty native bindings. Install once:
 *   pnpm install                    (handled by workspace install)
 *   pnpm approve-builds             (if prompted for node-pty postinstall)
 */

import { WebSocketServer, WebSocket } from 'ws';
import * as pty from 'node-pty';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { existsSync } from 'node:fs';

const __dirname  = dirname(fileURLToPath(import.meta.url));
const monoRoot   = join(__dirname, '..', '..', '..');
const packagesDir = join(monoRoot, 'packages');

const PORT = 3001;

const wss = new WebSocketServer({ port: PORT });

console.log(`[inkui pty-server] listening on ws://localhost:${PORT}`);

wss.on('connection', (ws: WebSocket, req) => {
  const url       = new URL(req.url ?? '/', `http://localhost:${PORT}`);
  const component = url.searchParams.get('component') ?? 'spinner';

  const demoPath = join(packagesDir, component, 'example', 'demo.tsx');

  if (!existsSync(demoPath)) {
    ws.send(`\r\n[inkui pty-server] demo not found: ${demoPath}\r\n`);
    ws.close();
    return;
  }

  console.log(`[inkui pty-server] spawning demo for: ${component}`);

  let ptyProcess: pty.IPty;

  try {
    ptyProcess = pty.spawn(
      process.execPath, // node
      [
        '--import',
        'tsx/esm',
        demoPath,
      ],
      {
        name:  'xterm-color',
        cols:  100,
        rows:  30,
        cwd:   join(packagesDir, component),
        env: {
          ...process.env,
          FORCE_COLOR: '1',
          TERM: 'xterm-256color',
        },
      },
    );
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    ws.send(`\r\n[inkui pty-server] failed to spawn PTY: ${msg}\r\n`);
    ws.close();
    return;
  }

  // PTY → browser
  ptyProcess.onData((data: string) => {
    if (ws.readyState === WebSocket.OPEN) ws.send(data);
  });

  ptyProcess.onExit(() => {
    if (ws.readyState === WebSocket.OPEN) ws.close();
  });

  // Browser → PTY (keystrokes)
  ws.on('message', (data: Buffer | string) => {
    ptyProcess.write(typeof data === 'string' ? data : data.toString());
  });

  // Resize messages from xterm.js: JSON { type:'resize', cols, rows }
  ws.on('message', (raw: Buffer | string) => {
    try {
      const msg = JSON.parse(typeof raw === 'string' ? raw : raw.toString());
      if (msg.type === 'resize') {
        ptyProcess.resize(
          Math.max(1, msg.cols as number),
          Math.max(1, msg.rows as number),
        );
      }
    } catch {
      // plain keystroke, not JSON — already handled above
    }
  });

  ws.on('close', () => {
    try { ptyProcess.kill(); } catch { /* already gone */ }
    console.log(`[inkui pty-server] disconnected: ${component}`);
  });

  ws.on('error', (err) => {
    console.error(`[inkui pty-server] ws error: ${err.message}`);
    try { ptyProcess.kill(); } catch { /* ignore */ }
  });
});

wss.on('error', (err) => {
  console.error(`[inkui pty-server] server error: ${err.message}`);
  process.exit(1);
});
