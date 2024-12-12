import * as turf from '@turf/turf';

import {
  fetchLocationDetails,
  LandAssessmentProjects,
} from '@/components/hooks/useGetLandAssessmentProjects';
import { LandAssessmentProjectFull } from '@/database/types';
import { RawCarbonReturns, rawCarbonReturns } from '@/lib/mock/carbon-returns';
import {
  RawClimateGraphData,
  rawClimateGraphData,
} from '@/lib/mock/climate-graph-data';
import {
  RawClimateRiskData,
  rawClimateRiskData,
} from '@/lib/mock/climate-risk-data';
import {
  RawProjectAreaBreakdown,
  rawProjectAreaBreakdown,
} from '@/lib/mock/project-area-breakdown';
import { Feature, FeatureCollection, Polygon } from 'geojson';
import { useCallback, useEffect, useState } from 'react';
import { ClimateGraphData } from '../custom/LandAssessmentDetails/ClimateGraphs';
import { ClimateRiskData } from '../custom/LandAssessmentDetails/ClimateRisks';
import {
  formatNumberWithCommas,
  roundToTwoDecimalsWithCommas,
  transformRawClimateGraphData,
  transformRawClimateRiskData,
} from '../custom/LandAssessmentDetails/common.utils';
import { useToast } from '../ui/use-toast';

const calculateProjectsCentroid = (
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

interface UseLandAssessmentDetailsProps {
  projectData: LandAssessmentProjectFull;
}

interface ProjectDetails {
  projectName: string;
  projectLocation: string;
  projectArea: string;
  carbonMethods: string[];
  plantingArea: string;
  totalCarbonProjectValue: string;
  annualCarbonProjectValue: string;
  carbonSequestered: string;
}

export const useLandAssessmentDetails = ({
  projectData,
}: UseLandAssessmentDetailsProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isUsingMockData, setIsUsingMockData] = useState(false);
  const [projectDetails, setProjectDetails] = useState<ProjectDetails | null>(
    null
  );
  const [climateGraphData, setClimateGraphData] = useState<ClimateGraphData[]>(
    []
  );
  const [climateRiskData, setClimateRiskData] = useState<ClimateRiskData[]>([]);

  const fetchProjectAreaBreakdown: () => Promise<RawProjectAreaBreakdown> =
    useCallback(async () => {
      const response = await fetch(`/api/carbon/breakdown/${projectData.id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch project area breakdown');
      }
      const data = (await response.json()) as RawProjectAreaBreakdown;
      return data;
    }, [projectData.id]);

  const fetchCarbonReturns: () => Promise<RawCarbonReturns> =
    useCallback(async () => {
      const response = await fetch(`/api/carbon/returns/${projectData.id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch carbon returns');
      }
      const data = (await response.json()) as RawCarbonReturns;
      return data;
    }, [projectData.id]);

  const fetchClimateGraphData: () => Promise<ClimateGraphData[]> =
    useCallback(async () => {
      const response = await fetch(`/api/climate/${projectData.id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch climate graph data');
      }
      const data = (await response.json()) as RawClimateGraphData;
      return transformRawClimateGraphData(data);
    }, [projectData.id]);

  const fetchClimateRiskData: () => Promise<ClimateRiskData[]> =
    useCallback(async () => {
      const response = await fetch(`/api/risks/basic/${projectData.id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch climate risk data');
      }
      const data = (await response.json()) as RawClimateRiskData;
      return transformRawClimateRiskData(data);
    }, [projectData.id]);

  const fetchData = useCallback(async () => {
    const errorMessages: string[] = [];
    try {
      // Calculate the centroid of the project
      const projectCentroid = calculateProjectsCentroid(
        (projectData.data as FeatureCollection<Polygon>).features
      );

      // Fetch location details from the project centroid
      const locationDetails = await fetchLocationDetails(
        projectCentroid.geometry.coordinates
      );
      const projectLocation = locationDetails.placeName;

      const [
        projectAreaBreakdown,
        carbonReturns,
        climateGraphData,
        climateRiskData,
      ] = await Promise.all([
        fetchProjectAreaBreakdown().catch(() => {
          errorMessages.push('project area breakdown');
          return rawProjectAreaBreakdown;
        }),
        fetchCarbonReturns().catch(() => {
          errorMessages.push('carbon returns');
          return rawCarbonReturns;
        }),
        fetchClimateGraphData().catch(() => {
          errorMessages.push('climate graph data');
          return transformRawClimateGraphData(rawClimateGraphData);
        }),
        fetchClimateRiskData().catch(() => {
          errorMessages.push('climate risk data');
          return transformRawClimateRiskData(rawClimateRiskData);
        }),
      ]);

      setClimateGraphData(climateGraphData);
      setClimateRiskData(climateRiskData);

      setProjectDetails({
        projectName: projectData.projectName || '',
        projectLocation,
        projectArea: formatNumberWithCommas(projectAreaBreakdown.modelled_area),
        carbonMethods:
          (projectData.estimate && projectData.estimate[0].carbonMethod) || [],
        plantingArea: formatNumberWithCommas(projectAreaBreakdown.cea_area),
        totalCarbonProjectValue: roundToTwoDecimalsWithCommas(
          carbonReturns.cea_value.empProject
        ),
        annualCarbonProjectValue: roundToTwoDecimalsWithCommas(
          carbonReturns.cea_value.empAnnual
        ),
        carbonSequestered: formatNumberWithCommas(
          carbonReturns.cea_accus.empProject
        ),
      });

      if (errorMessages.length > 0) {
        setIsUsingMockData(true);
        toast({
          title: 'Something went wrong while retrieving data',
          description: `Failed to fetch the following data: ${errorMessages.join(
            ', '
          )}, using mock data instead`,
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error fetching project details: ', error);
      toast({
        title: 'Error fetching project details',
        description: 'An error occurred while fetching project details.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }, [
    fetchProjectAreaBreakdown,
    fetchCarbonReturns,
    fetchClimateGraphData,
    fetchClimateRiskData,
    projectData,
    toast,
  ]);

  useEffect(() => {
    if (projectData) {
      fetchData();
    }
  }, [fetchData, projectData]);

  return {
    isLoading,
    isUsingMockData,
    projectDetails,
    climateGraphData,
    climateRiskData,
  };
};
