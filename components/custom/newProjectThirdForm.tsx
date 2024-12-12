'use client';

import DrawableMap from '@/components/custom/drawableMap';
import { saveLandAssessmentData } from '@/lib/api';
import { landAssessmentCarbonExclusionAreaSchema } from '@/lib/assessment-project-schema';
import { FeatureCollectionOrNull } from '@/lib/types/mapbox.type';
import { LoaderCircleIcon } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { ZodError } from 'zod';
import { useInitializeMap } from '../hooks/useInitializeMap';
import { useProjectEstimationData } from '../hooks/useProjectEstimationData';
import { Button } from '../ui/button';
import DropzoneInput from './dropZoneInput';

export default function NewProjectThirdForm({
  projectID,
}: {
  projectID: string;
}) {
  const [uploadedData, setUploadedData] =
    useState<FeatureCollectionOrNull>(null);
  const [submitting, setSubmitting] = useState(false);
  const { draw, clearBoundaries, handleMapLoad, handleRemoveBoundaries } =
    useInitializeMap(setUploadedData);
  const { firstStepData, secondStepData, projectEstimationIsLoading } =
    useProjectEstimationData(projectID);
  const router = useRouter();

  const { data: session } = useSession();

  const handleAssessProject = async () => {
    setSubmitting(true);
    let dataToSave;

    if (uploadedData && draw) {
      // If a file was uploaded and polygons were drawn manually, combine the data
      dataToSave = {
        ...uploadedData,
        features: [...uploadedData.features, ...draw.getAll().features],
      };
    } else if (uploadedData) {
      // If a file was uploaded, use the uploaded data
      dataToSave = uploadedData;
    } else if (draw) {
      // If polygons were drawn manually, get the drawn data
      dataToSave = draw.getAll();
    }

    const carbonEstimationAreaFormData = {
      userId: session?.user?.id,
      data: dataToSave,
    };

    try {
      landAssessmentCarbonExclusionAreaSchema.parse(
        carbonEstimationAreaFormData
      );

      // If the validation is successful, save the data
      const res = await saveLandAssessmentData(
        session,
        projectID,
        dataToSave,
        firstStepData,
        secondStepData
      );

      if (!res.ok) {
        const errorData = await res.json();
        if (Array.isArray(errorData.errors) && errorData.errors.length > 0) {
          errorData.errors.forEach((error: any) => {
            toast.error(error.message);
          });

          return;
        }

        toast.error(errorData.message);
        return;
      }

      router.push('/land-assessment');
    } catch (error) {
      console.error('An error occurred:', error);
      // If the validation fails, handle the error
      const zodError = error as ZodError;
      if (zodError.errors) {
        zodError.errors.forEach((err) => {
          if (err.message === 'Please draw or upload the project area') {
            toast.error(err.message);
          }
        });
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (projectEstimationIsLoading)
    return (
      <div className="flex h-full flex-col items-center justify-center">
        <LoaderCircleIcon className="h-12 w-12 animate-spin" />
        <span>Loading...</span>
      </div>
    );

  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-1">
        <div className="flex min-w-120 flex-col justify-between px-8 pb-8 pt-16">
          <h2 className="text-3xl">Exclusion Areas</h2>
          <div className="py-3">
            <ul className="flex flex-col gap-3 text-sm">
              <li>
                Identify areas to exclude from CEA (Roads, Buildings, Dams,
                etc.):
              </li>
              <li>- Using map draw tools on the left-hand side of map</li>
              <li>- Upload a polygon (*.kml, *.geojson)</li>
              <li>- Use the property boundary *Default</li>
            </ul>
          </div>
          <div className="mt-auto inline-block max-w-80 p-8">
            <DropzoneInput onFileUpload={setUploadedData} />
            <div className="mt-4 rounded-lg border border-gray-500 py-3 text-center text-airseed-light-blue">
              Use Property Boundary
            </div>
          </div>
        </div>
        <DrawableMap
          uploadedData={uploadedData}
          onMapLoad={handleMapLoad}
          firstStepData={firstStepData}
          secondStepData={secondStepData}
          clearBoundaries={clearBoundaries}
          step={3}
        />
      </div>
      <div className="mt-8 flex w-full justify-between px-16">
        <div className="flex gap-10">
          <Button
            disabled={submitting}
            onClick={() => router.back()}
            className="h-16 w-52 text-xl"
          >
            Back
          </Button>
          <Button
            disabled={submitting}
            onClick={handleRemoveBoundaries}
            className="h-16 w-52 text-xl"
          >
            Remove Boundaries
          </Button>
        </div>
        <div className="flex gap-10">
          <Button
            disabled={submitting}
            onClick={handleAssessProject}
            className="h-16 w-52 text-xl"
          >
            Save & Exit
          </Button>
          <Button
            disabled={submitting}
            onClick={handleAssessProject}
            className="h-16 w-52 text-xl"
          >
            Assess Project
          </Button>
        </div>
      </div>
    </div>
  );
}
