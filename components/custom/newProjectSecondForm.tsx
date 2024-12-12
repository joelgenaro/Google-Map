'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import DrawableMap from '@/components/custom/drawableMap';
import { Button } from '../ui/button';
import useSWR from 'swr';
import { LoaderCircleIcon } from 'lucide-react';
import CarbonMethods from './carbonMethod';
import DropzoneInput from './dropZoneInput';
import {
  landAssessmentNewProjectFetcher,
  isFeatureCollection,
  carbonEstimationFetcher,
} from '@/lib/helper';
import { useSession } from 'next-auth/react';
import { landAssessmentCarbonEstimationAreaSchema } from '@/lib/assessment-project-schema';
import { useRouter } from 'next/navigation';
import { CarbonMethodOptions } from '@/lib/constants';
import toast from 'react-hot-toast';
import { handleSaveGeoDataCommon } from '@/lib/api';
import { FeatureCollectionOrNull } from '@/lib/types/mapbox.type';

export default function NewProjectSecondForm({
  projectID,
}: {
  projectID: string;
}) {
  const [uploadedData, setUploadedData] =
    useState<FeatureCollectionOrNull>(null);
  const [firstStepData, setFirstStepData] =
    useState<FeatureCollectionOrNull>(null);
  const [draw, setDraw] = useState<MapboxDraw | null>(null);
  const [selectedMethods, setSelectedMethods] = useState([0, 1, 2, 3]); // initially all items are selected
  const [clearBoundaries, setClearBoundaries] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const {
    data: projectData,
    error: projectError,
    isLoading: projectIsLoading,
  } = useSWR(
    `/api/land-assessment/${projectID}`,
    landAssessmentNewProjectFetcher
  );
  const { data: estimationData } = useSWR(
    `/api/land-assessment/${projectID}/carbon-estimation`,
    carbonEstimationFetcher,
    { revalidateOnFocus: true }
  );

  const { data: session } = useSession();
  const router = useRouter();

  const carbonMethodOptionsMapping = useMemo(
    () => CarbonMethodOptions.map((option) => option.title),
    []
  );

  useEffect(() => {
    if (
      projectData?.project?.data &&
      isFeatureCollection(projectData.project.data)
    ) {
      setFirstStepData(projectData.project.data);
    }
  }, [projectData]);

  useEffect(() => {
    if (
      estimationData?.carbon?.data &&
      isFeatureCollection(estimationData.carbon.data)
    ) {
      const selectedMethodIndices = estimationData.carbon.carbonMethod?.map(
        (method) => carbonMethodOptionsMapping.indexOf(method)
      );
      setSelectedMethods(selectedMethodIndices || [0, 1, 2, 3]);
      setUploadedData(estimationData.carbon.data);
    }
  }, [estimationData, carbonMethodOptionsMapping]);

  const handleSave = useCallback(
    async (exitAfterSave = false) => {
      setSubmitting(true);
      try {
        const selectedMethodTitles = selectedMethods.map(
          (index) => CarbonMethodOptions[index].title
        );
        const url = `/api/land-assessment/${projectID}`;
        const additionalData = { carbonMethod: selectedMethodTitles };

        const res = await fetch(`${url}/carbon-estimation`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await res.json();

        let method = 'POST';
        if (data && data.carbon) {
          method = 'PUT';
        }

        const result = await handleSaveGeoDataCommon(
          session,
          draw,
          uploadedData,
          additionalData,
          url,
          landAssessmentCarbonEstimationAreaSchema,
          method as 'POST' | 'PUT'
        );

        if (result && result.data) {
          if (exitAfterSave) {
            router.push('/land-assessment');
          } else {
            router.push(`/land-assessment/new-project/${projectID}/exclusion`);
          }
        }
      } catch (error) {
        console.error(error);
        // handle error
        toast.error(
          'An error occurred while saving the project. Please try again.'
        );
      } finally {
        setSubmitting(false);
      }
    },
    [session, draw, uploadedData, selectedMethods, router, projectID]
  );

  const handleSaveAndContinue = useCallback(() => {
    handleSave(false);
  }, [handleSave]);

  const handleSaveAndExit = useCallback(() => {
    handleSave(true);
  }, [handleSave]);

  const handleRemoveBoundaries = useCallback(() => {
    setClearBoundaries(true);
    setUploadedData(null);
  }, []);

  const handleMapLoad = useCallback((draw: MapboxDraw) => {
    setDraw(draw);
  }, []);

  if (projectIsLoading)
    return (
      <div className="flex flex-col h-full justify-center items-center">
        <LoaderCircleIcon className="w-12 h-12 animate-spin" />
        <span>Loading...</span>
      </div>
    );

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-1">
        <div className="px-8 pt-16 pb-8 min-w-120">
          <h2 className="text-3xl">Project Area</h2>
          <div>
            <h4 className="text-2xl">Method of interest</h4>
            <CarbonMethods
              selectedMethods={selectedMethods}
              setSelectedMethods={setSelectedMethods}
            />
          </div>
          <div>
            <h4 className="text-2xl mb-3">Boundary</h4>
            <ul className="text-sm flex flex-col gap-3">
              <li>Propose the boundary of the carbon project by:</li>
              <li>- Using map draw tools on the left-hand side of map</li>
              <li>- Upload a polygon (*.kml, *.geojson)</li>
              <li>- Use the property boundary *Default</li>
            </ul>
          </div>
          <div className="p-8 inline-block">
            <DropzoneInput onFileUpload={setUploadedData} />
            <div className="mt-4 py-3 text-center text-airseed-light-blue border border-gray-500 rounded-lg">
              Use Property Boundary
            </div>
          </div>
        </div>
        <DrawableMap
          uploadedData={uploadedData}
          onMapLoad={handleMapLoad}
          firstStepData={firstStepData}
          clearBoundaries={clearBoundaries}
          onBoundariesCleared={() => setClearBoundaries(false)}
          step={2}
        />
      </div>
      <div className="w-full mt-8 flex justify-between px-16">
        <div className="flex gap-10">
          <Button
            disabled={submitting}
            onClick={() => router.back()}
            className="w-52 h-16 text-xl"
          >
            Back
          </Button>
          <Button
            disabled={submitting}
            onClick={handleRemoveBoundaries}
            className="w-52 h-16 text-xl"
          >
            Remove Boundaries
          </Button>
        </div>
        <div className="flex gap-10">
          <Button
            disabled={submitting}
            onClick={handleSaveAndExit}
            className="w-52 h-16 text-xl"
          >
            Save & Exit
          </Button>
          <Button
            disabled={submitting}
            onClick={handleSaveAndContinue}
            className="w-52 h-16 text-xl"
          >
            Save and Continue
          </Button>
        </div>
      </div>
    </div>
  );
}
