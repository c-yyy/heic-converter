import {getTranslations} from 'next-intl/server';
import Site from '@/components/Site';
import ConverterView from '@/components/ConverterView';

export async function generateMetadata() {
  const t = await getTranslations({locale: 'en', namespace: 'metadata'});
  return {
    title: t('titlePdf'),
    description: t('descriptionPdf'),
    alternates: {
      canonical: '/heic-to-pdf/',
      languages: {
        en: '/heic-to-pdf/',
        de: '/de/heic-to-pdf/',
        ja: '/ja/heic-to-pdf/',
        zh: '/zh/heic-to-pdf/',
      },
    },
    openGraph: {

      title: t('titlePdf'),
      description: t('descriptionPdf'),
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
      <ConverterView locale="en" page="pdf" />
    </Site>
  );
}
