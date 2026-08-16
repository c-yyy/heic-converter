'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { GUIDES } from '@/lib/guides';
import { TOOL_LINKS } from '@/lib/nav';
import { LEGAL_PAGES, legalContent } from '@/lib/legal-content';

export default function Footer() {
  const t = useTranslations('footer');
  const tg = useTranslations('guides');
  const tb = useTranslations('blog');
  const locale = useLocale() as 'en' | 'de' | 'ja' | 'zh';

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-inner">
          <div className="footer-brand">
            <div className="footer-brand-name">HEIC Converter</div>
            <p className="footer-brand-desc">
              HEIC (High Efficiency Image Container) is Apple’s default photo format, but it doesn’t open everywhere. This free converter turns HEIC into JPG, PNG, WebP, or PDF right in your browser — no upload, no account, and no visible quality loss. Everything runs locally on your device, so private photos never leave it.
            </p>
          </div>
          <div className="footer-links-section">
            <h4>{t('tools')}</h4>
            <ul className="footer-links">
              <li><Link href="/">{t('home')}</Link></li>
              {TOOL_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href}>{t(l.key)}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="footer-links-section">
            <h4>{tg('sectionTitle')}</h4>
            <ul className="footer-links">
              <li>
                <Link href="/blog">{tb('allGuides')}</Link>
              </li>
              {GUIDES.map((g) => (
                <li key={g.slug}>
                  <Link href={`/blog/${g.slug}`}>{tg(`${g.key}.cardTitle`)}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="footer-links-section">
            <h4>{t('company')}</h4>
            <ul className="footer-links">
              {LEGAL_PAGES.map((p) => (
                <li key={p.slug}>
                  <Link href={`/${p.slug}`}>{legalContent[p.slug][locale].h1}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span className="footer-copyright">{t('copyright', { year: new Date().getFullYear() })}</span>
        </div>
      </div>
    </footer>
  );
}
