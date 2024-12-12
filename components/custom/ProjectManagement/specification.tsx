'use client';

import { DocumentUpload } from '@/components/custom/documentUpload';
import DrawableMap from '@/components/custom/drawableMap';
import useFileUpload from '@/components/hooks/useFileUpload';
import { useInitializeMap } from '@/components/hooks/useInitializeMap';
import { useSaveData } from '@/components/hooks/useSaveData';
import {
  TooltipProvider,
} from '@/components/ui/tooltip';
import { projectManagementUpdateSchema } from '@/lib/project-management-schema';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import NavigationButtons from './general/navigationButtons';
import { FeatureCollectionOrNull } from '@/lib/types/mapbox.type';

interface FormData {
  letterOfDeclarationUrl: string;
  auditScheduleUrl: string;
  letterToParticipateUrl: string;
}

export default function Specification({
  params,
}: {
  params: { projectID: string };
}) {
  const [firstStepData, setFirstStepData] = useState<FeatureCollectionOrNull>(null);
  const [secondStepData, setSecondStepData] = useState<FeatureCollectionOrNull>(null);
  const [thirdStepData, setThirdStepData] = useState<FeatureCollectionOrNull>(null);
  const [forthStepData, setForthStepData] = useState<FeatureCollectionOrNull>(null);
  const {
    handleSubmit,
  } = useForm<FormData>();
  const router = useRouter();
  const { data: session } = useSession();
  const { handleSave, submitting } = useSaveData(
    projectManagementUpdateSchema,
    'PUT'
  );

  const { draw, clearBoundaries, handleMapLoad, handleRemoveBoundaries } = useInitializeMap(setFirstStepData);
  
  const projectArea = useFileUpload("/api/project-management/file-upload", params.projectID, 'project-area');
  const AdditionalArea = useFileUpload("/api/project-management/file-upload", params.projectID, 'additional-area');

  const documentUploads = {
    title: 'Project Area',
    ...projectArea
  }
  
  useEffect(() => {
    if (projectArea.resetUpload && secondStepData === null) {
      handleRemoveBoundaries();
    }
  }, [secondStepData, projectArea.resetUpload])

  const saveAndNavigate = useCallback(async (navigateTo: string) => {
    projectArea.setUrlError(
      !projectArea.url
        ? "Please upload the file or select 'I don't have this file'"
        : null
    );
  
    if (
      !projectArea.url
    ) {
      return;
    }
  
    const formData = {
      userId: session?.user?.id,
      specificationsUrls: [projectArea.url],
    };

    // Save data to database
    const result = await handleSave(
      `/api/project-management/environmental-planting/${params.projectID}/specifications`,
      formData
    );
    if (result && result.ok && result.data) {
      router.push(navigateTo);
    }
  }, [projectArea, session, handleSave, params.projectID, router]);
  
  const onSubmitSaveAndExit = useCallback(() => saveAndNavigate(`/`), [saveAndNavigate]);
  const onSubmitSaveAndContinue = useCallback(() => saveAndNavigate(`/project-management/environmental-planting/${params.projectID}/project-planning`), [saveAndNavigate]);

  return (
    <TooltipProvider>
      <form
        className="flex h-[calc(100vh-7rem)] w-full flex-col px-12 pb-8 lg:h-[calc(100vh-8rem)]"
        onSubmit={handleSubmit(onSubmitSaveAndContinue)}
      >
        <h2 className="mt-8 text-3xl sm:text-2xl">Specifications</h2>
        <div className="flex flex-1 justify-center gap-6">
          <div className="px-8 py-16 pb-8 min-w-120 flex flex-col justify-between">
            <div className='flex flex-col flex-1 gap-6'>
              <DocumentUpload
                accept={{ "text/file": [".geojson", ".kml"] }}
                title={documentUploads.title}
                isLoading={documentUploads.isLoading}
                onFileUpload={documentUploads.onFileUpload}
                onGeoDataUpload={setFirstStepData}
                isUploaded={documentUploads.isUploaded}
                setUrl={documentUploads.setUrl}
                setUrlError={documentUploads.setUrlError}
                setResetUpload={documentUploads.setResetUpload}
                setIsUploaded={documentUploads.setIsUploaded}
                setGeoData={setFirstStepData}
              />
              {documentUploads.urlError && (
                <p className="text-right text-red-500">{documentUploads.urlError}</p>
              )}
            </div>
          </div>
          <div className='w-full h-full pb-16'>
            <DrawableMap
              onMapLoad={handleMapLoad}
              firstStepData={firstStepData}
              secondStepData={secondStepData}
              thirdStepData={thirdStepData}
              forthStepData={forthStepData}
              clearBoundaries={clearBoundaries}
              step={4}
            />
          </div>
        </div>
        <NavigationButtons submitting={submitting} onSubmitSaveAndContinue={onSubmitSaveAndContinue} onSubmitSaveAndExit={onSubmitSaveAndExit} />
      </form>
    </TooltipProvider>
  );
}
