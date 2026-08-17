import {notFound} from 'next/navigation';
import Site from '@/components/Site';
import GuideView from '@/components/GuideView';
import {getGuideMeta} from '@/lib/guide-meta';
import {GUIDES, buildGuideAlternates, getGuideBySlug} from '@/lib/guides';

// English (default locale) blog articles live at `/blog/<slug>/`.
export function generateStaticParams() {
  return GUIDES.map((g) => ({slug: g.slug}));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{slug: string}>;
}) {
  const {slug} = await params;
  if (!getGuideBySlug(slug)) return {};
  const meta = getGuideMeta('en', slug);
  const {canonical, languages} = buildGuideAlternates('en', slug);
  return {
    title: meta?.title ?? 'HEIC Guide',
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
  params: Promise<{slug: string}>;
}) {
  const {slug} = await params;
  if (!getGuideBySlug(slug)) notFound();
  return (
    <Site locale="en">
      <GuideView locale="en" slug={slug} />
    </Site>
  );
}
