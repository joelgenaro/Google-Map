'use client';

import { DocumentUpload } from '@/components/custom/documentUpload';
import { FileUpload } from '@/components/hooks/useFileUpload';
import {
  TooltipProvider,
} from '@/components/ui/tooltip';
import NavigationButtons from './general/navigationButtons';
import { useProjectManagementForm } from '@/components/hooks/useProjectManagementForm';

interface FormData {
  fullCAMFilesUrl: string | null;
  carbonEstimationAreaBaselineDataUrl: string | null;
  carbonAdditionalFilesUrls: string | null;
  carbonAdditionalFilesDescription: string | null;
}

export default function CarbonBaseline({
  params,
}: {
  params: { projectID: string };
}) {
  const fileUploadConfigs = [
    { path: "/api/project-management/file-upload", projectID: params.projectID, key: 'full-CAM-files', title: 'FullCAM files' },
    { path: "/api/project-management/file-upload", projectID: params.projectID, key: 'carbon-estimation-area-baseline-data', title: 'Carbon estimation area baseline data' },
    { path: "/api/project-management/file-upload", projectID: params.projectID, key: 'carbon-baseline-additional-files', title: 'Additional files', enableDescription: true },
  ];

  const formDataMapper = (fileUploads: FileUpload[]) => ({
    fullCAMFilesUrl: fileUploads[0].url,
    carbonEstimationAreaBaselineDataUrl: fileUploads[1].url,
    carbonAdditionalFilesUrls: fileUploads[2].url,
    carbonAdditionalFilesDescription: fileUploads[2].description || "",
  });

  const apiEndpoint = `/api/project-management/environmental-planting/${params.projectID}/carbon-baseline`;
  const navigationUrl = `/project-management/environmental-planting/${params.projectID}/monitoring`;

  const {
    handleSubmit,
    documentUploads,
    onSubmitSaveAndExit,
    onSubmitSaveAndContinue,
    submitting,
  } = useProjectManagementForm<FormData>(fileUploadConfigs, apiEndpoint, navigationUrl, formDataMapper);

  return (
    <TooltipProvider>
      <form
        className="flex h-[calc(100vh-7rem)] w-full flex-col px-12 pb-8 lg:h-[calc(100vh-8rem)]"
        onSubmit={handleSubmit(onSubmitSaveAndContinue)}
      >
        <h2 className="mt-8 text-3xl sm:text-2xl">Carbon baseline</h2>
        <div className="flex flex-1 flex-col justify-center gap-6 px-8 py-16">
        {documentUploads.map(({ title, onFileUpload, isUploaded, isLoading, setUrl, setUrlError, setResetUpload, setIsUploaded, urlError, description, setDescription, enableDescription }) => (
          <div key={title}>
            <DocumentUpload
              title={title}
              onFileUpload={onFileUpload}
              isLoading={isLoading}
              isUploaded={isUploaded}
              setUrl={setUrl}
              setUrlError={setUrlError}
              setResetUpload={setResetUpload}
              setIsUploaded={setIsUploaded}
              enableDescription={enableDescription}
              description={description}
              setDescription={setDescription}
            />
            {urlError && (
              <p className="text-right text-red-500">{urlError}</p>
            )}
          </div>
        ))}
        </div>
        <NavigationButtons submitting={submitting} onSubmitSaveAndContinue={onSubmitSaveAndContinue} onSubmitSaveAndExit={onSubmitSaveAndExit} />
      </form>
    </TooltipProvider>
  );
}
