export type OutputFormat = 'image/png' | 'image/jpeg' | 'image/webp' | 'application/pdf';

export interface ConvertOptions {
  format: OutputFormat;
  quality: number; // 0.1 - 1.0
}

export interface ConvertResult {
  blob: Blob;
  filename: string;
  originalName: string;
  originalSize: number;
  convertedSize: number;
}

export type FileStatus = 'pending' | 'converting' | 'done' | 'error';

export interface FileEntry {
  id: string;
  file: File;
  status: FileStatus;
  progress: number;
  result?: ConvertResult;
  error?: string; // ConvertErrorCode, mapped to localized text by the UI
  previewUrl?: string;
}

// Stable error codes the UI maps to localized, actionable messages.
export type ConvertErrorCode =
  | 'empty'
  | 'unsupported'
  | 'tooLarge'
  | 'corrupt'
  | 'unknown';

export class ConvertError extends Error {
  code: ConvertErrorCode;
  constructor(code: ConvertErrorCode, message: string) {
    super(message);
    this.code = code;
    this.name = 'ConvertError';
  }
}

const MAX_SIZE = 200 * 1024 * 1024; // 200 MB

// Decode-time format used internally. PDF export reuses the decoded PNG pixels.
export const DECODE_FORMAT: OutputFormat = 'image/png';

function getOutputExtension(format: OutputFormat): string {
  switch (format) {
    case 'image/png': return '.png';
    case 'image/jpeg': return '.jpg';
    case 'image/webp': return '.webp';
    case 'application/pdf': return '.png'; // intermediate decode is PNG
  }
}

function replaceExtension(filename: string, format: OutputFormat): string {
  const baseName = filename.replace(/\.(heic|heif)$/i, '');
  return baseName + getOutputExtension(format);
}

// Inspect the file signature so we can reject ZIP/thumbnails/screenshots with a
// clear, human-readable reason instead of a cryptic heic2any error.
async function validateHeic(file: File): Promise<void> {
  if (file.size === 0) {
    throw new ConvertError('empty', 'File is empty (0 bytes).');
  }
  if (file.size > MAX_SIZE) {
    throw new ConvertError('tooLarge', 'File exceeds the 200 MB limit.');
  }
  const head = new Uint8Array(await file.slice(0, 16).arrayBuffer());
  const isFtyp =
    head[4] === 0x66 && head[5] === 0x74 && head[6] === 0x79 && head[7] === 0x70; // 'ftyp'
  if (!isFtyp) {
    throw new ConvertError(
      'unsupported',
      'Not a valid HEIC/HEIF file (missing ftyp box).'
    );
  }
  const brand = String.fromCharCode(head[8], head[9], head[10], head[11]);
  // Accept the HEVC/HEIF image-brand family (heic/heix/hevc/hevx/mif1/msf1...).
  // Some valid photos use the alpha variant `hevx`, which the old narrow check
  // wrongly rejected as "unsupported".
  if (!/hei|hevc|hevx|mif|msf/i.test(brand)) {
    throw new ConvertError(
      'unsupported',
      `Not a HEIC/HEIF file (brand "${brand}").`
    );
  }
}

function makeResult(
  blob: Blob,
  file: File,
  decodeFormat: OutputFormat
): ConvertResult {
  return {
    blob,
    filename: replaceExtension(file.name, decodeFormat),
    originalName: file.name,
    originalSize: file.size,
    convertedSize: blob.size,
  };
}

// Re-encode a decoded PNG Blob into the requested browser format (JPEG/WebP)
// via a canvas. Used by the fallback decoder, which always decodes to PNG.
async function canvasReencode(
  pngBlob: Blob,
  toType: OutputFormat,
  quality: number
): Promise<Blob> {
  const bitmap = await createImageBitmap(pngBlob);
  const canvas = document.createElement('canvas');
  canvas.width = bitmap.width;
  canvas.height = bitmap.height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas 2D context unavailable');
  ctx.drawImage(bitmap, 0, 0);
  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (b) => (b ? resolve(b) : reject(new Error('Canvas re-encode failed'))),
      toType,
      quality
    );
  });
  bitmap.close?.();
  return blob;
}

// Fallback decoder: modern libheif (heic-convert / libheif-js wasm-bundle)
// handles newer iPhone/HEIC encodings that the legacy libheif build inside
// heic2any cannot decode. Decodes to PNG (most reliable), then re-encodes to
// the requested format when needed.
async function decodeViaModern(
  file: File,
  decodeFormat: OutputFormat,
  quality: number
): Promise<ConvertResult> {
  const heicConvert = (await import('heic-convert/browser')).default;
  const input = new Uint8Array(await file.arrayBuffer());
  const out = await heicConvert({ buffer: input, format: 'PNG', quality: 0.92 });
  const pngBlob = new Blob([new Uint8Array(out)], { type: 'image/png' });
  const finalBlob =
    decodeFormat === 'image/png'
      ? pngBlob
      : await canvasReencode(pngBlob, decodeFormat, quality);
  return makeResult(finalBlob, file, decodeFormat);
}

export async function convertHeic(
  file: File,
  options: ConvertOptions
): Promise<ConvertResult> {
  // The decode step is always an image format; PDF export reuses the decoded pixels.
  const decodeFormat: OutputFormat =
    options.format === 'application/pdf' ? DECODE_FORMAT : options.format;

  await validateHeic(file);

  // Lazily import on the client only — heic2any touches `window` at module load,
  // which breaks SSR / static prerendering.
  const heic2any = (await import('heic2any')).default;
  try {
    const blob = await heic2any({
      blob: file,
      toType: decodeFormat,
      quality: decodeFormat === 'image/png' ? undefined : options.quality,
    });

    // heic2any may return a Blob or Blob[]
    const resultBlob = Array.isArray(blob) ? blob[0] : blob;

    return makeResult(resultBlob, file, decodeFormat);
  } catch (err) {
    // A failure at decode time means the file is damaged/incomplete OR uses a
    // format the legacy libheif build can't read. Give the modern decoder a
    // chance before giving up.
    if (err instanceof ConvertError) throw err;
    try {
      return await decodeViaModern(file, decodeFormat, options.quality);
    } catch {
      throw new ConvertError('corrupt', 'Failed to decode HEIC file.');
    }
  }
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 10) + Date.now().toString(36);
}
