import Site from '@/components/Site';
import LegalView from '@/components/LegalView';
import { getLegalMeta, buildLegalAlternates } from '@/lib/legal-content';

export async function generateMetadata() {
  const meta = getLegalMeta('en', 'about');
  const { canonical, languages } = buildLegalAlternates('en', 'about');
  return {
    title: meta?.title,
    description: meta?.description,
    alternates: { canonical, languages },
    openGraph: {

      title: meta?.title,
      description: meta?.description,
      type: 'article',
      siteName: 'HEIC Converter',
      images: [
        {
          url: 'https://heic2any.online/opengraph-image.png',
          width: 1200,
          height: 630,
          alt: 'HEIC Converter',
        },
      ],

    },
    twitter: {
      card: 'summary_large_image',
      images: [
        {
          url: 'https://heic2any.online/opengraph-image.png',
          width: 1200,
          height: 630,
          alt: 'HEIC Converter',
        },
      ],
    },
  };
}

export default function Page() {
  return (
    <Site locale="en">
      <LegalView locale="en" slug="about" />
    </Site>
  );
}
