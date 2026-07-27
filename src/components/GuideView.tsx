import { setRequestLocale } from 'next-intl/server';
import ConverterApp from './ConverterApp';
import { Link } from '@/i18n/navigation';
import { GUIDES, buildGuideAlternates } from '@/lib/guides';

// Renders a long-tail SEO guide page: keyword-rich h1, a short intro, the
// converter kept above the fold (function-as-content + strong user signals),
// the article body, and internal links back to tools + sibling guides.
export default async function GuideView({
  locale,
  slug,
}: {
  locale: string;
  slug: string;
}) {
  setRequestLocale(locale);
  const guide = GUIDES.find((g) => g.slug === slug);
  if (!guide) return null;

  const messages = (await import(`../../messages/${locale}.json`)).default;
  const g = messages.guides[guide.key];

  const sections = [1, 2, 3, 4, 5, 6, 7, 8]
    .map((n) => ({ title: g[`s${n}Title`], body: g[`s${n}Body`] }))
    .filter((s) => s.title && s.body);

  const others = GUIDES.filter((x) => x.slug !== slug);

  // Structured data: BreadcrumbList (Home -> guide) + FAQPage (if FAQs exist).
  const faq: { q: string; a: string }[] = Array.isArray(g.faq) ? g.faq : [];
  const siteUrl = process.env.SITE_URL ?? 'https://heic2any.online';
  const { canonical } = buildGuideAlternates(locale, slug);
  const homePath = locale === 'en' ? '/' : `/${locale}/`;

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}${homePath}` },
      { '@type': 'ListItem', position: 2, name: g.h1, item: `${siteUrl}${canonical}` },
    ],
  };
  const faqLd =
    faq.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faq.map((f) => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a },
          })),
        }
      : null;

  return (
    <article className="guide">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      {faqLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
      )}
      <h1 className="guide-h1">{g.h1}</h1>
      <p className="guide-intro">{g.intro}</p>

      {/* Core converter above the fold */}
      <ConverterApp defaultFormat={guide.key === 'heicToPdf' ? 'application/pdf' : 'image/png'} />

      <div className="guide-body">
        {sections.map((s, i) => (
          <section key={i} className="guide-section">
            <h2>{s.title}</h2>
            <p>{s.body}</p>
          </section>
        ))}
        {g.conclusion && <p className="guide-conclusion">{g.conclusion}</p>}
      </div>

      <nav className="guide-related" aria-label="Related guides">
        <h2 className="guide-related-title">{messages.guides.sectionTitle}</h2>
        <ul className="guide-related-list">
          <li>
            <Link href="/heic-to-png">{messages.footer.heicToPng}</Link>
          </li>
          <li>
            <Link href="/heic-to-jpg">{messages.footer.heicToJpg}</Link>
          </li>
          <li>
            <Link href="/heic-to-webp">{messages.footer.heicToWebp}</Link>
          </li>
          <li>
            <Link href="/heic-to-pdf">{messages.footer.heicToPdf}</Link>
          </li>
          {others.map((o) => (
            <li key={o.slug}>
              <Link href={`/doc/${o.slug}`}>{messages.guides[o.key].cardTitle}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </article>
  );
}
