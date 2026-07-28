// Client-safe guide configuration (no Node imports, so it can be used in
// client components like GuideLinks without pulling `fs` into the bundle).

export const GUIDES = [
  { slug: 'what-is-heic', key: 'whatIsHeic', cta: '/heic-to-jpg' },
  { slug: 'heic-vs-jpeg', key: 'heicVsJpeg', cta: '/heic-to-jpg' },
  { slug: 'open-heic-on-windows', key: 'openHeicWindows', cta: '/heic-to-jpg' },
  { slug: 'open-heic-on-mac', key: 'openHeicMac', cta: '/heic-to-jpg' },
  { slug: 'heic-to-pdf', key: 'heicToPdf', cta: '/heic-to-pdf' },
] as const;

export type GuideSlug = (typeof GUIDES)[number]['slug'];
export type GuideKey = (typeof GUIDES)[number]['key'];

export function getGuideBySlug(slug: string) {
  return GUIDES.find((g) => g.slug === slug) ?? null;
}

// All locale variants of a given guide slug (for hreflang alternates).
export const GUIDE_LOCALES = ['en', 'de', 'ja', 'zh'] as const;

// Public path of a guide (English lives at the root `/blog/...`). Client
// components use this so links stay DRY and consistent with the route.
export function guidePath(slug: string) {
  return `/blog/${slug}`;
}

// Build canonical + hreflang alternates for a guide page. With
// `localePrefix: 'as-needed'`, English is the unprefixed default and every
// other locale adds its `/xx/` prefix — which also applies to the `/blog/` path.
export function buildGuideAlternates(locale: string, slug: string) {
  const languages: Record<string, string> = {};
  for (const loc of GUIDE_LOCALES) {
    languages[loc] = loc === 'en' ? `/blog/${slug}/` : `/${loc}/blog/${slug}/`;
  }
  return {
    canonical: locale === 'en' ? `/blog/${slug}/` : `/${locale}/blog/${slug}/`,
    languages,
  };
}
