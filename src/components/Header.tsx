'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { usePathname, Link } from '@/i18n/navigation';
import LocaleSwitcher from './LocaleSwitcher';
import { TOOL_LINKS } from '@/lib/nav';

export default function Header() {
  // Tool labels live in the `footer` namespace so the header and footer
  // always show identical wording (single source of truth: src/lib/nav.ts).
  const t = useTranslations('footer');
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [menuOpen]);

  const navItems = TOOL_LINKS.map((l) => ({ href: l.href, label: t(l.key) }));

  return (
    <header className="header">
      <div className="header-inner">
        <Link href="/" className="header-logo" aria-label="HEIC Converter home">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="3" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <path d="M21 15l-5-5L5 21" />
          </svg>
          HEIC Converter
        </Link>

        {!isHome && (
          <nav className="header-nav" aria-label="Primary">
            <ul className="header-nav-list">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={pathname === item.href ? 'active' : ''}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}

        <div className="header-actions">
          <LocaleSwitcher />
          {!isHome && (
            <button
              type="button"
              className={`header-menu-toggle${menuOpen ? ' open' : ''}`}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((v) => !v)}
            >
              <span />
              <span />
              <span />
            </button>
          )}
        </div>
      </div>

      {!isHome && (
        <div
          id="mobile-menu"
          className={`header-mobile-menu${menuOpen ? ' open' : ''}`}
          hidden={!menuOpen}
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={pathname === item.href ? 'active' : ''}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
