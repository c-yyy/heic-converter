import { ConvertResult } from './converter';

function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(blob);
  });
}

function loadImage(dataUrl: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('image load failed'));
    img.src = dataUrl;
  });
}

// Merge every converted image into a single PDF (one image per A4 page),
// preserving aspect ratio and centering. Runs entirely client-side.
export async function downloadAsPdf(
  results: ConvertResult[],
  filename = 'heic-converted.pdf'
): Promise<void> {
  if (results.length === 0) return;

  const { jsPDF } = await import('jspdf');
  const { saveAs } = await import('file-saver');

  const pdf = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'a4' });
  const pageW = pdf.internal.pageSize.getWidth();
  const pageH = pdf.internal.pageSize.getHeight();
  const margin = 24;
  const maxW = pageW - margin * 2;
  const maxH = pageH - margin * 2;

  for (let i = 0; i < results.length; i++) {
    const dataUrl = await blobToDataUrl(results[i].blob);
    const img = await loadImage(dataUrl);
    const ratio = Math.min(maxW / img.width, maxH / img.height);
    const w = img.width * ratio;
    const h = img.height * ratio;
    if (i > 0) pdf.addPage();
    pdf.addImage(dataUrl, 'PNG', (pageW - w) / 2, (pageH - h) / 2, w, h);
  }

  saveAs(pdf.output('blob'), filename);
}
