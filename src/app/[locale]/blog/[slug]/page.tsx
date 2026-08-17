import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import GuideView from '@/components/GuideView';
import {getGuideMeta} from '@/lib/guide-meta';
import {GUIDES, buildGuideAlternates, getGuideBySlug} from '@/lib/guides';

// Localized blog articles live at `/<locale>/blog/<slug>/`; the default locale
// (English) is additionally generated under `/en/blog/<slug>/` as redirect
// stubs to the unprefixed `/blog/<slug>/`.
export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    GUIDES.map((g) => ({locale, slug: g.slug}))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{locale: string; slug: string}>;
}) {
  const {locale, slug} = await params;
  if (!getGuideBySlug(slug)) return {};
  const meta = getGuideMeta(locale, slug);
  const {canonical, languages} = buildGuideAlternates(locale, slug);
  return {
    title: meta?.title,
    description: meta?.description,
    alternates: {canonical, languages},
    openGraph: {

      title: meta?.title,
      description: meta?.description,
      type: 'article',
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
  params: Promise<{locale: string; slug: string}>;
}) {
  const {locale, slug} = await params;
  if (!getGuideBySlug(slug)) notFound();
  return <GuideView locale={locale} slug={slug} />;
}
