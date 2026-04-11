import type { Metadata } from 'next';
import Hero from '@/components/landing/Hero';
import StatsBar from '@/components/landing/StatsBar';
import ComponentShowcase from '@/components/landing/ComponentShowcase';
import FeaturesGrid from '@/components/landing/FeaturesGrid';
import CodeExample from '@/components/landing/CodeExample';
import BuiltWithInkUI from '@/components/landing/BuiltWithInkUI';
import InstallBanner from '@/components/landing/InstallBanner';
import SiteFooter from '@/components/landing/SiteFooter';
import SiteNav from '@/components/landing/SiteNav';

export const metadata: Metadata = {
  title: 'InkUI — Terminal component library for Ink',
};

export default function HomePage() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)', color: 'var(--text)' }}>
      <SiteNav />
      <Hero />
      <StatsBar />
      <ComponentShowcase />
      <FeaturesGrid />
      <CodeExample />
      <BuiltWithInkUI />
      <InstallBanner />
      <SiteFooter />
    </div>
  );
}
