import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';
import BlogView from '@/components/BlogView';
import { buildBlogHubAlternates } from '@/lib/guides';

// Localized blog hubs live at `/<locale>/blog/`; the default locale (English)
// is additionally generated under `/en/blog/` as a redirect stub to `/blog/`.
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
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

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  // Invalid locales 404; the default locale (English) is fine here — `/en/blog/`
  // is a redirect stub handled by the layout's EnRedirect.
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }
  return <BlogView locale={locale} />;
}
