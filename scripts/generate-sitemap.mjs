// Generates out/sitemap.xml and out/robots.txt after `next build` (static export).
// Set SITE_URL env (e.g. https://your-domain.com) to control the base URL.
// Defaults to the Cloudflare Pages dev domain; override in Cloudflare build env.
import { writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const SITE_URL = (process.env.SITE_URL || 'https://heic-converter.pages.dev').replace(/\/+$/, '');

// English (default locale) is served at the root — no locale prefix.
const EN_ROUTES = [
  '',
  'heic-to-jpg',
  'heic-to-webp',
  'doc/what-is-heic',
  'doc/heic-vs-jpeg',
  'doc/open-heic-on-windows',
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
