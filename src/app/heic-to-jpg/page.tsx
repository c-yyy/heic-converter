import {getTranslations} from 'next-intl/server';
import Site from '@/components/Site';
import ConverterView from '@/components/ConverterView';

export async function generateMetadata() {
  const t = await getTranslations({locale: 'en', namespace: 'metadata'});
  return {
    title: t('titleJpg'),
    description: t('descriptionJpg'),
    alternates: {
      canonical: '/heic-to-jpg/',
      languages: {
        en: '/heic-to-jpg/',
        de: '/de/heic-to-jpg/',
        ja: '/ja/heic-to-jpg/',
        zh: '/zh/heic-to-jpg/',
      },
    },
    openGraph: {

      title: t('titleJpg'),
      description: t('descriptionJpg'),
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

// English (default locale) served at `/heic-to-jpg/` — no prefix.
export default function Page() {
  return (
    <Site locale="en">
      <ConverterView locale="en" page="jpg" />
    </Site>
  );
}
