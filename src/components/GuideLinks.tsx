'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { GUIDES } from '@/lib/guides';

// Compact cards on the homepage/tool pages that link to the long-tail SEO
// guide pages, keeping the homepage lean while spreading internal link equity.
export default function GuideLinks() {
  const t = useTranslations('guides');

  return (
    <section className="guide-links">
      <h2 className="section-title">{t('sectionTitle')}</h2>
      <div className="guide-links-grid">
        {GUIDES.map((g) => (
          <Link key={g.slug} href={`/blog/${g.slug}`} className="guide-link-card">
            <h3 className="guide-link-title">{t(`${g.key}.cardTitle`)}</h3>
            <p className="guide-link-desc">{t(`${g.key}.cardDesc`)}</p>
            <span className="guide-link-arrow" aria-hidden="true">
              →
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
