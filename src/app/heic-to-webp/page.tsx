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
