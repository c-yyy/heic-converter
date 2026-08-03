import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { GUIDES } from '@/lib/guides';

// Renders the /blog hub: a keyword-rich title + intro from the `blog`
// namespace, then an index of every guide article with internal links.
// This is editorial index content (no converter widget) and emits an
// ItemList JSON-LD so search engines understand the article collection.
export default async function BlogView({ locale }: { locale: string }) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'blog' });
  const messages = (await import(`../../messages/${locale}.json`)).default;

  const siteUrl = process.env.SITE_URL ?? 'https://heic2any.online';
  const basePath = locale === 'en' ? '/blog/' : `/${locale}/blog/`;

  const itemListLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: GUIDES.map((g, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: messages.guides[g.key].cardTitle,
      url: `${siteUrl}${basePath}${g.slug}/`,
    })),
  };

  return (
    <section className="blog-hub">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }}
      />
      <h1 className="blog-hub-title">{t('hubTitle')}</h1>
      <p className="blog-hub-intro">{t('intro')}</p>

      <ul className="blog-hub-list">
        {GUIDES.map((g) => {
          const gd = messages.guides[g.key];
          return (
            <li key={g.slug} className="blog-hub-item">
              <Link href={`/blog/${g.slug}`} className="blog-hub-link">
                <h2 className="blog-hub-card-title">{gd.cardTitle}</h2>
                <p className="blog-hub-card-desc">{gd.cardDesc}</p>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
