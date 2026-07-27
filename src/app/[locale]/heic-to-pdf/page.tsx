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
    title: t('titlePdf'),
    description: t('descriptionPdf'),
    alternates: {
      canonical:
        locale === routing.defaultLocale ? '/heic-to-pdf/' : `/${locale}/heic-to-pdf/`,
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
    },
  };
}

export default async function HeicToPdfPage({
  params,
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  return <ConverterView locale={locale} page="pdf" />;
}
