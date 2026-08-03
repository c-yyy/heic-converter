import { setRequestLocale } from 'next-intl/server';
import { legalContent, getLegalBySlug, buildLegalAlternates } from '@/lib/legal-content';

// Renders a legal/trust page (Privacy, About, Contact, Terms). Content comes
// from `legalContent` (one module, all locales) so these long-form pages stay
// out of the i18n message JSON. Pure editorial content — no widgets.
function paragraphs(body: string) {
  return body.split('\n').filter((p) => p.trim().length > 0);
}

export default function LegalView({
  locale,
  slug,
}: {
  locale: string;
  slug: string;
}) {
  setRequestLocale(locale);
  const key = getLegalBySlug(slug);
  if (!key) return null;
  const doc = legalContent[key][locale as 'en' | 'de' | 'ja' | 'zh'];
  if (!doc) return null;

  const siteUrl = process.env.SITE_URL ?? 'https://heic2any.online';
  const { canonical } = buildLegalAlternates(locale, slug);
  const homePath = locale === 'en' ? '/' : `/${locale}/`;

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}${homePath}` },
      { '@type': 'ListItem', position: 2, name: doc.h1, item: `${siteUrl}${canonical}` },
    ],
  };

  return (
    <article className="guide legal">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <h1 className="guide-h1">{doc.h1}</h1>
      <p className="guide-intro">{doc.intro}</p>

      <div className="guide-body">
        {doc.sections.map((s, i) => (
          <section key={i} className="guide-section">
            <h2>{s.title}</h2>
            {paragraphs(s.body).map((p, j) => (
              <p key={j}>{p}</p>
            ))}
          </section>
        ))}
        {doc.conclusion && <p className="guide-conclusion">{doc.conclusion}</p>}
      </div>

      {doc.contactEmail && (
        <div className="legal-contact">
          <a className="legal-email" href={`mailto:${doc.contactEmail}`}>
            {doc.contactEmail}
          </a>
        </div>
      )}
    </article>
  );
}
