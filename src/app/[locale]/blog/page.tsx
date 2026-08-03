import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';
import BlogView from '@/components/BlogView';
import { buildBlogHubAlternates } from '@/lib/guides';

// Localized blog hubs live at `/<locale>/blog/` (English is the unprefixed
// root `/blog/`, so it is excluded here).
export function generateStaticParams() {
  return routing.locales
    .filter((loc) => loc !== routing.defaultLocale)
    .map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'blog' });
  const { canonical, languages } = buildBlogHubAlternates(locale);
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: { canonical, languages },
    openGraph: {
      title: t('metaTitle'),
      description: t('metaDescription'),
      type: 'website',
      siteName: 'HEIC Converter',
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (
    locale === routing.defaultLocale ||
    !routing.locales.includes(locale as (typeof routing.locales)[number])
  ) {
    notFound();
  }
  return <BlogView locale={locale} />;
}
