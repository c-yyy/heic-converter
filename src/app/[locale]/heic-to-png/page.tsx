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
    title: t('titlePng'),
    description: t('descriptionPng'),
    alternates: {
      canonical:
        locale === routing.defaultLocale ? '/heic-to-png/' : `/${locale}/heic-to-png/`,
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

export default async function HeicToPngPage({
  params,
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  return <ConverterView locale={locale} page="png" />;
}
