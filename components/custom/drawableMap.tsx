'use client';

import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import 'mapbox-gl/dist/mapbox-gl.css';

import { env } from '@/env';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import mapboxgl from 'mapbox-gl';
import { useRef } from 'react';
import { useLandAssessmentBoundaries } from '../hooks/useLandAssessmentBoundaries';
import { FeatureCollectionOrNull } from '@/lib/types/mapbox.type';
import { useLandAssessmentDataOnMap } from '../hooks/useLandAssessmentDataOnMap';
import { useLandAssessmentMap } from '../hooks/useLandAssessmentMap';

mapboxgl.accessToken = env.NEXT_PUBLIC_MAPBOX_TOKEN;

interface DrawableMapProps {
  uploadedData?: FeatureCollectionOrNull;
  firstStepData?: FeatureCollectionOrNull;
  secondStepData?: FeatureCollectionOrNull;
  thirdStepData?: FeatureCollectionOrNull;
  forthStepData?: FeatureCollectionOrNull;
  onMapLoad: (draw: MapboxDraw) => void;
  clearBoundaries?: boolean;
  onBoundariesCleared?: () => void;
  step: number;
}

export default function DrawableMap({
  uploadedData,
  firstStepData,
  secondStepData,
  thirdStepData,
  forthStepData,
  onMapLoad,
  clearBoundaries,
  onBoundariesCleared,
  step,
}: DrawableMapProps) {
  const mapContainer = useRef(null);
  const { map, lng, lat, zoom, draw } = useLandAssessmentMap(
    mapContainer,
    step,
    onMapLoad
  );
  useLandAssessmentDataOnMap({
    map,
    uploadedData,
    firstStepData,
    secondStepData,
    thirdStepData,
    forthStepData,
    step,
  });
  useLandAssessmentBoundaries(map, draw, clearBoundaries, onBoundariesCleared);

  return (
    <div className="flex w-full flex-col h-full">
      <div ref={mapContainer} className="map-container w-full flex-1" />
    </div>
  );
}
