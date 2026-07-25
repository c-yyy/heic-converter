import fs from 'fs';
import path from 'path';
import { getGuideBySlug } from './guides';

// Server-only: reads the message JSON at build time to produce SEO metadata
// (title/description) for a guide page. Safe under `output: 'export'`
// because generateMetadata runs during the static build.
export function getGuideMeta(locale: string, slug: string) {
  const guide = getGuideBySlug(slug);
  if (!guide) return null;
  const file = path.join(process.cwd(), 'messages', `${locale}.json`);
  const messages = JSON.parse(fs.readFileSync(file, 'utf8'));
  const g = messages.guides?.[guide.key] ?? {};
  return {
    title: g.metaTitle ?? messages.metadata.title,
    description: g.metaDescription ?? messages.metadata.description,
  };
}
