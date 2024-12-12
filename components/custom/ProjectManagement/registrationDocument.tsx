'use client';

import { DocumentUpload } from '@/components/custom/documentUpload';
import { FileUpload } from '@/components/hooks/useFileUpload';
import {
  TooltipProvider,
} from '@/components/ui/tooltip';
import NavigationButtons from './general/navigationButtons';
import { useProjectManagementForm } from '@/components/hooks/useProjectManagementForm';

interface FormData {
  letterOfDeclarationUrl: string | null;
  auditScheduleUrl: string | null;
  letterToParticipateUrl: string | null;
}

export default function RegistrationDocument({
  params,
}: {
  params: { projectID: string };
}) {
  const fileUploadConfigs = [
    { path: "/api/project-management/file-upload", projectID: params.projectID, key: 'letter-of-declaration', title: 'Letter of declaration' },
    { path: "/api/project-management/file-upload", projectID: params.projectID, key: 'audit-schedule', title: 'Audit schedule' },
    { path: "/api/project-management/file-upload", projectID: params.projectID, key: 'letter-to-participate', title: 'Letter to participate' },
  ];

  const formDataMapper = (fileUploads: FileUpload[]) => ({
    letterOfDeclarationUrl: fileUploads[0].url,
    auditScheduleUrl: fileUploads[1].url,
    letterToParticipateUrl: fileUploads[2].url,
  });

  const apiEndpoint = `/api/project-management/environmental-planting/${params.projectID}/registration-documents`;
  const navigationUrl = `/project-management/environmental-planting/${params.projectID}/specifications`;

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
        <h2 className="mt-8 text-3xl sm:text-2xl">Registration documents</h2>
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
