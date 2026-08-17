import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const PUBLIC = path.join(ROOT, 'public');
const APP = path.join(ROOT, 'src/app');

// ---- Brand palette (Neo-Brutalist) ----
// peach #f6e6dc · neon pink #ff4e88 · warning yellow #ffde4d · neon green #a3e635 · ink #111111

// Symbol master (tile + image glyph, no text) — 512x512
const SYMBOL = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <rect x="64" y="64" width="416" height="416" rx="56" fill="#111111"/>
  <rect x="40" y="40" width="416" height="416" rx="56" fill="#ff4e88" stroke="#111111" stroke-width="14"/>
  <rect x="148" y="166" width="216" height="160" rx="18" fill="none" stroke="#ffffff" stroke-width="16"/>
  <circle cx="204" cy="222" r="21" fill="#ffffff"/>
  <path d="M148 326 L148 314 L240 240 L304 292 L362 232 L364 232 L364 326 Z" fill="#ffffff"/>
</svg>`;

// Full master (tile + glyph + HEIC wordmark) — 512x512 (for PWA 512)
const FULL = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <rect x="64" y="64" width="416" height="416" rx="56" fill="#111111"/>
  <rect x="40" y="40" width="416" height="416" rx="56" fill="#ff4e88" stroke="#111111" stroke-width="14"/>
  <rect x="150" y="108" width="212" height="142" rx="16" fill="none" stroke="#ffffff" stroke-width="14"/>
  <circle cx="206" cy="162" r="18" fill="#ffffff"/>
  <path d="M150 250 L150 240 L238 170 L300 218 L360 166 L362 166 L362 250 Z" fill="#ffffff"/>
  <text x="256" y="398" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-weight="800" font-size="86" letter-spacing="6" fill="#111111">HEIC</text>
</svg>`;

// Open Graph social card — 1200x630
const OG = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#f6e6dc"/>
  <rect x="124" y="159" width="312" height="312" rx="44" fill="#111111"/>
  <rect x="100" y="135" width="312" height="312" rx="44" fill="#ff4e88" stroke="#111111" stroke-width="11"/>
  <rect x="168" y="185" width="176" height="124" rx="14" fill="none" stroke="#ffffff" stroke-width="13"/>
  <circle cx="212" cy="224" r="16" fill="#ffffff"/>
  <path d="M168 309 L168 300 L242 238 L296 278 L352 232 L354 232 L354 309 Z" fill="#ffffff"/>
  <text x="460" y="245" font-family="Arial, Helvetica, sans-serif" font-weight="800" font-size="92" fill="#111111">HEIC</text>
  <text x="460" y="345" font-family="Arial, Helvetica, sans-serif" font-weight="800" font-size="92" fill="#111111">Converter</text>
  <rect x="460" y="362" width="300" height="12" fill="#ffde4d"/>
  <text x="460" y="420" font-family="Arial, Helvetica, sans-serif" font-weight="600" font-size="34" fill="#2b2b2b">Convert HEIC to PNG, JPG &amp; WebP</text>
  <text x="460" y="462" font-family="Arial, Helvetica, sans-serif" font-weight="600" font-size="34" fill="#2b2b2b">&#8212; free &amp; private, in your browser.</text>
  <text x="460" y="525" font-family="Arial, Helvetica, sans-serif" font-weight="800" font-size="32" fill="#ff4e88" letter-spacing="1">heic2any.online</text>
  <rect x="460" y="548" width="430" height="44" rx="10" fill="#111111"/>
  <text x="478" y="577" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="20" fill="#a3e635" letter-spacing="1">IN-BROWSER &#183; NO UPLOAD &#183; PRIVATE</text>
</svg>`;

async function render(svg, size) {
  return sharp(Buffer.from(svg), { density: 384 })
    .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
}

async function renderOg(svg) {
  // The OG SVG is 1200x630; render at high density then downscale to exact dimensions.
  return sharp(Buffer.from(svg), { density: 384 })
    .resize(1200, 630, { fit: 'inside', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
}

// Build a multi-resolution .ico from PNG buffers (PNG-compressed ICO, Windows-friendly)
function buildIco(pngs) {
  const count = pngs.length;
  const dirSize = 6 + 16 * count;
  let offset = dirSize;
  const entries = [];
  const chunks = [];
  for (const p of pngs) {
    entries.push({ size: p.size, bytes: p.buf.length, offset });
    chunks.push(p.buf);
    offset += p.buf.length;
  }
  const dir = Buffer.alloc(dirSize);
  dir.writeUInt16LE(0, 0);
  dir.writeUInt16LE(1, 2);
  dir.writeUInt16LE(count, 4);
  let o = 6;
  for (const e of entries) {
    dir.writeUInt8(e.size >= 256 ? 0 : e.size, o + 0);
    dir.writeUInt8(e.size >= 256 ? 0 : e.size, o + 1);
    dir.writeUInt8(0, o + 2);
    dir.writeUInt8(0, o + 3);
    dir.writeUInt16LE(1, o + 4);
    dir.writeUInt16LE(32, o + 6);
    dir.writeUInt32LE(e.bytes, o + 8);
    dir.writeUInt32LE(e.offset, o + 12);
    o += 16;
  }
  return Buffer.concat([dir, ...chunks]);
}

async function main() {
  // favicon.ico: 16 / 32 / 48
  const f16 = await render(SYMBOL, 16);
  const f32 = await render(SYMBOL, 32);
  const f48 = await render(SYMBOL, 48);
  fs.writeFileSync(path.join(ROOT, 'src/app/favicon.ico'), buildIco([
    { size: 16, buf: f16 }, { size: 32, buf: f32 }, { size: 48, buf: f48 },
  ]));

  // apple-touch-icon 180 (symbol)
  fs.writeFileSync(path.join(PUBLIC, 'apple-touch-icon.png'), await render(SYMBOL, 180));

  // PWA icons
  fs.writeFileSync(path.join(PUBLIC, 'icon-192.png'), await render(SYMBOL, 192));
  fs.writeFileSync(path.join(PUBLIC, 'icon-512.png'), await render(FULL, 512));

  // Open Graph / Twitter card (Next.js file-convention, served at /opengraph-image.png)
  const ogBuf = await renderOg(OG);
  fs.writeFileSync(path.join(APP, 'opengraph-image.png'), ogBuf);
  fs.writeFileSync(path.join(APP, 'twitter-image.png'), ogBuf);

  console.log('icons generated:');
  for (const f of ['favicon.ico', 'apple-touch-icon.png', 'icon-192.png', 'icon-512.png', 'opengraph-image.png', 'twitter-image.png']) {
    const p = f.startsWith('favicon') ? path.join(APP, f) : path.join(PUBLIC, f);
    const finalP = ['opengraph-image.png', 'twitter-image.png'].includes(f) ? path.join(APP, f) : p;
    console.log('  ', f, fs.statSync(finalP).size, 'bytes');
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
