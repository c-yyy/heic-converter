import {getTranslations} from 'next-intl/server';
import Site from '@/components/Site';
import ConverterView from '@/components/ConverterView';

export async function generateMetadata() {
  const t = await getTranslations({locale: 'en', namespace: 'metadata'});
  return {
    title: t('titlePng'),
    description: t('descriptionPng'),
    alternates: {
      canonical: '/heic-to-png/',
      languages: {
        en: '/heic-to-png/',
        de: '/de/heic-to-png/',
        ja: '/ja/heic-to-png/',
        zh: '/zh/heic-to-png/',
      },
    },
    openGraph: {

      title: t('titlePng'),
      description: t('descriptionPng'),
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

// English (default locale) served at the root — no prefix.
export default function Page() {
  return (
    <Site locale="en">
      <ConverterView locale="en" page="png" />
    </Site>
  );
}
