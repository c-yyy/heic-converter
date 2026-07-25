import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  // Priority languages: English, German, Japanese (zh kept for existing users)
  locales: ['en', 'de', 'ja', 'zh'],
  defaultLocale: 'en',
  // `as-needed`: `/` is the default (English) with no prefix; other locales get `/xx/`.
  // Visiting `/en` redirects to `/`.
  localePrefix: 'as-needed',
});
