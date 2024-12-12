'use client';

import { DocumentUpload, DocumentUploadProps } from '@/components/custom/documentUpload';
import { FileUpload } from '@/components/hooks/useFileUpload';
import {
  TooltipProvider,
} from '@/components/ui/tooltip';
import NavigationButtons from './general/navigationButtons';
import { useProjectManagementForm } from '@/components/hooks/useProjectManagementForm';

interface FormData {
  monitoringPlotsUrl: string | null;
  monitoringDataUrl: string | null;
  monitoringAdditionalFilesUrls: string | null;
  monitoringAdditionalFilesDescription: string | null;
}

export default function Monitoring({
  params,
}: {
  params: { projectID: string };
}) {
  const fileUploadConfigs = [
    { path: "/api/project-management/file-upload", projectID: params.projectID, key: 'monitoring-plots', title: 'Monitoring plots (.shp, .kml, .geojson)', accept: { "text/file": [".shp", ".kml", ".geojson"] }},
    { path: "/api/project-management/file-upload", projectID: params.projectID, key: 'monitoring-data', title: 'Monitoring data (.csv)', accept: { "text/file": [".csv"] }},
    { path: "/api/project-management/file-upload", projectID: params.projectID, key: 'monitoring-additional-files', title: 'Additional files (e.g. photos)', enableDescription: true },
  ];

  const formDataMapper = (fileUploads: FileUpload[]) => ({
    monitoringPlotsUrl: fileUploads[0].url,
    monitoringDataUrl: fileUploads[1].url,
    monitoringAdditionalFilesUrls: fileUploads[2].url,
    monitoringAdditionalFilesDescription: fileUploads[2].description || "",
  });

  const apiEndpoint = `/api/project-management/environmental-planting/${params.projectID}/monitoring`;
  const navigationUrl = `/project-management/environmental-planting/${params.projectID}/project-checklist`;

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
        <h2 className="mt-8 text-3xl sm:text-2xl">Monitoring</h2>
        <div className="flex flex-1 flex-col justify-center gap-6 px-8 py-16">
        {documentUploads.map(({ title, onFileUpload, isUploaded, isLoading, setUrl, setUrlError, setResetUpload, setIsUploaded, urlError, description, setDescription, enableDescription, accept }) => (
          <div key={title}>
            <DocumentUpload
              title={title}
              onFileUpload={onFileUpload}
              isUploaded={isUploaded}
              isLoading={isLoading}
              setUrl={setUrl}
              setUrlError={setUrlError}
              setResetUpload={setResetUpload}
              setIsUploaded={setIsUploaded}
              enableDescription={enableDescription}
              description={description}
              setDescription={setDescription}
              accept={accept}
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
