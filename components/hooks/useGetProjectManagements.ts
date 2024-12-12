import { env } from '@/env';
import { projectManagementListFetcher } from '@/lib/helper';
import { Feature, Point } from 'geojson';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

const MAPBOX_TOKEN = env.NEXT_PUBLIC_MAPBOX_TOKEN;

export interface ProjectManagements {
  id: string | undefined;
  projectName: string;
  carbonMethod: string[] | null | undefined;
  projectLocation: string;
  projectLocState: string;
  pinLocation: Feature<Point>;
  projectAreaExist: boolean;
}

const fetchLocationDetailsFromAddress = async (
  address: string
): Promise<{
  placeName: string;
  stateShortCode: string;
  pinLocation: Feature;
}> => {
// Get address details from full_address

const parts = address.split(', ');

const address_line1 = parts[0];
const street = parts[1];
const country = parts[2];
  
  const response = await fetch(
    `https://api.mapbox.com/search/geocode/v6/forward?address_line1=${address_line1}&street=${street}&${country}&access_token=${MAPBOX_TOKEN}`
  );
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = (await response.json());

  const stateShortCode = data.features[0].properties.context.region.region_code ?? '';

  const placeName = data.features[0].properties.full_address as string;
  const pinLocation = data.features[0] as Feature;

  return {
    placeName,
    stateShortCode,
    pinLocation,
  };
};

export function useGetProjectmanagements() {
  const { data, error, isLoading } = useSWR(
    '/api/project-management',
    projectManagementListFetcher
  );
  const [projectData, setProjectData] = useState<ProjectManagements[]>([]);

  useEffect(() => {
    if (!data) return;

    const projects = data.project ? data.project : [];

    const processProjects = async () => {
      const projectProcessingPromises = projects.map(async (project: any) => {
        try {
          const { placeName, stateShortCode, pinLocation } =
            await fetchLocationDetailsFromAddress(project.address);
          return {
            id: project.id,
            projectName: project.projectName,
            carbonMethod: [],
            projectLocation: placeName,
            projectLocState: stateShortCode,
            pinLocation: pinLocation,
            projectAreaExist: project.specificationsUrls && project.specificationsUrls[0] && project.specificationsUrls[0] !== "I don't have this file",
          } as ProjectManagements;
        } catch (e) {
          console.error('Error fetching location details:', e);
          return null;
        }
      });

      const processedProjects = await Promise.all(projectProcessingPromises);
      setProjectData(
        processedProjects.filter(
          (project): project is ProjectManagements => project !== null
        )
      );
    };

    processProjects();
  }, [data]);

  return { projectData, error, isLoading: !data && !error };
}
