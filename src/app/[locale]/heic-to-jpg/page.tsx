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
    title: t('titleJpg'),
    description: t('descriptionJpg'),
    alternates: {
      canonical:
        locale === routing.defaultLocale ? '/heic-to-jpg/' : `/${locale}/heic-to-jpg/`,
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
    },
  };
}

export default async function HeicToJpgPage({
  params,
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  return <ConverterView locale={locale} page="jpg" />;
}
