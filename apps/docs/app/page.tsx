import type { Metadata } from 'next';
import Hero from '@/components/landing/Hero';
import StatsBar from '@/components/landing/StatsBar';
import ComponentGrid from '@/components/landing/ComponentGrid';
import FeaturesGrid from '@/components/landing/FeaturesGrid';
import CodeExample from '@/components/landing/CodeExample';
import InstallBanner from '@/components/landing/InstallBanner';
import SiteFooter from '@/components/landing/SiteFooter';
import SiteNav from '@/components/landing/SiteNav';

export const metadata: Metadata = {
  title: 'InkUI — Terminal component library for Ink',
};

export default function HomePage() {
  return (
    <div className="min-h-screen" style={{ background: '#0A0A0B', color: '#FAFAFA' }}>
      <SiteNav />
      <Hero />
      <StatsBar />
      <ComponentGrid />
      <FeaturesGrid />
      <CodeExample />
      <InstallBanner />
      <SiteFooter />
    </div>
  );
}
