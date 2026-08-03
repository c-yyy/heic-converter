import Site from '@/components/Site';
import LegalView from '@/components/LegalView';
import { getLegalMeta, buildLegalAlternates } from '@/lib/legal-content';

export async function generateMetadata() {
  const meta = getLegalMeta('en', 'privacy');
  const { canonical, languages } = buildLegalAlternates('en', 'privacy');
  return {
    title: meta?.title,
    description: meta?.description,
    alternates: { canonical, languages },
    openGraph: {
      title: meta?.title,
      description: meta?.description,
      type: 'article',
      siteName: 'HEIC Converter',
    },
  };
}

export default function Page() {
  return (
    <Site locale="en">
      <LegalView locale="en" slug="privacy" />
    </Site>
  );
}
