import './globals.css';
import type {Metadata} from 'next';

export const metadata: Metadata = {
  title: 'HEIC Converter',
  description: 'Convert HEIC to PNG, JPG, and WebP online — free, private, in your browser.',
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
      <body>{children}</body>
    </html>
  );
}
