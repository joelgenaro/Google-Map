import { Button } from '@/components/ui/button';
import { ReloadIcon } from '@radix-ui/react-icons';
import { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import toast from 'react-hot-toast';
import '../styles/image-uploader.css';

type ImageUploaderProps = {
  onFileSelect: (file: File) => void;
  uploading: boolean;
  initialPreviewUrl?: string;
};

export const ImageUploader = ({
  onFileSelect,
  uploading,
  initialPreviewUrl,
}: ImageUploaderProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewSrc, setPreviewSrc] = useState<string>('');

  // Handle file drop or selection
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles[0]) {
        const file = acceptedFiles[0];
        setSelectedFile(file);
        onFileSelect(file);
        setPreviewSrc(URL.createObjectURL(file));
      }
    },
    [onFileSelect]
  );

  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      onDrop,
      accept: {
        // Defining acceptable image types
        'image/*': ['.png', '.gif', '.jpeg', '.jpg'],
      },
      disabled: uploading,
      maxSize: 5242880, // 5MB
      multiple: false,
      onDropRejected: (rejectedFiles) => {
        const isFileTooLarge = rejectedFiles[0]?.errors.find(
          (e) => e.code === 'file-too-large'
        );
        toast.error(
          isFileTooLarge
            ? 'File size should be under 5MB'
            : rejectedFiles[0]?.errors[0]?.message
        );
      },
    });

  const handleRemoveFile = () => {
    if (previewSrc) {
      URL.revokeObjectURL(previewSrc);
    }
    setSelectedFile(null);
    setPreviewSrc('');
  };

  useEffect(() => {
    // If an initialPreviewUrl is provided, set it as the preview source
    if (initialPreviewUrl) {
      setPreviewSrc(initialPreviewUrl);
    }
    // Clean up the object URL on unmount
    return () => {
      if (previewSrc) {
        URL.revokeObjectURL(previewSrc);
      }
    };
  }, [initialPreviewUrl]);

  return (
    <div className="w-full">
      <div className="image-uploader" {...getRootProps()}>
        <input {...getInputProps()} disabled={uploading} />
        <div className="dropzone-content">
          {isDragActive ? (
            <p>Drop the image here...</p>
          ) : (
            <p>Drag 'n' drop an image here, or click to select one</p>
          )}
        </div>
        {(selectedFile || previewSrc) && (
          <div className="preview-container mb-2">
            <img
              src={previewSrc}
              alt="Preview"
              className={selectedFile ? 'preview-image' : 'preview-image mb-2'}
            />
            <div className="file-info">
              {selectedFile && <p>{selectedFile.name}</p>}
              <Button onClick={handleRemoveFile} disabled={uploading}>
                Remove
              </Button>
            </div>
          </div>
        )}
        {uploading && (
          <div className="flex justify-center items-center w-full">
            <ReloadIcon className="mr-1 h-4 w-4 animate-spin" />
            <span className="italic font-medium">Uploading ...</span>
          </div>
        )}
      </div>
    </div>
  );
};
