import { FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';
import { Session } from 'next-auth';
import { ZodError } from 'zod';
import toast from 'react-hot-toast';
import { FeatureCollectionOrNull } from './types/mapbox.type';
import { Dispatch, SetStateAction } from 'react';
import {
  ProjectManagementDetailActivity,
  ProjectManagementDetailIssue,
  SelectMonitoringDataWithPlotsAndPlants,
  ProjectManagementMonitoringReport,
  SelectProjectManagementMonitoringData,
} from '@/database/types';

export const saveLandAssessmentData = async (
  session: Session | null,
  projectID: string,
  dataToSave?: FeatureCollection<Geometry, GeoJsonProperties>,
  firstStepData?: FeatureCollectionOrNull,
  secondStepData?: FeatureCollectionOrNull
) => {
  const formData = new FormData();
  if (session?.user?.id) {
    formData.append('userId', session.user.id);
  }
  formData.append('data', JSON.stringify(dataToSave));
  const thirdStepDataBlob = new Blob([JSON.stringify(dataToSave)], {
    type: 'application/json',
  });
  formData.append(
    'thirdStepData',
    new File([thirdStepDataBlob], 'thirdStepData.geojson')
  );
  const firstStepDataBlob = new Blob([JSON.stringify(firstStepData)], {
    type: 'application/json',
  });
  formData.append(
    'firstStepData',
    new File([firstStepDataBlob], 'firstStepData.geojson')
  );
  const secondStepDataBlob = new Blob([JSON.stringify(secondStepData)], {
    type: 'application/json',
  });
  formData.append(
    'secondStepData',
    new File([secondStepDataBlob], 'secondStepData.geojson')
  );

  return fetch(`/api/land-assessment/${projectID}/exclusion`, {
    method: 'POST',
    body: formData,
  });
};

// Save Geo Data
export async function handleSaveGeoDataCommon(
  session: Session | null,
  draw: MapboxDraw | null,
  uploadedData: FeatureCollectionOrNull,
  additionalData: any,
  url: string,
  schema: any,
  method: 'POST' | 'PUT'
) {
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

  const formData = {
    userId: session?.user?.id,
    data: dataToSave,
    ...additionalData,
  };

  try {
    schema.parse(formData);

    // If the validation is successful, save the data
    const res = await fetch(url, {
      method,
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

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

    return { data: await res.json() };
  } catch (error) {
    console.error('An error occurred:', error);
    // If the validation fails, handle the error
    const zodError = error as ZodError;
    zodError.errors.forEach((err) => {
      if (err.message === 'Please draw or upload the project area') {
        toast.error(err.message);
      }
    });
  }
}

export const fetchIssues = async (
  setAllIssues: Dispatch<SetStateAction<ProjectManagementDetailIssue[]>>,
  projectID: string
) => {
  // Fetch issues
  try {
    const response = await fetch(
      `/api/project-management/project-details/${projectID}/issue`
    );
    const data = await response.json();
    setAllIssues(data.getIssues as ProjectManagementDetailIssue[]);
  } catch (error) {
    console.error(error);
  }
};

export const fetchActivities = async (
  setAllActivities: Dispatch<SetStateAction<ProjectManagementDetailActivity[]>>,
  projectID: string
) => {
  // Fetch issues
  try {
    const response = await fetch(
      `/api/project-management/project-details/${projectID}/activity`
    );
    const data = await response.json();
    setAllActivities(data.activities as ProjectManagementDetailActivity[]);
  } catch (error) {
    console.error(error);
  }
};

export const fetchProjectManagementReport = async (
  setAllReports: Dispatch<SetStateAction<ProjectManagementMonitoringReport[]>>,
  projectID: string
) => {
  // Fetch issues
  try {
    const response = await fetch(
      `/api/project-management/project-details/${projectID}/monitoring/report`
    );
    const data = await response.json();
    setAllReports(data.reports as ProjectManagementMonitoringReport[]);
  } catch (error) {
    console.error(error);
  }
};

export const fetchMonitoringDataList = async (
  setMonitoringDataList: Dispatch<
    SetStateAction<SelectProjectManagementMonitoringData[]>
  >,
  projectID: string
) => {
  try {
    const response = await fetch(
      `/api/project-management/project-details/${projectID}/monitoring/data`
    );
    const data = await response.json();
    setMonitoringDataList(
      data.monitoringDataList as SelectProjectManagementMonitoringData[]
    );
  } catch (error) {
    console.error(error);
  }
};


export const fetchMonitoringData = async (
  setSelectedMonitoringData: Dispatch<
    SetStateAction<SelectMonitoringDataWithPlotsAndPlants | null>
  >,
  setFetchMonitoringDataLoading: Dispatch<React.SetStateAction<boolean>>,
  projectID: string,
  dataID: string,
) => {
  setFetchMonitoringDataLoading(true);
  try {
    const response = await fetch(
      `/api/project-management/project-details/${projectID}/monitoring/data/${dataID}`
    );
    const data = await response.json();
    setSelectedMonitoringData(
      data.monitoringData as SelectMonitoringDataWithPlotsAndPlants
    );
  } catch (error) {
    console.error(error);
  } finally {
    setFetchMonitoringDataLoading(false);
  }
};
