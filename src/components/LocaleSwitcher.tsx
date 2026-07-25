'use client';

import { useEffect, useRef, useState } from 'react';
import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';

const LOCALE_LABELS: Record<string, string> = {
  en: 'English',
  de: 'Deutsch',
  ja: '日本語',
  zh: '中文',
};

export default function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handlePointer = (e: MouseEvent | TouchEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', handlePointer);
    document.addEventListener('touchstart', handlePointer);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handlePointer);
      document.removeEventListener('touchstart', handlePointer);
      document.removeEventListener('keydown', handleKey);
    };
  }, [open]);

  const switchTo = (next: string) => {
    setOpen(false);
    if (next === locale) return;
    router.replace(pathname, { locale: next });
  };

  return (
    <div className="locale-switcher" ref={rootRef}>
      <button
        type="button"
        className="lang-switch"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Select language"
        onClick={() => setOpen((v) => !v)}
      >
        <span>{LOCALE_LABELS[locale] ?? locale}</span>
        <svg
          className={`lang-chevron${open ? ' open' : ''}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {open && (
        <ul className="locale-menu" role="listbox" aria-label="Language">
          {routing.locales.map((loc) => (
            <li key={loc}>
              <button
                type="button"
                role="option"
                aria-selected={loc === locale}
                className={`locale-option${loc === locale ? ' active' : ''}`}
                onClick={() => switchTo(loc)}
              >
                {LOCALE_LABELS[loc] ?? loc}
                {loc === locale && (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
