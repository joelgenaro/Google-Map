import { useState, useCallback } from 'react';

export interface FileUpload {
  url: string | null;
  urlError: string | null;
  error: string | null;
  isUploaded: boolean | null;
  resetUpload: boolean;
  description: string | null;
  isLoading: boolean;
  setDescription: (description: string | null) => void;
  onFileUpload: (file: File) => void;
  setUrl: (url: string | null) => void;
  setUrlError: (urlError: string | null) => void;
  setError: (error: string | null) => void;
  setResetUpload: (resetUpload: boolean) => void;
  setIsUploaded: (isUploaded: boolean | null) => void;
}

export default function useFileUpload(
  uploadApiUrl: string,
  projectId: string,
  fileName: string
) {
  const [url, setUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [urlError, setUrlError] = useState<string | null>(null);
  const [isUploaded, setIsUploaded] = useState<boolean | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [resetUpload, setResetUpload] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onFileUpload = useCallback((file: File) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('saveFileName', fileName);
    formData.append('projectId', projectId);

    fetch(uploadApiUrl, {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setUrl(data.uploadedFileName);
        setUrlError(null);
        setIsUploaded(true);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setIsUploaded(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return {
    url,
    urlError,
    error,
    isUploaded,
    resetUpload,
    description,
    isLoading,
    setDescription,
    onFileUpload,
    setUrl,
    setUrlError,
    setError,
    setResetUpload,
    setIsUploaded,
  };
}
