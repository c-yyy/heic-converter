# HEIC Converter

A free, private, fully client-side tool to convert Apple HEIC photos to PNG, JPG, WebP, or PDF — right in your browser. No upload, no account, no software to install.

**Live site:** https://heic2any.online/

![HEIC Converter](public/favicon.svg)

## What it is

HEIC (High Efficiency Image Container) is the photo format Apple uses on iPhone and iPad. It saves roughly half the space of JPEG at the same quality, but most non-Apple devices, Windows PCs, Android phones, and many websites can't open it without help.

HEIC Converter solves that in seconds:

- Drop one HEIC — or a whole batch — into the page.
- Pick the output format you need.
- Download the result immediately.

Everything runs locally in your browser via WebAssembly, so your photos never leave your device.

## Features

- **Private by design** — decoding and encoding happen entirely on your device. Files are never uploaded to any server.
- **Multiple output formats** — convert HEIC to PNG, JPG, WebP, or a single multi-page PDF.
- **Batch conversion** — add many HEIC files at once; download them individually or as a single ZIP.
- **PDF export** — merge one or more photos into one portable PDF, in the order you added them.
- **Four languages** — English, German, Japanese, and Chinese, with locale-aware URLs.
- **No sign-up, no limits** — free to use, no account required.

## Why use it

| Need | Use HEIC Converter to |
| --- | --- |
| Share with friends | Convert to JPG or WebP |
| Upload to a website | Convert to JPG or WebP |
| Print or email as one file | Convert to PDF |
| Keep maximum quality | Convert to PNG |

> Tip: PNG is lossless but expands photo files several-fold (a 12 MP iPhone photo can grow from ~2 MB to 15–30 MB). For most photos, JPG or WebP gives near-identical quality at a fraction of the size.

## How it works

The app loads a WebAssembly HEIC decoder in your browser and re-encodes the image with the Canvas API. Because nothing is sent over the network, even sensitive or private photos stay on your device.

## Supported formats

- **Input:** HEIC / HEIF
- **Output:** PNG, JPEG, WebP, PDF

## Tech stack

- [Next.js](https://nextjs.org) (App Router) with `output: 'export'` for a fully static build
- [next-intl](https://next-intl-docs.vercel.app) for internationalization
- `heic2any` + a modern `libheif` fallback decoder for robust HEIC decoding
- `jspdf` for PDF export
- Deploys as static files to Cloudflare Pages

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000 with your browser.

To build the static site (includes `sitemap.xml` and `robots.txt` generation):

```bash
npm run build
```

The output is written to the `out/` directory.

## Deployment

This project is a static export. On Cloudflare Pages:

- Framework preset: **None**
- Build command: `npm run build`
- Output directory: `out`
- Node.js version: `22`

Set the `SITE_URL` environment variable (defaults to `https://heic2any.online`) so the generated `sitemap.xml` and structured-data canonical URLs point at your domain.

## Links

- Website: https://heic2any.online/
- Guides: [What is HEIC?](https://heic2any.online/blog/what-is-heic) · [HEIC vs JPEG](https://heic2any.online/blog/heic-vs-jpeg) · [Open HEIC on Windows](https://heic2any.online/blog/open-heic-on-windows) · [Open HEIC on Mac](https://heic2any.online/blog/open-heic-on-mac) · [HEIC to PDF](https://heic2any.online/blog/heic-to-pdf)

## License

Released under the MIT License.
