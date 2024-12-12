'use client';
import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from 'react';
import mapboxgl, { NavigationControl } from 'mapbox-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import { env } from '@/env';
import { useLandAssessmentBoundaries } from '../hooks/useLandAssessmentBoundaries';
import { FeatureCollectionOrNull } from '@/lib/types/mapbox.type';
import {
  InitialMapData,
  useFunctionalMap,
} from '../hooks/map/useFunctionalMap';
import { cn } from '@/lib/utils';

import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useMapbox } from '../hooks/map/useMapbox';
import { useMapboxEvents } from '../hooks/map/useMapboxEvents';
import { useMapCleanup } from '../hooks/map/useMapCleanUp';
import { LoaderCircleIcon } from 'lucide-react';
import adjustMapView from '@/lib/utils/adjust-map-view';

mapboxgl.accessToken = env.NEXT_PUBLIC_MAPBOX_TOKEN;

interface FunctionalMapProps {
  uploadedData?: FeatureCollectionOrNull;
  initialMapData?: Array<InitialMapData>;
  monitoringData?: any;
  onMapLoad?: (draw: MapboxDraw) => void;
  clearBoundaries?: boolean;
  onBoundariesCleared?: () => void;
  className?: string;
  lng?: number;
  lat?: number;
  zoom?: number;
}

export default function FunctionalMap({
  uploadedData,
  initialMapData,
  monitoringData,
  onMapLoad,
  clearBoundaries,
  onBoundariesCleared,
  className,
  lat = -33.865143,
  lng = 151.2099,
  zoom = 10,
}: FunctionalMapProps) {
  const [isLoading, setIsLoading] = useState(true);
  const popup = useMemo(
    () =>
      new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false,
      }),
    []
  );

  const { mapContainer, map, draw, initializeMap, handleMapLoad } = useMapbox(
    lng,
    lat,
    zoom,
    onMapLoad,
    monitoringData
  );
  const { handleMouseEnter, handleMouseLeave } = useMapboxEvents(map, popup);
  useMapCleanup(map, draw);

  useEffect(() => {
    initializeMap();

    map.current?.on('load', () => {
      handleMapLoad();
      setIsLoading(false);
    });
    map.current?.on('mouseenter', 'places', handleMouseEnter);
    map.current?.on('mouseleave', 'places', handleMouseLeave);

    // Cleanup function
    return () => {
      if (
        map.current?.isStyleLoaded() &&
        draw.current &&
        map.current?.hasControl(draw.current)
      ) {
        map.current?.removeControl(draw.current);
      }
    };
  }, [initializeMap, handleMapLoad, handleMouseEnter, handleMouseLeave]);

  useFunctionalMap({
    map,
    uploadedData,
    initialMapData,
  });
  useLandAssessmentBoundaries(map, draw, clearBoundaries, onBoundariesCleared);

  return (
    <div className={cn('flex h-full w-full flex-col', className)}>
      <div
        ref={mapContainer}
        className="map-container w-full flex-1 items-center justify-center"
      >
        {isLoading && (
          <div className="flex flex-1 flex-grow items-center justify-center">
            <LoaderCircleIcon className="mr-2 h-12 w-12 animate-spin" />
            <span>Loading map ...</span>
          </div>
        )}
      </div>
    </div>
  );
}
