'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { COMPONENTS } from '@/lib/components-data';

export const Sidebar: React.FC = () => {
  const pathname = usePathname();

  return (
    <aside className="sidebar">
      <div className="sidebar-section">
        <div className="sidebar-title">Getting started</div>
        <Link
          href="/"
          className={`sidebar-link${pathname === '/' ? ' active' : ''}`}
        >
          Introduction
        </Link>
      </div>

      <div className="sidebar-section">
        <div className="sidebar-title">Components</div>
        {COMPONENTS.map((c) => (
          <Link
            key={c.slug}
            href={`/components/${c.slug}`}
            className={`sidebar-link${pathname === `/components/${c.slug}` ? ' active' : ''}`}
          >
            {c.name}
          </Link>
        ))}
      </div>
    </aside>
  );
};
