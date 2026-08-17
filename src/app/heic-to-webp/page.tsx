import {getTranslations} from 'next-intl/server';
import Site from '@/components/Site';
import ConverterView from '@/components/ConverterView';

export async function generateMetadata() {
  const t = await getTranslations({locale: 'en', namespace: 'metadata'});
  return {
    title: t('titleWebp'),
    description: t('descriptionWebp'),
    alternates: {
      canonical: '/heic-to-webp/',
      languages: {
        en: '/heic-to-webp/',
        de: '/de/heic-to-webp/',
        ja: '/ja/heic-to-webp/',
        zh: '/zh/heic-to-webp/',
      },
    },
    openGraph: {

      title: t('titleWebp'),
      description: t('descriptionWebp'),
      type: 'website',
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

// English (default locale) served at `/heic-to-webp/` — no prefix.
export default function Page() {
  return (
    <Site locale="en">
      <ConverterView locale="en" page="webp" />
    </Site>
  );
}
