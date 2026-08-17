import type {MetadataRoute} from 'next';

export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'HEIC Converter',
    short_name: 'HEIC Converter',
    description:
      'Convert HEIC to PNG, JPG, and WebP online — free, private, in your browser.',
    start_url: '/',
    display: 'standalone',
    background_color: '#f6e6dc',
    theme_color: '#ff4e88',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
