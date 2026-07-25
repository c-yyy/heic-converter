'use client';

import { useTranslations } from 'next-intl';
import { FileEntry, ConvertResult } from '@/lib/converter';

interface FileItemProps {
  entry: FileEntry;
  onRetry: (id: string) => void;
  onDownload?: (result: ConvertResult) => void;
  hideDownload?: boolean;
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

export default function FileItem({ entry, onRetry, onDownload, hideDownload }: FileItemProps) {
  const t = useTranslations('fileItem');
  const te = useTranslations('errors');

  const statusLabel = {
    pending: t('pending'),
    converting: t('converting'),
    done: t('done'),
    error: t('error'),
  };

  const handleDownload = () => {
    if (entry.result && onDownload) onDownload(entry.result);
  };

  return (
    <>
      <div className="file-item">
        <div className="file-thumbnail">
          {entry.previewUrl ? (
            // eslint-disable-next-line @next/next/no-img-element -- previewUrl is a client-side blob: object URL, not a static/remote asset
            <img src={entry.previewUrl} alt={entry.file.name} />
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="M21 15l-5-5L5 21" />
            </svg>
          )}
        </div>
        <div className="file-info">
          <div className="file-name">{entry.file.name}</div>
          <div className="file-size">
            {formatSize(entry.file.size)}
            {entry.result && ` → ${formatSize(entry.result.convertedSize)}`}
          </div>
          {entry.status === 'error' && entry.error && (
            <div className="file-error">
              {te(entry.error as 'empty' | 'unsupported' | 'corrupt' | 'tooLarge' | 'unknown')}
            </div>
          )}
        </div>
        <span className={`file-status ${entry.status}`}>
          {entry.status === 'done' && '✓ '}
          {statusLabel[entry.status]}
        </span>
        <div className="file-actions">
          {entry.status === 'done' && entry.result && !hideDownload && (
            <button
              className="btn btn-primary btn-sm"
              onClick={handleDownload}
            >
              {t('download')}
            </button>
          )}
          {entry.status === 'error' && (
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => onRetry(entry.id)}
            >
              {t('retry')}
            </button>
          )}
        </div>
      </div>
      {entry.status === 'converting' && (
        <div className="file-progress-bar">
          <div className="file-progress-fill" style={{ width: '60%' }} />
        </div>
      )}
    </>
  );
}
