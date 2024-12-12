'use client';

import { kml } from '@tmcw/togeojson';
import { LoaderCircleIcon, Upload } from 'lucide-react';
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';

interface GeoJsonUploaderProps {
  onFileUpload: (data: any) => void;
}

const GeoJsonUploader = ({ onFileUpload }: GeoJsonUploaderProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const processFile = (file: File) => {
    setIsLoading(true);
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const text = reader.result as string;
        let data;
        if (file.name.endsWith('.geojson')) {
          data = JSON.parse(text);
        } else if (file.name.endsWith('.kml')) {
          const parser = new DOMParser();
          const kmlDoc = parser.parseFromString(text, 'text/xml');
          data = kml(kmlDoc);
        }
        onFileUpload(data);
      } catch (error) {
        alert('Failed to process the file');
        console.error('Error processing file:', error);
      } finally {
        setIsLoading(false);
      }
    };
    reader.readAsText(file);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'application/vnd.google-earth.kml+xml': ['.kml'],
      'application/geo+json': ['.geojson'],
    },
    onDrop: (acceptedFiles) => acceptedFiles.forEach(processFile),
  });

  return (
    <div
      {...getRootProps()}
      className={`relative mx-auto flex h-full flex-1 items-center justify-center rounded-xl border-2 ${
        isDragActive ? 'border-blue-500' : 'border-gray-300'
      } bg-gray-300 p-4 transition-all`}
    >
      <input
        {...getInputProps()}
        accept=".geojson,.kml"
        className="absolute inset-0 opacity-0"
      />
      {isLoading ? (
        <div className="flex flex-col items-center">
          <LoaderCircleIcon className="mb-2 h-10 w-10 animate-spin text-blue-500" />
          <p className="text-sm text-gray-700">Processing...</p>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-2">
          <Upload className="flex flex-1 text-gray-700" />
          <p className="flex flex-1 text-center text-sm text-gray-700">
            {isDragActive
              ? 'Drop the files here ...'
              : "Drag 'n' drop some files here, or click to select files (only accepts *.GeoJSON, *.KML)"}
          </p>
        </div>
      )}
    </div>
  );
};

export default GeoJsonUploader;
