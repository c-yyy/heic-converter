'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { GUIDES } from '@/lib/guides';

export default function Footer() {
  const t = useTranslations('footer');
  const tg = useTranslations('guides');

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-inner">
          <div className="footer-brand">
            <div className="footer-brand-name">HEIC Converter</div>
            <p className="footer-brand-desc">{t('privacy')}</p>
          </div>
          <div className="footer-links-section">
            <h4>{t('tools')}</h4>
            <ul className="footer-links">
              <li><Link href="/">{t('home')}</Link></li>
              <li><Link href="/heic-to-jpg">{t('heicToJpg')}</Link></li>
              <li><Link href="/heic-to-png">{t('heicToPng')}</Link></li>
              <li><Link href="/heic-to-webp">{t('heicToWebp')}</Link></li>
              <li><Link href="/heic-to-pdf">{t('heicToPdf')}</Link></li>
            </ul>
          </div>
          <div className="footer-links-section">
            <h4>{tg('sectionTitle')}</h4>
            <ul className="footer-links">
              {GUIDES.map((g) => (
                <li key={g.slug}>
                  <Link href={`/doc/${g.slug}`}>{tg(`${g.key}.cardTitle`)}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span className="footer-copyright">{t('copyright', { year: new Date().getFullYear() })}</span>
          <a href="https://buymeacoffee.com" target="_blank" rel="noopener noreferrer" className="coffee-btn">
            ☕ {t('buyMeCoffee')}
          </a>
        </div>
      </div>
    </footer>
  );
}
