'use client';

import { FileQuestion, LoaderCircleIcon, Upload } from 'lucide-react';
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import { cn } from '@/lib/utils';

interface ReadableFileUploaderProps {
  onFileUpload: (data: any) => void;
  className?: string;
}

const ReadableFileUploader = ({
  onFileUpload,
  className,
}: ReadableFileUploaderProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const processFile = (file: File) => {
    setIsLoading(true);
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const data = reader.result;
        let parsedData: { [key: string]: any[] } = {};

        if (file.name.endsWith('.csv')) {
          const text = data as string;
          parsedData = { [file.name]: Papa.parse(text, { header: true }).data };
        } else if (file.name.endsWith('.xlsx')) {
          const arrayBuffer = data as ArrayBuffer;
          const binary = String.fromCharCode(...new Uint8Array(arrayBuffer));
          const workbook = XLSX.read(binary, { type: 'binary' });

          workbook.SheetNames.forEach((sheetName:string) => {
            const worksheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
            parsedData[sheetName] = jsonData;
          });
        }

        onFileUpload(parsedData);
      } catch (error) {
        alert('Failed to process the file');
        console.error('Error processing file:', error);
      } finally {
        setIsLoading(false);
      }
    };
    if (file.name.endsWith('.csv')) {
      reader.readAsText(file);
    } else if (file.name.endsWith('.xlsx')) {
      reader.readAsArrayBuffer(file);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': [
        '.xlsx',
      ],
    },
    onDrop: (acceptedFiles) => acceptedFiles.forEach(processFile),
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        `relative mx-auto flex h-full w-full flex-1 items-center justify-between rounded-xl border-2 ${
          isDragActive ? 'border-blue-500' : 'border-gray-200'
        } bg-gray-200 p-4 transition-all hover:border-blue-500`,
        className
      )}
    >
      <input
        {...getInputProps()}
        accept=".csv"
        className="absolute inset-0 opacity-0"
      />
      {isLoading ? (
        <div className="flex flex-col items-center">
          <LoaderCircleIcon className="mb-2 h-10 w-10 animate-spin text-blue-500" />
          <p className="text-sm text-gray-700">Processing...</p>
        </div>
      ) : (
        <>
          <div className="flex items-center gap-4 text-sm">
            <FileQuestion className="text-gray-700" />
            <p>Upload monitoring data (.csv)</p>
          </div>
          <Upload className="text-gray-700" />
        </>
      )}
    </div>
  );
};

export default ReadableFileUploader;
