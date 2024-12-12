import { useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import useFileUpload, { FileUpload } from './useFileUpload';
import { useSaveData } from './useSaveData';
import { projectManagementUpdateSchema } from '@/lib/project-management-schema';
import { useSession } from 'next-auth/react';
import { Accept } from 'react-dropzone';

interface FileUploadConfig {
  path: string;
  projectID: string;
  key: string;
  title: string;
  enableDescription?: boolean;
  accept?: Accept;
}

export const useProjectManagementForm = <FormData extends Record<string, any>> (
  fileUploadConfigs: FileUploadConfig[],
  apiEndpoint: string,
  navigationUrl: string,
  formDataMapper: (fileUploads: FileUpload[]) => FormData
) => {
  const { handleSubmit } = useForm<FormData>();
  const router = useRouter();
  const { data: session } = useSession();
  const { handleSave, submitting } = useSaveData(
    projectManagementUpdateSchema,
    'PUT'
  );

  const fileUploads = fileUploadConfigs.map(config => useFileUpload(config.path, config.projectID, config.key));

  const documentUploads = useMemo(() => fileUploads.map((upload, index) => ({
    title: fileUploadConfigs[index].title,
    enableDescription: fileUploadConfigs[index].enableDescription,
    accept: fileUploadConfigs[index].accept,
    ...upload,
  })), [fileUploads]);

  const saveAndNavigate = useCallback(async (navigateTo: string) => {
    fileUploads.forEach(upload => {
      upload.setUrlError(
        !upload.url
          ? "Please upload the file or select 'I don't have this file'"
          : null
      );
    });

    if (fileUploads.some(upload => !upload.url)) {
      return;
    }

    const formData = formDataMapper(fileUploads);

    // Save data to database
    const result = await handleSave(
      apiEndpoint,
      formData
    );
    if (result && result.ok && result.data) {
      router.push(navigateTo);
    }
  }, [fileUploads, session, handleSave, router]);

  const onSubmitSaveAndExit = useCallback(() => saveAndNavigate(`/`), [saveAndNavigate]);
  const onSubmitSaveAndContinue = useCallback(() => saveAndNavigate(navigationUrl), [saveAndNavigate]);

  return {
    handleSubmit,
    documentUploads,
    saveAndNavigate,
    onSubmitSaveAndExit,
    onSubmitSaveAndContinue,
    submitting,
  };
};