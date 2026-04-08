import { redirect } from 'next/navigation';

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ComponentRedirect({ params }: Props) {
  const { slug } = await params;
  redirect(`/docs/components/${slug}`);
}
