import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { COMPONENTS, COMPONENT_MAP } from '@/lib/components-data';
import { PropsTable } from '@/components/PropsTable';
import { CodeBlock } from '@/components/CodeBlock';
import { TerminalPreview } from '@/components/TerminalPreviewWrapper';

// Tell Next.js which slugs to pre-render at build time
export function generateStaticParams() {
  return COMPONENTS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = COMPONENT_MAP[slug];
  if (!c) return {};
  return { title: `${c.name}`, description: c.description };
}

export default async function ComponentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = COMPONENT_MAP[slug];
  if (!c) notFound();

  return (
    <>
      {/* Header */}
      <div className="page-header">
        <h1 className="page-title">{c.name}</h1>
        <p className="page-desc">{c.description}</p>
        <code className="page-install">
          <span>$</span> npx inkui add {c.slug}
        </code>
      </div>

      {/* Live terminal preview */}
      <section className="section">
        <h2 className="section-title">Preview</h2>
        <TerminalPreview component={c.slug} staticPreview={c.preview} />
      </section>

      {/* Usage */}
      <section className="section">
        <h2 className="section-title">Usage</h2>
        <CodeBlock code={c.usage} language="tsx" />
      </section>

      {/* Props */}
      <section className="section">
        <h2 className="section-title">Props</h2>
        <PropsTable props={c.props} />
        <p style={{ marginTop: 12, fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          * required
        </p>
      </section>
    </>
  );
}
