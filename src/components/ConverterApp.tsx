'use client';

import { useRef } from 'react';
import Dropzone from './Dropzone';
import ConvertPanel, { ConvertPanelRef } from './ConvertPanel';
import { OutputFormat } from '@/lib/converter';

interface ConverterAppProps {
  defaultFormat?: OutputFormat;
}

export default function ConverterApp({ defaultFormat = 'image/png' }: ConverterAppProps) {
  const panelRef = useRef<ConvertPanelRef>(null);

  const handleFilesAdded = (files: File[]) => {
    panelRef.current?.addFiles(files);
  };

  return (
    <>
      <Dropzone onFilesAdded={handleFilesAdded} />
      <ConvertPanel ref={panelRef} defaultFormat={defaultFormat} />
    </>
  );
}
