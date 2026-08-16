'use client';

import { useCallback, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useToast } from './Toast';

interface DropzoneProps {
  onFilesAdded: (files: File[]) => void;
  disabled?: boolean;
}

export default function Dropzone({ onFilesAdded, disabled }: DropzoneProps) {
  const t = useTranslations('dropzone');
  const toast = useToast();
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const splitFiles = (files: FileList | null): { accepted: File[]; rejected: File[] } => {
    if (!files) return { accepted: [], rejected: [] };
    const accepted: File[] = [];
    const rejected: File[] = [];
    Array.from(files).forEach((f) => {
      if (/\.(heic|heif)$/i.test(f.name)) accepted.push(f);
      else rejected.push(f);
    });
    return { accepted, rejected };
  };

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);
      if (disabled) return;
      const { accepted, rejected } = splitFiles(e.dataTransfer.files);
      if (rejected.length > 0) {
        toast.showToast(t('rejected', { count: rejected.length }), 'error');
      }
      if (accepted.length > 0) onFilesAdded(accepted);
    },
    [onFilesAdded, disabled, toast, t]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { accepted, rejected } = splitFiles(e.target.files);
      if (rejected.length > 0) {
        toast.showToast(t('rejected', { count: rejected.length }), 'error');
      }
      if (accepted.length > 0) onFilesAdded(accepted);
      if (inputRef.current) inputRef.current.value = '';
    },
    [onFilesAdded, toast, t]
  );

  const handleClick = () => {
    if (!disabled) inputRef.current?.click();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      inputRef.current?.click();
    }
  };

  return (
    <div className="dropzone-wrapper">
      <div
        className={`dropzone${dragActive ? ' drag-active' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        aria-label="Upload HEIC files"
      >
        <div className="dropzone-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
        </div>
        <p className="dropzone-title">
          {dragActive ? t('dragActive') : t('title')}
        </p>
        <p className="dropzone-subtitle">{t('subtitle')}</p>
        <p className="dropzone-hint">{t('hint')}</p>
        <p className="dropzone-privacy">🔒 {t('privacy')}</p>
        <input
          ref={inputRef}
          type="file"
          accept=".heic,.HEIC,.heif,.HEIF"
          multiple
          tabIndex={-1}
          aria-hidden="true"
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
