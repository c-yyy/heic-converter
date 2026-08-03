// Generates out/sitemap.xml and out/robots.txt after `next build` (static export).
// Set SITE_URL env (e.g. https://your-domain.com) to control the base URL.
// Defaults to the Cloudflare Pages dev domain; override in Cloudflare build env.
import { writeFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SITE_URL = (process.env.SITE_URL || 'https://heic2any.online').replace(/\/+$/, '');

// Derive blog (article) routes from the single source of truth (src/lib/guides.ts)
// so the sitemap stays in sync when articles are added/removed.
const guidesSrc = readFileSync(join(__dirname, '..', 'src', 'lib', 'guides.ts'), 'utf8');
const BLOG_SLUGS = [...guidesSrc.matchAll(/slug:\s*'([^']+)'/g)].map((m) => m[1]);

// Derive legal/trust-page routes from src/lib/legal-content.ts (LEGAL_PAGES).
const legalSrc = readFileSync(join(__dirname, '..', 'src', 'lib', 'legal-content.ts'), 'utf8');
const LEGAL_SLUGS = [...legalSrc.matchAll(/slug:\s*'([^']+)'/g)].map((m) => m[1]);

// English (default locale) is served at the root — no locale prefix.
const EN_ROUTES = [
  '',
  'heic-to-jpg',
  'heic-to-png',
  'heic-to-webp',
  'heic-to-pdf',
  'blog',
  ...BLOG_SLUGS.map((s) => `blog/${s}`),
  ...LEGAL_SLUGS,
];
const LOCALES = ['de', 'ja', 'zh'];

const urls = new Set();
const add = (p) => {
  let u = SITE_URL + (p.startsWith('/') ? p : '/' + p);
  if (!u.endsWith('/')) u += '/'; // site uses trailingSlash: true
  urls.add(u);
};

for (const r of EN_ROUTES) add('/' + r);
for (const loc of LOCALES) {
  for (const r of EN_ROUTES) add(`/${loc}/${r}`);
}

const sorted = [...urls].sort();

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sorted
  .map(
    (u) =>
      `  <url><loc>${u}</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>`
  )
  .join('\n')}
</urlset>
`;

const robots = `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`;

const outDir = join(process.cwd(), 'out');
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'sitemap.xml'), sitemap, 'utf8');
writeFileSync(join(outDir, 'robots.txt'), robots, 'utf8');

console.log(`[sitemap] wrote ${sorted.length} URLs to out/sitemap.xml (base: ${SITE_URL})`);
