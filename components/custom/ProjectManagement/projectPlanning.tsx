'use client';

import { DocumentUpload } from '@/components/custom/documentUpload';
import { FileUpload } from '@/components/hooks/useFileUpload';
import {
  TooltipProvider,
} from '@/components/ui/tooltip';
import NavigationButtons from './general/navigationButtons';
import { useProjectManagementForm } from '@/components/hooks/useProjectManagementForm';

interface FormData {
  landManagementPlanUrl: string | null;
  fireManagementPlanUrl: string | null;
  permanencePlanUrl: string | null;
}

export default function ProjectPlanning({
  params,
}: {
  params: { projectID: string };
}) {
  const fileUploadConfigs = [
    { path: "/api/project-management/file-upload", projectID: params.projectID, key: 'land-management-plan', title: 'Land management plan' },
    { path: "/api/project-management/file-upload", projectID: params.projectID, key: 'fire-management-plan', title: 'Fire management plan' },
    { path: "/api/project-management/file-upload", projectID: params.projectID, key: 'permanence-plan', title: 'Permanence plan' },
  ];
  
  const apiEndpoint = `/api/project-management/environmental-planting/${params.projectID}/project-planning`;
  const navigationUrl = `/project-management/environmental-planting/${params.projectID}/carbon-baseline`;
  
  const formDataMapper = (fileUploads: FileUpload[]) => ({
    landManagementPlanUrl: fileUploads[0].url,
    fireManagementPlanUrl: fileUploads[1].url,
    permanencePlanUrl: fileUploads[2].url,
  });
  
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
        <h2 className="mt-8 text-3xl sm:text-2xl">Project planning</h2>
        <div className="flex flex-1 flex-col justify-center gap-6 px-8 py-16">
        {documentUploads.map(({ title, onFileUpload, isUploaded, isLoading, setUrl, setUrlError, setResetUpload, setIsUploaded, urlError }) => (
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
