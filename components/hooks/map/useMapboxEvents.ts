// useMapboxEvents.ts
import { useCallback } from 'react';
import mapboxgl from 'mapbox-gl';

export function useMapboxEvents(map: React.MutableRefObject<mapboxgl.Map | null>, popup: mapboxgl.Popup) {
  const handleMouseEnter = useCallback((e:any) => {
    if (map.current && e.features && e.features.length > 0) {
      const geometry = e.features[0].geometry;
      const properties = e.features[0].properties;

      if ('coordinates' in geometry && properties) {
        map.current.getCanvas().style.cursor = 'pointer';

        const coordinates = geometry.coordinates.slice();
        const description = properties.description;

        if (Array.isArray(coordinates) && coordinates.length >= 2 && typeof coordinates[0] === 'number' && typeof coordinates[1] === 'number') {
          while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
          }
      
          popup.setLngLat([coordinates[0], coordinates[1]]).setHTML(description).addTo(map.current);
        }
      }
    }
  }, [popup]);

  const handleMouseLeave = useCallback(() => {
    if (map.current) {
      map.current.getCanvas().style.cursor = '';
    }
    popup.remove();
  }, [popup]);

  return { handleMouseEnter, handleMouseLeave };
}