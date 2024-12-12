// useMapCleanup.ts
import { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw';

export function useMapCleanup(map: React.MutableRefObject<mapboxgl.Map | null>, draw: React.MutableRefObject<MapboxDraw | null>) {
  useEffect(() => {
    return () => {
      if (
        map.current?.isStyleLoaded() &&
        draw.current &&
        map.current?.hasControl(draw.current)
      ) {
        map.current?.removeControl(draw.current);
      }
    };
  }, [map, draw]);
}