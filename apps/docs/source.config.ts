import { defineDocs, defineConfig } from 'fumadocs-mdx/config';

export const { docs, meta } = defineDocs({
  dir: 'content',
});

export default defineConfig({
  mdxOptions: {
    // Enables syntax highlighting in MDX code blocks via Shiki
    rehypePlugins: [],
  },
});
