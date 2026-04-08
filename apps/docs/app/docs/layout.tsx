import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { source } from '@/lib/source';
import type { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tree={source.pageTree}
      nav={{
        title: (
          <span style={{ fontWeight: 700, letterSpacing: '-0.02em' }}>
            Ink<span style={{ color: '#06B6D4' }}>UI</span>
          </span>
        ),
        url: '/',
      }}
      sidebar={{
        banner: null,
      }}
    >
      {children}
    </DocsLayout>
  );
}
