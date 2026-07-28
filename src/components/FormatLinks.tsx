'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { TOOL_LINKS } from '@/lib/nav';

// On every format/tool page, link to the OTHER convert-tool pages so the
// 4 format pages form a tightly interlinked cluster and pass internal link
// equity evenly. `current` is the page's own href, which is excluded.
export default function FormatLinks({ current }: { current: string }) {
  const t = useTranslations('footer');
  const items = TOOL_LINKS.filter((l) => l.href !== current);
  if (items.length === 0) return null;

  return (
    <section className="format-links" aria-label={t('otherFormats')}>
      <h2 className="section-title">{t('otherFormats')}</h2>
      <ul className="format-links-list">
        {items.map((l) => (
          <li key={l.href}>
            <Link href={l.href}>{t(l.key)}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
