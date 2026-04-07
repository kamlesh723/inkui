import type { Metadata } from 'next';
import Link from 'next/link';
import { Sidebar } from '@/components/Sidebar';
import './globals.css';

export const metadata: Metadata = {
  title: { default: 'InkUI', template: '%s · InkUI' },
  description:
    'shadcn/ui-style terminal component library built on Ink (React for CLI)',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="layout">
          {/* Top nav */}
          <header className="topnav">
            <Link href="/" className="topnav-logo" style={{ textDecoration: 'none' }}>
              InkUI
            </Link>
            <span className="topnav-badge">v0.1.0</span>
            <span className="topnav-tagline">
              shadcn-style terminal components for Ink
            </span>
          </header>

          {/* Sidebar */}
          <Sidebar />

          {/* Page content */}
          <main className="main">{children}</main>
        </div>
      </body>
    </html>
  );
}
