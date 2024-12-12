import { LandAssessmentCarbonEstimationArea, LandAssessmentNewProject, LandAssessmentProjects, ProjectManagement } from "@/database/types";
import { RefObject } from "react";
import { FeatureCollectionOrNull } from "./types/mapbox.type";
import { Session } from "next-auth";

// Map Style functions

export const polygonStyleBlue = (
  map: mapboxgl.Map,
  uploadedData: GeoJSON.FeatureCollection,
  id: string
) => {
  map.addSource(id, {
    type: "geojson",
    data: uploadedData,
  });

  map.addLayer({
    id: id,
    type: "fill",
    source: id,
    layout: {},
    paint: {
      "fill-color": "#088",
      "fill-opacity": 0.3,
    },
  });

  map.addLayer({
    id: id + "Outline",
    type: "line",
    source: id,
    paint: {
      "line-color": "#3bb2d0",
      "line-width": 2,
    },
  });
};

export const polygonStyleYellow = (
  map: mapboxgl.Map,
  uploadedData: GeoJSON.FeatureCollection,
  id: string
) => {
  map.addSource(id, {
    type: "geojson",
    data: uploadedData,
  });

  map.addLayer({
    id: id,
    type: "line",
    source: id,
    layout: {},
    paint: {
      "line-color": "#bb840e",
      "line-width": 2,
    },
  });
};

export const polygonStyleRed = (
  map: mapboxgl.Map,
  uploadedData: GeoJSON.FeatureCollection,
  id: string
) => {
  map.addSource(id, {
    type: "geojson",
    data: uploadedData,
  });

  map.addLayer({
    id: id,
    type: "fill",
    source: id,
    layout: {},
    paint: {
      "fill-color": "#f00",
      "fill-opacity": 0.4,
    },
  });

  map.addLayer({
    id: id + "Outline",
    type: "line",
    source: id,
    paint: {
      "line-color": "#f00",
      "line-width": 2,
    },
  });
};

export const polygonStyleGreen = (
  map: mapboxgl.Map,
  uploadedData: GeoJSON.FeatureCollection,
  id: string
) => {
  map.addSource(id, {
    type: "geojson",
    data: uploadedData,
  });

  map.addLayer({
    id: id,
    type: "fill",
    source: id,
    layout: {},
    paint: {
      "fill-color": "#0f0",
      "fill-opacity": 0.4,
    },
  });

  map.addLayer({
    id: id + "Outline",
    type: "line",
    source: id,
    paint: {
      "line-color": "#0f0",
      "line-width": 2,
    },
  });
};

// Fetchers 

export const landAssessmentProjectListFetcher = (
  url: string
): Promise<{
  result: LandAssessmentProjects;
  status?: number;
}> =>
  fetch(url).then((res) => {
    return res.json();
  });

export const landAssessmentNewProjectFetcher = (
  url: string
): Promise<{
  project: LandAssessmentNewProject;
  status?: number;
}> =>
  fetch(url).then((res) => {
    return res.json();
  });

export const carbonEstimationFetcher = (
  url: string
): Promise<{
  carbon: LandAssessmentCarbonEstimationArea;
  status?: number;
}> =>
  fetch(url).then((res) => {
    return res.json();
  });

export const projectEstimationFetcher = (
  url: string
): Promise<{
  project: LandAssessmentNewProject;
  carbon: LandAssessmentCarbonEstimationArea;
  status?: number;
}> =>
  fetch(url).then((res) => {
    return res.json();
  });

export const projectManagementFetcher = (
  url: string
): Promise<{
  project: ProjectManagement;
  status?: number;
}> =>
  fetch(url).then((res) => {
    return res.json();
  });

export const projectManagementListFetcher = (
  url: string
): Promise<{
  project: ProjectManagement[];
  status?: number;
}> =>
  fetch(url).then((res) => {
    return res.json();
  });

export const isFeatureCollection = (
  object: any
): object is GeoJSON.FeatureCollection => {
  return (
    object &&
    object.type === "FeatureCollection" &&
    Array.isArray(object.features)
  );
};

export const isAdmin = (session: Session): boolean => {
  const user = session.user as { role?: string };
  return user?.role === "admin";
}

export const formatToString = (data: any) => typeof data === 'object' ? JSON.stringify(data) : data;

export const formatDateWithMonthAndYear = (dateString: Date) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
};

export const LandAssessmenthandleData = (
  map: RefObject<mapboxgl.Map>,
  data: FeatureCollectionOrNull | undefined,
  sourceName: string,
  styleFunction: (
    map: mapboxgl.Map,
    data: GeoJSON.FeatureCollection,
    id: string
  ) => void
): void => {
  if (data && map.current) {
    if (map.current.getSource(sourceName)) {
      if (map.current.getLayer(sourceName)) {
        map.current.removeLayer(sourceName);
      }
      if (map.current.getLayer(sourceName + "Outline")) {
        map.current.removeLayer(sourceName + "Outline");
      }
      map.current.removeSource(sourceName);
    }
    styleFunction(map.current, data, sourceName);
  }
};
