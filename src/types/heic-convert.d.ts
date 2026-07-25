// Minimal type declarations for the untyped `heic-convert` browser entry.
// Only the bits we use are typed here.
declare module 'heic-convert/browser' {
  type HeicConvertFormat = 'JPEG' | 'PNG';

  interface HeicConvertOptions {
    buffer: Uint8Array;
    format: HeicConvertFormat;
    quality?: number;
  }

  function heicConvert(options: HeicConvertOptions): Promise<Uint8Array>;
  export default heicConvert;
}
