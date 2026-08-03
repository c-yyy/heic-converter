import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { GUIDES, buildGuideAlternates } from '@/lib/guides';
import { TOOL_LINKS } from '@/lib/nav';

// Optional comparison table embedded in a guide's message data:
// { caption?: string; headers: string[]; rows: string[][] }
function ComparisonTable({ data }: { data: { caption?: string; headers: string[]; rows: string[][] } }) {
  return (
    <div className="guide-table-wrap">
      {data.caption && <p className="guide-table-caption">{data.caption}</p>}
      <table className="guide-table">
        <thead>
          <tr>
            {data.headers.map((h, i) => (
              <th key={i}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.rows.map((row, ri) => (
            <tr key={ri}>
              {row.map((cell, ci) => (
                <td key={ci} className={ci === 0 ? 'guide-table-feature' : ''}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Renders a blog article page: keyword-rich h1, a short intro, the article
// body (multi-paragraph text + optional comparison table), and internal links
// to sibling articles. No converter or other interactive widgets — pure
// editorial content.
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

  // A single contextual "convert" CTA linking the article to its most
  // relevant format page. This is editorial internal linking, not a
  // converter widget — it keeps blog pages converter-free while still
  // passing link equity to the tool pages.
  const ctaLink = TOOL_LINKS.find((l) => l.href === guide.cta) ?? null;
  const tf = await getTranslations({ locale, namespace: 'footer' });

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

      <div className="guide-body">
        {sections.map((s, i) => (
          <section key={i} className="guide-section">
            <h2>{s.title}</h2>
            {s.body
              .split('\n')
              .filter((p: string) => p.trim().length > 0)
              .map((p: string, j: number) => (
                <p key={j}>{p}</p>
              ))}
          </section>
        ))}
        {g.comparison && <ComparisonTable data={g.comparison} />}
        {g.conclusion && <p className="guide-conclusion">{g.conclusion}</p>}
      </div>

      {ctaLink && (
        <div className="guide-cta">
          <Link href={ctaLink.href}>{tf(ctaLink.key)}</Link>
        </div>
      )}

      <nav className="guide-related" aria-label="Related articles">
        <h2 className="guide-related-title">{messages.guides.sectionTitle}</h2>
        <ul className="guide-related-list">
          {others.map((o) => (
            <li key={o.slug}>
              <Link href={`/blog/${o.slug}`}>{messages.guides[o.key].cardTitle}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </article>
  );
}
