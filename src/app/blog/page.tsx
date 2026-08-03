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
