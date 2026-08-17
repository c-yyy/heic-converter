'use client';

import {usePathname} from 'next/navigation';
import {useEffect} from 'react';

/**
 * English is the default locale and is served at `/` with no prefix.
 * `/en` and any `/en/...` URLs exist only as static files (so static hosts
 * don't 404 on them); this component immediately bounces those visits to
 * the canonical unprefixed path, e.g. `/en/contact` -> `/contact`.
 */
export default function EnRedirect() {
  const pathname = usePathname();

  useEffect(() => {
    const target = pathname.replace(/^\/en(?=\/|$)/, '') || '/';
    if (target !== pathname) {
      window.location.replace(target);
    }
  }, [pathname]);

  return null;
}
