import { Dispatch, FC, SetStateAction, useState } from 'react';
import FileUploader from './fileUploader';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import { FileQuestion, LoaderCircleIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Accept } from 'react-dropzone';
import { FeatureCollectionOrNull } from '@/lib/types/mapbox.type';
import { Input } from '../ui/input';

export interface DocumentUploadProps {
  title?: string;
  onFileUpload: (file: File) => void;
  onGeoDataUpload?: (data: FeatureCollectionOrNull) => void;
  isUploaded: boolean | null;
  urlError?: string | null;
  setUrl: Dispatch<SetStateAction<string | null>>;
  setUrlError: Dispatch<SetStateAction<string | null>>;
  setError?: Dispatch<SetStateAction<string | null>>;
  setResetUpload: Dispatch<SetStateAction<boolean>>;
  setIsUploaded: Dispatch<SetStateAction<boolean | null>>;
  setGeoData?: Dispatch<SetStateAction<FeatureCollectionOrNull>>;
  accept?: Accept;
  description?: string | null;
  isLoading?: boolean;
  setDescription?: React.Dispatch<React.SetStateAction<string | null>>;
  enableDescription?: boolean;
}

export const DocumentUpload: FC<DocumentUploadProps> = ({
  title,
  onFileUpload,
  onGeoDataUpload,
  isUploaded,
  setUrl,
  setUrlError,
  setResetUpload,
  setIsUploaded,
  setGeoData,
  accept,
  setDescription,
  enableDescription = false,
  isLoading = false,
}) => {
  const handleNoFile = (
    setFileState: Dispatch<SetStateAction<string | null>>,
    setErrorState: Dispatch<SetStateAction<string | null>>,
    resetUpload: Dispatch<SetStateAction<boolean>>,
    setIsUploaded: Dispatch<SetStateAction<boolean | null>>,
    setGeoData?: Dispatch<SetStateAction<FeatureCollectionOrNull>>
  ) => {
    setFileState("I don't have this file");
    setErrorState(null);
    resetUpload(true);
    setIsUploaded(false);
    setGeoData && setGeoData(null);
  };

  return (
    <div
      className={cn(
        'flex items-center rounded-lg border border-gray-400 px-8 py-4',
        title ? 'justify-between' : 'justify-center'
      )}
    >
      <div className="flex gap-8">
        {title && <span className="text-2xl">{title}</span>}
        {!!enableDescription && setDescription && (
          <Input
            placeholder="File description"
            className="flex-1"
            onChange={(e) => setDescription(e.target.value)}
          />
        )}
      </div>
      <div className="flex gap-8">
        {isLoading ? (
          <LoaderCircleIcon className="h-12 w-12 animate-spin" />
        ) : (
          <FileUploader
            onFileUpload={onFileUpload}
            onGeoDataUpload={onGeoDataUpload}
            accept={accept}
            className={
              isUploaded === null
                ? 'text-black'
                : isUploaded
                  ? 'text-gray-600'
                  : 'text-black'
            }
          />
        )}

        <Tooltip>
          <TooltipTrigger asChild>
            <FileQuestion
              className={`h-14 w-14 cursor-pointer hover:text-gray-600 ${isUploaded === null ? 'text-black' : !isUploaded ? 'text-gray-600' : 'text-black'}`}
              onClick={() =>
                handleNoFile(
                  setUrl,
                  setUrlError,
                  setResetUpload,
                  setIsUploaded,
                  setGeoData
                )
              }
            />
          </TooltipTrigger>
          <TooltipContent>
            <p>I don't have this file</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
};
