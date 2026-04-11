import SiteNav from '@/components/landing/SiteNav';
import SiteFooter from '@/components/landing/SiteFooter';
import type { ReactNode } from 'react';

export default function ChangelogLayout({ children }: { children: ReactNode }) {
  return (
    <div style={{ background: 'var(--bg)', color: 'var(--text)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <SiteNav />
      <main style={{ flex: 1, maxWidth: 760, width: '100%', margin: '0 auto', padding: '64px 24px 80px' }}>
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
