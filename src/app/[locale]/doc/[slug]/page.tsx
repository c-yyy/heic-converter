import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import GuideView from '@/components/GuideView';
import {getGuideMeta} from '@/lib/guide-meta';
import {GUIDES, buildGuideAlternates, getGuideBySlug} from '@/lib/guides';

// Localized guide pages live at `/<locale>/doc/<slug>/` (English is the
// unprefixed root, so it is excluded here).
export function generateStaticParams() {
  return routing.locales
    .filter((loc) => loc !== routing.defaultLocale)
    .flatMap((locale) => GUIDES.map((g) => ({locale, slug: g.slug})));
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
