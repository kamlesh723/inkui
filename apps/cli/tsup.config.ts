import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/cli.tsx'],
  format: ['esm'],
  outExtension() {
    return { js: '.js' };
  },
  banner: {
    js: '#!/usr/bin/env node',
  },
  dts: false,
  clean: true,
  // Bundle @inkui-cli/* workspace packages into the CLI binary so it is self-contained.
  // ink and react stay external — they are real runtime dependencies.
  noExternal: [/@inkui\//],
  external: ['react', 'ink'],
});
