import JSZip from 'jszip';
import { ConvertResult } from './converter';

function dateStamp(): string {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}`;
}

export async function downloadAsZip(results: ConvertResult[]): Promise<void> {
  const zip = new JSZip();

  results.forEach((result) => {
    zip.file(result.filename, result.blob);
  });

  const content = await zip.generateAsync({ type: 'blob' });
  // Lazily import on the client only — file-saver touches `window`/`document`.
  const { saveAs } = await import('file-saver');
  saveAs(content, `heic-converted-${dateStamp()}.zip`);
}

export async function downloadSingle(result: ConvertResult): Promise<void> {
  const { saveAs } = await import('file-saver');
  saveAs(result.blob, result.filename);
}
