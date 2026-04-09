import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { source } from '@/lib/source';
import type { ReactNode } from 'react';
import { LogoFull } from '@/components/Logo';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tree={source.pageTree}
      nav={{
        title: <LogoFull size={22} />,
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
