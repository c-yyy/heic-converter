'use client';

import { useTranslations } from 'next-intl';

// Step-by-step "how to convert" block shown directly under the converter
// tool on the homepage and every format page, so visitors (and Google) see
// concrete usage instructions right where the tool lives.
export default function HowTo() {
  const t = useTranslations('howTo');
  const steps = [
    { title: t('step1Title'), desc: t('step1Desc') },
    { title: t('step2Title'), desc: t('step2Desc') },
    { title: t('step3Title'), desc: t('step3Desc') },
  ];
  return (
    <section className="content-section how-to">
      <h2 className="section-title">{t('title')}</h2>
      <ol className="how-to-steps">
        {steps.map((s, i) => (
          <li key={i} className="how-to-step">
            <div className="how-to-step-num" aria-hidden="true">
              {i + 1}
            </div>
            <div className="how-to-step-body">
              <h3 className="how-to-step-title">{s.title}</h3>
              <p className="how-to-step-desc">{s.desc}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
