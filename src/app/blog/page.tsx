import Site from '@/components/Site';
import BlogView from '@/components/BlogView';
import { getTranslations } from 'next-intl/server';
import { buildBlogHubAlternates } from '@/lib/guides';

// English (default locale) blog hub lives at `/blog/`.
export async function generateMetadata() {
  const t = await getTranslations({ locale: 'en', namespace: 'blog' });
  const { canonical, languages } = buildBlogHubAlternates('en');
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

export default function Page() {
  return (
    <Site locale="en">
      <BlogView locale="en" />
    </Site>
  );
}
