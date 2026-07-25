import {getTranslations} from 'next-intl/server';
import Site from '@/components/Site';
import ConverterView from '@/components/ConverterView';

export async function generateMetadata() {
  const t = await getTranslations({locale: 'en', namespace: 'metadata'});
  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: '/',
      languages: {
        en: '/',
        de: '/de/',
        ja: '/ja/',
        zh: '/zh/',
      },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
      siteName: 'HEIC Converter',
    },
  };
}

// English (default locale) served at the root `/` — no prefix.
export default function Page() {
  return (
    <Site locale="en">
      <ConverterView locale="en" page="home" />
    </Site>
  );
}
