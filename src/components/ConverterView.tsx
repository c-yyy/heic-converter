import {getTranslations, setRequestLocale} from 'next-intl/server';
import {getFAQSchema} from '@/lib/schemas';
import ConverterApp from './ConverterApp';
import IconRow from './IconRow';
import GuideLinks from './GuideLinks';
import FormatLinks from './FormatLinks';
import FAQ from './FAQ';
import HowTo from './HowTo';
import WhyChoose from './WhyChoose';

type Page = 'home' | 'jpg' | 'webp' | 'png' | 'pdf';

const HERO_KEYS: Record<Page, {title: string; accent: string; subtitle: string}> = {
  home: {title: 'title', accent: 'titleAccent', subtitle: 'subtitle'},
  jpg: {title: 'titleJpg', accent: 'titleAccentJpg', subtitle: 'subtitleJpg'},
  png: {title: 'titlePng', accent: 'titleAccentPng', subtitle: 'subtitlePng'},
  webp: {title: 'titleWebp', accent: 'titleAccentWebp', subtitle: 'subtitleWebp'},
  pdf: {title: 'titlePdf', accent: 'titleAccentPdf', subtitle: 'subtitlePdf'},
};

const FORMAT: Record<Page, 'image/png' | 'image/jpeg' | 'image/webp' | 'application/pdf'> = {
  home: 'image/png',
  jpg: 'image/jpeg',
  png: 'image/png',
  webp: 'image/webp',
  pdf: 'application/pdf',
};

// Unique per-format editorial paragraph (keys live in the `hero` namespace).
// Rendered as a distinct block on each format landing page so the four pages
// don't read as near-duplicate doorways.
const SEO_KEYS: Record<Page, string> = {
  home: 'seoHome',
  jpg: 'seoJpg',
  png: 'seoPng',
  webp: 'seoWebp',
  pdf: 'seoPdf',
};

// Shared converter page body for every locale + every format variant.
export default async function ConverterView({
  locale,
  page,
}: {
  locale: string;
  page: Page;
}) {
  setRequestLocale(locale);
  const t = await getTranslations({locale, namespace: 'hero'});
  const k = HERO_KEYS[page];

  let faqSchema: object | null = null;
  {
    const faqT = await getTranslations({locale, namespace: 'faq'});
    faqSchema = getFAQSchema([
      {question: faqT('q1'), answer: faqT('a1')},
      {question: faqT('q2'), answer: faqT('a2')},
      {question: faqT('q3'), answer: faqT('a3')},
      {question: faqT('q4'), answer: faqT('a4')},
      {question: faqT('q5'), answer: faqT('a5')},
    ]);
  }

  // The href of THIS page, used by FormatLinks to exclude self-links.
  const currentHref = page === 'home' ? '/' : `/heic-to-${page}`;

  return (
    <>
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{__html: JSON.stringify(faqSchema)}}
        />
      )}

      {/* Hero */}
      <section className="hero">
        <h1 className="hero-title">
          {t(k.title)}
          <br />
          <span className="hero-title-accent">{t(k.accent)}</span>
        </h1>
        <p className="hero-subtitle">{t(k.subtitle)}</p>
      </section>

      {/* Core Converter */}
      <ConverterApp defaultFormat={FORMAT[page]} />

      {/* How-to instructions — shown right under the tool */}
      <HowTo />

      {/* Feature Icons */}
      <IconRow />

      {/* SEO Content — links to long-tail guide pages */}
      <GuideLinks />

      {/* Unique per-format editorial paragraph (distinct copy per page) */}
      {t.has(SEO_KEYS[page]) && (
        <section className="format-seo">
          <p>{t(SEO_KEYS[page])}</p>
        </section>
      )}

      {/* Internal links to the other format pages (cluster) */}
      <FormatLinks current={currentHref} />

      {/* Why a local, in-browser converter — privacy & performance */}
      <WhyChoose />

      {/* FAQ */}
      <FAQ />
    </>
  );
}
