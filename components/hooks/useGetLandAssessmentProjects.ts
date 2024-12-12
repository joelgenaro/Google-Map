import { env } from '@/env';
import { landAssessmentProjectListFetcher } from '@/lib/helper';
import {
  MapboxGeocodeFeature,
  MapboxGeocodingResponse,
} from '@/lib/types/mapbox.type';
import { calculateTotalAreaInHectares } from '@/lib/utils/land-area-hectares';
import * as turf from '@turf/turf';
import { Feature, FeatureCollection, Point, Polygon, Position } from 'geojson';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

const MAPBOX_TOKEN = env.NEXT_PUBLIC_MAPBOX_TOKEN;

export interface LandAssessmentProjects {
  id: string | undefined;
  projectName: string;
  carbonMethod: string[] | null | undefined;
  projectLocation: string;
  projectLocState: string;
  landAreaInHectares: number;
  pinLocation: Feature<Point>;
  estimateExists: boolean;
  exclusionExists: boolean;
}

const calculateProjectCentroid = (
  features: FeatureCollection['features']
): LandAssessmentProjects['pinLocation'] => {
  // Create an array of centroids for each polygon in the project
  // This works for both MultiPolygon and Polygon GeoJSON types
  // e.g. The project has many polygons or just one polygon
  const polygonsCentroids = features.map((feature: Feature) =>
    turf.centroid(feature)
  );
  const centroidsGeoJSON = {
    type: 'FeatureCollection',
    features: polygonsCentroids,
  };
  // Calculate the overall centroid of the project if it has many polygons
  // But if the project has only one polygon, the centroid is the same as the polygon
  const overallCentroid = turf.centroid(centroidsGeoJSON as FeatureCollection);
  return overallCentroid;
};

export const fetchLocationDetails = async (
  coordinates: Position
): Promise<{ placeName: string; stateShortCode: string }> => {
  const response = await fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${coordinates[0]},${coordinates[1]}.json?access_token=${MAPBOX_TOKEN}`
  );
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = (await response.json()) as MapboxGeocodingResponse;
  // Get the place name from the place feature
  const placeInfo = data.features.find((feature: MapboxGeocodeFeature) =>
    feature.id.startsWith('place')
  );
  const placeName = placeInfo ? placeInfo.place_name : '';
  // Get the state short code from the region feature
  const regionInfo = data.features.find((feature: MapboxGeocodeFeature) =>
    feature.id.startsWith('region')
  );
  const stateShortCode = regionInfo
    ? regionInfo.properties.short_code ?? ''
    : '';

  return { placeName, stateShortCode };
};

export function useGetLandAssessmentProjects() {
  const { data, error } = useSWR(
    '/api/land-assessment',
    landAssessmentProjectListFetcher
  );
  const [projectData, setProjectData] = useState<LandAssessmentProjects[]>([]);

  useEffect(() => {
    if (!data) return;

    const projects = data.result?.project ? data.result.project : [];

    const processProjects = async () => {
      const projectProcessingPromises = projects.map(async (project) => {
        const projectData = project.data as FeatureCollection;
        const projectFeatures = projectData.features as Feature<Polygon>[];
        // Gather data that doesn't require async operations
        const landAreaInHectares = Number(
          calculateTotalAreaInHectares(projectFeatures).toFixed(4)
        );
        const overallCentroid = calculateProjectCentroid(projectFeatures);
        // Fetch additional details that require async operations
        try {
          const { placeName, stateShortCode } = await fetchLocationDetails(
            overallCentroid.geometry.coordinates
          );
          return {
            id: project.id,
            projectName: project.projectName,
            carbonMethod:
              data.result.estimate?.find((e) => e.id === project.id)
                ?.carbonMethod || [],
            projectLocation: placeName,
            projectLocState: stateShortCode,
            landAreaInHectares,
            pinLocation: overallCentroid,
            estimateExists: !!data.result.estimate?.find(
              (e) => e.id === project.id
            ),
            exclusionExists: !!data.result.exclusion?.find(
              (e) => e.id === project.id
            ),
          } as LandAssessmentProjects;
        } catch (e) {
          console.error('Error fetching location details:', e);
          return null;
        }
      });

      const processedProjects = await Promise.all(projectProcessingPromises);
      setProjectData(
        processedProjects.filter(
          (project): project is LandAssessmentProjects => project !== null
        )
      );
    };

    void processProjects();
  }, [data]);

  return { projectData, error, isLoading: !data && !error };
}
