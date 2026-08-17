import './globals.css';
import type {Metadata} from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://heic2any.online'),
  title: {
    default: 'HEIC Converter',
    template: '%s | HEIC Converter',
  },
  description:
    'Convert HEIC to PNG, JPG, and WebP online — free, private, in your browser.',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.webmanifest',
  twitter: {
    card: 'summary_large_image',
  },
};

// Root layout: owns <html>/<body>. The per-locale <html lang> is synced
// client-side by <HtmlLangSync> (static export can't vary it at build time).
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google AdSense — loads on every page (Auto Ads) */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8888723899569908"
          crossOrigin="anonymous"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
