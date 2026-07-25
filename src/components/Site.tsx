import type {ReactNode} from 'react';
import {NextIntlClientProvider} from 'next-intl';
import {setRequestLocale} from 'next-intl/server';
import {getSoftwareApplicationSchema} from '@/lib/schemas';
import Header from './Header';
import Footer from './Footer';
import HtmlLangSync from './HtmlLangSync';
import {ToastProvider} from './Toast';

// Shared shell for every page: next-intl provider + Header/Footer + JSON-LD.
// Used by the root English pages and by the [locale] layout (de/ja/zh).
export default async function Site({
  locale,
  children,
}: {
  locale: string;
  children: ReactNode;
}) {
  setRequestLocale(locale);
  const messages = (await import(`../../messages/${locale}.json`)).default;
  const schema = getSoftwareApplicationSchema();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ToastProvider>
        <HtmlLangSync locale={locale} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{__html: JSON.stringify(schema)}}
        />
        <Header />
        <main className="main">
          <div className="container">{children}</div>
        </main>
        <Footer />
      </ToastProvider>
    </NextIntlClientProvider>
  );
}
