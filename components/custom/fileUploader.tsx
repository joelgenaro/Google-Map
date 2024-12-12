import { FeatureCollectionOrNull } from "@/lib/types/mapbox.type";
import { cn } from "@/lib/utils";
import { kml } from "@tmcw/togeojson";
import { Upload } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Accept, useDropzone } from "react-dropzone";

interface FileUploaderProps {
  onFileUpload: (data: File) => void;
  onGeoDataUpload?: (data: FeatureCollectionOrNull) => void;
  accept?: Accept;
  resetUpload?: boolean;
  className?: string;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onFileUpload, onGeoDataUpload, accept, resetUpload, className }) => {
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (accept && acceptedFiles.length > 0 ) {
      const acceptedExtensions = accept["text/file"];
      acceptedFiles.forEach((file) => {
        const fileExtension = "." + file.name.split('.').pop();
        if (acceptedExtensions.includes(fileExtension)) {
          const reader = new FileReader();
          reader.onload = () => {
            const text = reader.result as string;
            let data;
            if (file.name.endsWith(".geojson")) {
              data = JSON.parse(text);
            } else if (file.name.endsWith(".kml")) {
              const parser = new DOMParser();
              const kmlDoc = parser.parseFromString(text, "text/xml");
              data = kml(kmlDoc);
            }
            if (onGeoDataUpload) {
              onGeoDataUpload(data);
            }
          };
          reader.readAsText(file);
        }
        onFileUpload(acceptedFiles[0]);
      });
    } else {
      onFileUpload(acceptedFiles[0]);
    }
    setIsFileUploaded(true);
  }, [onFileUpload]);

  const { getRootProps, getInputProps } = useDropzone({
    accept,
    onDrop,
  });

  useEffect(() => {
    if (resetUpload) {
      setIsFileUploaded(false);
    }
  }, [resetUpload]);

  return (
    <div
      className={cn('cursor-pointer hover:text-gray-600', className)}
      {...getRootProps()}
    >
      <input
        {...getInputProps()}
        className="w-full h-full"
      />
      <Upload className="w-14 h-14" />
    </div>
  );
};

export default FileUploader;
