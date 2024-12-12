// Initialize the mapbox draw and set the uploaded data to null
import { FeatureCollectionOrNull } from '@/lib/types/mapbox.type';
import { useState, useCallback } from 'react';

export const useInitializeMap = (setUploadedData: (data: FeatureCollectionOrNull) => void) => {
  const [draw, setDraw] = useState<MapboxDraw | null>(null);
  const [clearBoundaries, setClearBoundaries] = useState(false);

  const handleMapLoad = useCallback((draw: MapboxDraw) => {
    setDraw(draw);
  }, []);

  const handleRemoveBoundaries = useCallback(() => {
    setClearBoundaries(true);
    setUploadedData(null);
  }, []);

  return { draw, clearBoundaries, handleMapLoad, handleRemoveBoundaries, setClearBoundaries };
};