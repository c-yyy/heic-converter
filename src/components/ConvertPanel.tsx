'use client';

import { useState, useCallback, forwardRef, useImperativeHandle } from 'react';
import { useTranslations } from 'next-intl';
import {
  OutputFormat,
  ConvertOptions,
  FileEntry,
  convertHeic,
  generateId,
  ConvertError,
} from '@/lib/converter';
import { downloadAsZip, downloadSingle } from '@/lib/zip-download';
import { downloadAsPdf } from '@/lib/pdf-download';
import { useToast } from './Toast';
import FileItem from './FileItem';

export interface ConvertPanelRef {
  addFiles: (files: File[]) => void;
}

interface ConvertPanelProps {
  defaultFormat?: OutputFormat;
}

const ConvertPanel = forwardRef<ConvertPanelRef, ConvertPanelProps>(function ConvertPanel(
  { defaultFormat = 'image/png' },
  ref
) {
  const t = useTranslations('controls');
  const tt = useTranslations('toast');
  const toast = useToast();
  const [files, setFiles] = useState<FileEntry[]>([]);
  const [format, setFormat] = useState<OutputFormat>(defaultFormat);
  const [quality, setQuality] = useState(85);
  const [isConverting, setIsConverting] = useState(false);

  const addFiles = useCallback((newFiles: File[]) => {
    const entries: FileEntry[] = newFiles.map((file) => ({
      id: generateId(),
      file,
      status: 'pending' as const,
      progress: 0,
    }));
    setFiles((prev) => [...prev, ...entries]);
  }, []);

  useImperativeHandle(ref, () => ({ addFiles }), [addFiles]);

  const toErrorCode = (err: unknown): string =>
    err instanceof ConvertError ? err.code : 'unknown';

  const convertAll = useCallback(async () => {
    setIsConverting(true);
    const options: ConvertOptions = { format, quality: quality / 100 };

    const currentFiles = [...files];
    for (let i = 0; i < currentFiles.length; i++) {
      const entry = currentFiles[i];
      if (entry.status === 'done') continue;

      currentFiles[i] = { ...entry, status: 'converting', progress: 0 };
      setFiles([...currentFiles]);

      try {
        const result = await convertHeic(entry.file, options);
        const previewUrl = URL.createObjectURL(result.blob);
        currentFiles[i] = { ...currentFiles[i], status: 'done', progress: 100, result, previewUrl };
      } catch (err) {
        currentFiles[i] = {
          ...currentFiles[i],
          status: 'error',
          error: toErrorCode(err),
        };
      }
      setFiles([...currentFiles]);
    }
    setIsConverting(false);
  }, [files, format, quality]);

  const retryFile = useCallback(async (id: string) => {
    const options: ConvertOptions = { format, quality: quality / 100 };
    setFiles((prev) =>
      prev.map((f) => (f.id === id ? { ...f, status: 'converting' as const, error: undefined } : f))
    );

    const entry = files.find((f) => f.id === id);
    if (!entry) return;

    try {
      const result = await convertHeic(entry.file, options);
      const previewUrl = URL.createObjectURL(result.blob);
      setFiles((prev) =>
        prev.map((f) => (f.id === id ? { ...f, status: 'done' as const, result, previewUrl } : f))
      );
    } catch (err) {
      setFiles((prev) =>
        prev.map((f) =>
          f.id === id ? { ...f, status: 'error' as const, error: toErrorCode(err) } : f
        )
      );
    }
  }, [files, format, quality]);

  const results = useCallback(
    () => files.filter((f) => f.result).map((f) => f.result!),
    [files]
  );

  const handleDownloadZip = useCallback(async () => {
    const r = results();
    if (r.length === 0) return;
    await downloadAsZip(r);
    toast.showToast(tt('savedZip'), 'success');
  }, [results, toast, tt]);

  const handleDownloadPdf = useCallback(async () => {
    const r = results();
    if (r.length === 0) return;
    await downloadAsPdf(r);
    toast.showToast(tt('savedPdf'), 'success');
  }, [results, toast, tt]);

  const handleSingleDownload = useCallback(
    async (result: FileEntry['result']) => {
      if (!result) return;
      await downloadSingle(result);
      toast.showToast(tt('savedSingle'), 'success');
    },
    [toast, tt]
  );

  const clearAll = useCallback(() => {
    files.forEach((f) => {
      if (f.previewUrl) URL.revokeObjectURL(f.previewUrl);
    });
    setFiles([]);
  }, [files]);

  const doneCount = files.filter((f) => f.status === 'done').length;
  const hasFiles = files.length > 0;
  const hasPending = files.some((f) => f.status === 'pending' || f.status === 'error');
  const isPdf = format === 'application/pdf';
  const showQuality = format !== 'image/png' && !isPdf;

  return (
    <>
      {hasFiles && (
        <>
          <div className="controls-bar">
            <div className="control-group">
              <label className="control-label">{t('format')}</label>
              <select
                className="control-select"
                value={format}
                onChange={(e) => setFormat(e.target.value as OutputFormat)}
                disabled={isConverting}
              >
                <option value="image/png">PNG</option>
                <option value="image/jpeg">JPG</option>
                <option value="image/webp">WebP</option>
                <option value="application/pdf">{t('formatPdf')}</option>
              </select>
              <p className="control-hint">{t('formatHint')}</p>
            </div>
            {showQuality && (
              <div className="control-group">
                <label className="control-label">{t('quality')}</label>
                <input
                  type="range"
                  className="quality-slider"
                  min="10"
                  max="100"
                  step="5"
                  value={quality}
                  onChange={(e) => setQuality(Number(e.target.value))}
                  disabled={isConverting}
                />
                <span className="quality-value">{quality}%</span>
              </div>
            )}
          </div>

          <div className="file-list">
            {files.map((entry) => (
              <FileItem
                key={entry.id}
                entry={entry}
                onRetry={retryFile}
                onDownload={handleSingleDownload}
                hideDownload={isPdf}
              />
            ))}
          </div>

          <div className="action-bar">
            <button className="btn btn-ghost" onClick={clearAll} disabled={isConverting}>
              {t('clear')}
            </button>
            {hasPending && (
              <button className="btn btn-primary" onClick={convertAll} disabled={isConverting}>
                {isConverting ? t('convertAll') + '...' : t('convertAll')}
              </button>
            )}
            {doneCount >= 1 && (
              <button
                className="btn btn-secondary"
                onClick={isPdf ? handleDownloadPdf : handleDownloadZip}
                disabled={isConverting}
              >
                {isPdf ? t('downloadPdf') : t('downloadAll')}
              </button>
            )}
          </div>
        </>
      )}
    </>
  );
});

export default ConvertPanel;
