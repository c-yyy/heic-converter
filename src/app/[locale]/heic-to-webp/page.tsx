import {getTranslations} from 'next-intl/server';
import {routing} from '@/i18n/routing';
import ConverterView from '@/components/ConverterView';

export async function generateMetadata({
  params,
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'metadata'});

  return {
    title: t('titleWebp'),
    description: t('descriptionWebp'),
    alternates: {
      canonical:
        locale === routing.defaultLocale ? '/heic-to-webp/' : `/${locale}/heic-to-webp/`,
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

export default async function HeicToWebpPage({
  params,
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  return <ConverterView locale={locale} page="webp" />;
}
