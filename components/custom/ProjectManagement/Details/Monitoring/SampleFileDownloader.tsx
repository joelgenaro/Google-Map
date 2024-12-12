import { cn } from '@/lib/utils';
import { Download, FileQuestion } from 'lucide-react';
import React from 'react';

interface DownloadLinkProps {
  filename: string;
  className?: string;
}

declare global {
  interface Navigator {
    msSaveBlob: (blob: Blob, filename: string) => void;
  }
}

const DownloadLink = ({ filename, className }: DownloadLinkProps) => {
  return (
    <a
      className={cn(
        'flex w-full cursor-pointer justify-between rounded-xl border-2 border-gray-200 bg-gray-200 p-4 text-sm transition-all hover:border-blue-500',
        className
      )}
      href="/template/Post-planting_monitoring.xlsx"
      download={filename}
    >
      <div className="flex items-center gap-4">
        <FileQuestion className="text-gray-700" />
        <p>Download monitoring data template</p>
      </div>
      <Download className="text-gray-700" />
    </a>
  );
};

export default DownloadLink;
