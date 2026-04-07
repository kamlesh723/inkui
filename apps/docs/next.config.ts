import type { NextConfig } from 'next';

const config: NextConfig = {
  // node-pty is a native Node.js module — never bundle it into browser chunks.
  // It is only used in server/pty-server.ts, which Next.js never touches.
  serverExternalPackages: ['node-pty'],

  // xterm packages are browser-only; make sure webpack handles them correctly.
  webpack(webpackConfig) {
    webpackConfig.resolve.fallback = {
      ...webpackConfig.resolve.fallback,
      fs: false,
      path: false,
      os: false,
    };
    return webpackConfig;
  },
};

export default config;
