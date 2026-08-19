'use client';

import { useTranslations } from 'next-intl';

// "Why a local converter" block — explains the privacy/performance science
// behind in-browser HEIC conversion. Adds editorial depth and reinforces the
// site's core differentiator (no upload) on every converter page.
export default function WhyChoose() {
  const t = useTranslations('whyChoose');
  const points = [
    { title: t('point1Title'), desc: t('point1Desc') },
    { title: t('point2Title'), desc: t('point2Desc') },
    { title: t('point3Title'), desc: t('point3Desc') },
  ];
  return (
    <section className="content-section why-choose">
      <h2 className="section-title">{t('title')}</h2>
      <div className="why-choose-list">
        {points.map((p, i) => (
          <div key={i} className="why-choose-item">
            <h3 className="why-choose-title">{p.title}</h3>
            <p className="why-choose-desc">{p.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
