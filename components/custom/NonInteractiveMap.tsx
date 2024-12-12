'use client';

import 'mapbox-gl/dist/mapbox-gl.css';

import { env } from '@/env';
import * as turf from '@turf/turf';
import { LoaderCircleIcon } from 'lucide-react';
import mapboxgl, { LngLatBounds, LngLatBoundsLike } from 'mapbox-gl';
import { memo, useEffect, useRef, useState } from 'react';
import { LandAssessmentProjects } from '../hooks/useGetLandAssessmentProjects';
import { LandAssessmentNewProject } from '@/database/types';
import { LandAssessmenthandleData, polygonStyleBlue } from '@/lib/helper';
import { FeatureCollectionOrNull } from '@/lib/types/mapbox.type';

mapboxgl.accessToken = env.NEXT_PUBLIC_MAPBOX_TOKEN;

interface NonInteractiveMapProps {
  projects: LandAssessmentProjects[];
  className?: string;
  enableZoom?: boolean;
  projectBoundary?: LandAssessmentNewProject;
}

const NonInteractiveMap = ({
  projects,
  className = 'max-h-snm-mapbox min-h-snm-mapbox',
  enableZoom = true,
  projectBoundary,
}: NonInteractiveMapProps) => {
  // Use useRef to hold a reference to the map container element
  const mapContainer = useRef(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const onMapLoad = useRef(() => {});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current || '',
      style: 'mapbox://styles/mapbox/satellite-v9',
      zoom: 10,
    });

    mapRef.current = map;

    if (!enableZoom) {
      map.scrollZoom.disable();
      map.boxZoom.disable();
      map.doubleClickZoom.disable();
      map.touchZoomRotate.disable();
      map.dragPan.disable();
    }

    onMapLoad.current = () => {
      // Set loading to false when the map is loaded
      setIsLoading(false);

      if (!projects.length) {
        // Default center of Australia if there are no projects
        map.setCenter([134.3549, -25.6101]);
        map.setZoom(4.5);
        return;
      }

      const calculateAndDisplayMarkers = () => {
        if (!mapContainer.current) return;

        if (projects.length === 1) {
          const project = projects[0];
          const lng = project.pinLocation.geometry.coordinates[0];
          const lat = project.pinLocation.geometry.coordinates[1];
          new mapboxgl.Marker({ draggable: false, scale: 1.5 })
            .setLngLat([lng, lat])
            .addTo(map);
          map.setCenter([lng, lat]);
          map.setZoom(14);
        } else {
          const bbox = turf.bbox({
            type: 'FeatureCollection',
            features: projects.map((project) => ({
              type: 'Feature',
              geometry: project.pinLocation.geometry,
              properties: {},
            })),
          });

          const bounds: LngLatBoundsLike = [
            [bbox[0], bbox[1]], // Southwest coordinates
            [bbox[2], bbox[3]], // Northeast coordinates
          ];

          map.fitBounds(bounds, { padding: 60 });

          projects.forEach((project) => {
            const lng = project.pinLocation.geometry.coordinates[0];
            const lat = project.pinLocation.geometry.coordinates[1];
            new mapboxgl.Marker({ draggable: false, scale: 1.5 })
              .setLngLat([lng, lat])
              .addTo(map);
          });
        }
      };

      if (projectBoundary && mapContainer.current && map.isStyleLoaded()) {
        LandAssessmenthandleData(
          mapRef,
          projectBoundary.data as FeatureCollectionOrNull,
          'projectBoundary',
          polygonStyleBlue
        );

        // Zoom to the boundary
        const bounds = new LngLatBounds();
        const dataToUpload = projectBoundary.data as FeatureCollectionOrNull;

        if (dataToUpload && 'features' in dataToUpload) {
          const boundaryBbox = turf.bbox(dataToUpload) as LngLatBoundsLike;
          map?.fitBounds(boundaryBbox, { padding: 40 });
        }

        if (!bounds.isEmpty()) {
          map.fitBounds(bounds, { padding: 20 });
        }
      } else {
        calculateAndDisplayMarkers();
      }
    };

    map.on('resize', () => map.resize());
    map.on('load', onMapLoad.current);

    // Clean up on unmount
    return () => {
      map.off('load', onMapLoad.current);
      map.remove();
    };
  }, [projects, enableZoom, mapContainer]);

  return (
    <div className={`flex flex-1 rounded-xl shadow-around ${className}`}>
      <div className="flex flex-1 rounded-xl" ref={mapContainer}>
        {isLoading && (
          <div className="flex flex-grow items-center justify-center">
            <LoaderCircleIcon className="mr-2 h-12 w-12 animate-spin" />
            <span>Loading map ...</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(NonInteractiveMap);
