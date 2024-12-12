// app/components/ImageUploader.tsx

import { useState } from 'react';
import { useDropzone } from 'react-dropzone';

interface ImageUploaderProps {
  // Callback to pass the selected file to the parent component
  onImageSelected: (file: File) => void;
}

const ImageUploader = ({ onImageSelected }: ImageUploaderProps) => {
  const [preview, setPreview] = useState<string>('');

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    setPreview(URL.createObjectURL(file));
    // Pass the file up to the parent for potential upload
    onImageSelected(file);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="dropzone" {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p className="dropzone-active">Drop the file here ...</p>
      ) : (
        <p>Drag 'n' drop a profile image here, or click to select a file</p>
      )}
      {preview && <img src={preview} alt="Preview" className="preview-image" />}
    </div>
  );
};

export default ImageUploader;
