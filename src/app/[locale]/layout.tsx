import {getTranslations} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import Site from '@/components/Site';
import EnRedirect from '@/components/EnRedirect';

// Default locale (English) is served at the root (no prefix). `/en` is still
// statically generated so that static hosts don't 404 on it — the layout
// redirects any `/en/...` request to the unprefixed equivalent.
export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
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
  // English is served unprefixed at `/`; `/en` and any `/en/...` URLs are
  // still statically generated (so static hosts don't 404) and bounce to the
  // canonical unprefixed path via EnRedirect.
  if (locale === routing.defaultLocale) {
    return (
      <>
        <EnRedirect />
        <Site locale={locale}>{children}</Site>
      </>
    );
  }
  return <Site locale={locale}>{children}</Site>;
}
