import {getTranslations} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import Site from '@/components/Site';

// Only non-default locales live under /[locale]; English is served at the
// root (no prefix) so `/en` is intentionally not generated.
const NON_DEFAULT = routing.locales.filter((l) => l !== routing.defaultLocale);

export function generateStaticParams() {
  return NON_DEFAULT.map((locale) => ({locale}));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'metadata'});

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: locale === routing.defaultLocale ? '/' : `/${locale}/`,
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

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }
  return <Site locale={locale}>{children}</Site>;
}
