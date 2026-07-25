'use client';

import {useEffect} from 'react';

// Static export can't set <html lang> per-locale at build time (the root
// layout is shared across all locales), so we sync it on the client.
export default function HtmlLangSync({locale}: {locale: string}) {
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);
  return null;
}
