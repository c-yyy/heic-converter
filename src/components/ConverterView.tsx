import {getTranslations, setRequestLocale} from 'next-intl/server';
import {getFAQSchema} from '@/lib/schemas';
import ConverterApp from './ConverterApp';
import IconRow from './IconRow';
import GuideLinks from './GuideLinks';
import FAQ from './FAQ';

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

      {/* Feature Icons */}
      <IconRow />

      {/* SEO Content — links to long-tail guide pages */}
      <GuideLinks />

      {/* FAQ */}
      <FAQ />
    </>
  );
}
