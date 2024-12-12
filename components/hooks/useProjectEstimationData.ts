// Get Land Assessment project and estimation data from the server
import { useState, useEffect } from 'react';
import useSWR from 'swr';
import { isFeatureCollection, projectEstimationFetcher } from '@/lib/helper';
import { FeatureCollectionOrNull } from '@/lib/types/mapbox.type';

export const useProjectEstimationData = (projectID: string) => {
  const [firstStepData, setFirstStepData] = useState<FeatureCollectionOrNull>(null);
  const [secondStepData, setSecondStepData] = useState<FeatureCollectionOrNull>(null);
  const { data: projectEstimationData, error: projectEstimationError, isLoading: projectEstimationIsLoading } = useSWR(`/api/land-assessment/${projectID}/project-assessment`, projectEstimationFetcher, { revalidateOnFocus: true });

  useEffect(() => {
    if (projectEstimationData?.project?.data && isFeatureCollection(projectEstimationData.project.data)) {
      setFirstStepData(projectEstimationData.project.data);
    }
    if (projectEstimationData?.carbon?.data && isFeatureCollection(projectEstimationData.carbon.data)) {
      setSecondStepData(projectEstimationData.carbon.data);
    }
  }, [projectEstimationData?.project?.data, projectEstimationData?.carbon?.data]);

  return { firstStepData, secondStepData, projectEstimationError, projectEstimationIsLoading };
};