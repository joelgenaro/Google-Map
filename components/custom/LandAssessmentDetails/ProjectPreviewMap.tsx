'use client';

import 'mapbox-gl/dist/mapbox-gl.css';

import { LandAssessmentProjectFull } from '@/database/types';
import { env } from '@/env';
import * as turf from '@turf/turf';
import { Feature, FeatureCollection } from 'geojson';
import { LoaderCircleIcon } from 'lucide-react';
import mapboxgl, { LngLatBoundsLike } from 'mapbox-gl';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import PreviewMapLegend from './PreviewMapLegend';

mapboxgl.accessToken = env.NEXT_PUBLIC_MAPBOX_TOKEN;

interface ProjectPreviewMapProps {
  projectData: LandAssessmentProjectFull;
}

const ProjectPreviewMap = ({ projectData }: ProjectPreviewMapProps) => {
  // Use useRef to hold a reference to the map container element
  const mapContainer = useRef(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showProjectArea, setShowProjectArea] = useState(true);
  const [showCarbonExclusion, setShowCarbonExclusion] = useState(true);
  const [showCarbonEstimate, setShowCarbonEstimate] = useState(true);

  const fitMapToBounds = useCallback(
    (map: mapboxgl.Map, allFeatures: Feature[]) => {
      if (allFeatures.length > 0) {
        const bbox = turf.bbox({
          type: 'FeatureCollection',
          features: allFeatures,
        });

        map.fitBounds(bbox as LngLatBoundsLike, {
          padding: 20,
        });
      }
    },
    []
  );

  const addMapLayer = useCallback(
    (
      map: mapboxgl.Map,
      id: string,
      data: FeatureCollection | null,
      color: string
    ) => {
      if (!data) return null;

      // Check if the source already exists
      if (map.getSource(id)) {
        // Update the source data if it exists
        (map.getSource(id) as mapboxgl.GeoJSONSource).setData({
          type: 'FeatureCollection',
          features: data.features.map(
            (feature) =>
              turf.rewind(feature, { mutate: true, reverse: false }) as Feature
          ),
        });
      } else {
        // Add the source if it doesn't exist
        map.addSource(id, {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: data.features.map(
              (feature) =>
                turf.rewind(feature, {
                  mutate: true,
                  reverse: false,
                }) as Feature
            ),
          },
        });

        map.addLayer({
          id,
          type: 'fill',
          source: id,
          layout: {},
          paint: {
            'fill-color': color,
            'fill-opacity': 0.5,
          },
        });
      }

      return data;
    },
    []
  );

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current || '',
      style: 'mapbox://styles/mapbox/satellite-v9',
      zoom: 10,
    });

    mapRef.current = map;

    const handleStyleLoad = () => {
      const mainData = projectData.data as FeatureCollection;
      const exclusionData =
        projectData.exclusion && projectData.exclusion[0]
          ? (projectData.exclusion[0].data as FeatureCollection)
          : null;
      const estimateData =
        projectData.estimate && projectData.estimate[0]
          ? (projectData.estimate[0].data as FeatureCollection)
          : null;

      const addedMainData = addMapLayer(
        map,
        'main-data-layer',
        mainData,
        '#0080ff'
      );
      const addedExclusionData = addMapLayer(
        map,
        'carbon-exclusion-layer',
        exclusionData,
        '#ff0000'
      );
      const addedEstimateData = addMapLayer(
        map,
        'carbon-estimate-layer',
        estimateData,
        '#00ff00'
      );

      const allFeatures: Feature[] = [
        ...(addedMainData ? addedMainData.features : []),
        ...(addedExclusionData ? addedExclusionData.features : []),
        ...(addedEstimateData ? addedEstimateData.features : []),
      ];

      fitMapToBounds(map, allFeatures);
      setIsLoading(false);
    };

    map.on('styledata', handleStyleLoad);

    map.on('resize', () => map.resize());

    const handleResize = () => {
      if (mapRef.current) {
        const map = mapRef.current;
        const mainData = projectData.data as FeatureCollection;
        const exclusionData =
          projectData.exclusion && projectData.exclusion[0]
            ? (projectData.exclusion[0].data as FeatureCollection)
            : null;
        const estimateData =
          projectData.estimate && projectData.estimate[0]
            ? (projectData.estimate[0].data as FeatureCollection)
            : null;

        const allFeatures = [
          ...(mainData ? mainData.features : []),
          ...(exclusionData ? exclusionData.features : []),
          ...(estimateData ? estimateData.features : []),
        ];

        fitMapToBounds(map, allFeatures);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      map.off('styledata', handleStyleLoad);
      map.remove();
      window.removeEventListener('resize', handleResize);
    };
  }, [projectData, fitMapToBounds, addMapLayer]);

  useEffect(() => {
    if (mapRef.current && !isLoading) {
      mapRef.current.setLayoutProperty(
        'main-data-layer',
        'visibility',
        showProjectArea ? 'visible' : 'none'
      );
      mapRef.current.setLayoutProperty(
        'carbon-exclusion-layer',
        'visibility',
        showCarbonExclusion ? 'visible' : 'none'
      );
      mapRef.current.setLayoutProperty(
        'carbon-estimate-layer',
        'visibility',
        showCarbonEstimate ? 'visible' : 'none'
      );
    }
  }, [showProjectArea, showCarbonExclusion, showCarbonEstimate, isLoading]);

  return (
    <div className="flex flex-1 flex-col">
      <PreviewMapLegend
        showProjectArea={showProjectArea}
        setShowProjectArea={setShowProjectArea}
        showCarbonExclusion={showCarbonExclusion}
        setShowCarbonExclusion={setShowCarbonExclusion}
        showCarbonEstimate={showCarbonEstimate}
        setShowCarbonEstimate={setShowCarbonEstimate}
      />
      <div className="flex h-full w-full rounded-xl shadow-lg">
        <div className="flex h-full w-full rounded-xl" ref={mapContainer}>
          {isLoading && (
            <div className="flex flex-grow items-center justify-center">
              <LoaderCircleIcon className="mr-2 h-12 w-12 animate-spin" />
              <span>Loading map ...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(ProjectPreviewMap);
