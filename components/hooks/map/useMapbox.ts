// useMapbox.ts
import { useRef, useCallback, useEffect } from 'react';
import mapboxgl, { NavigationControl } from 'mapbox-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw';

export function useMapbox(
  lng: number,
  lat: number,
  zoom: number,
  onMapLoad?: (draw: MapboxDraw) => void,
  monitoringData?: any
) {
  const mapContainer = useRef(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const draw = useRef<MapboxDraw | null>(null);
  const navigation = useRef<NavigationControl | null>(null);

  const initializeMap = useCallback(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current!,
      style: 'mapbox://styles/mapbox/satellite-v9',
      center: [lng!, lat],
      zoom: zoom,
    });

    draw.current = new MapboxDraw({
      displayControlsDefault: false,
      controls: {
        line_string: true,
        point: true,
        polygon: true,
        trash: true,
        combine_features: true,
        uncombine_features: true,
      },
    });

    navigation.current = new mapboxgl.NavigationControl({
      showZoom: true,
      visualizePitch: true,
    });
  }, [lng, lat, zoom]);

  const handleMapLoad = useCallback(() => {
    if (navigation.current && !map.current?.hasControl(navigation.current)) {
      if (map.current) {
        map.current.addControl(navigation.current, 'top-left');
      }
    }

    if (monitoringData && monitoringData.Plot) {
      const headers = monitoringData.Plot[0].slice(3);
      const features = monitoringData.Plot.slice(1).map((row: any[]) => {
        const [PlotID, longitude, latitude, ...otherProps] = row;
        return {
          type: 'Feature',
          properties: {
            description: `
            <div class="p-4 bg-gray-100 mb-4 rounded">
              <h2 class="text-lg font-bold text-gray-700">PlotID: ${PlotID}</h2>
              <p>Longitude: ${longitude}</p>
              <p>Latitude: ${latitude}</p>
            ${otherProps.map((prop, index) => `<p>${headers[index]}: ${prop}</p>`).join('')}
            </div>
          `,
          },
          geometry: {
            type: 'Point',
            coordinates: [longitude, latitude],
          },
        };
      });

      map.current?.addSource('places', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features,
        },
      });

      map.current?.addLayer({
        id: 'places',
        type: 'circle',
        source: 'places',
        paint: {
          'circle-color': '#4264fb',
          'circle-radius': 6,
          'circle-stroke-width': 2,
          'circle-stroke-color': '#ffffff',
        },
      });
    }

    if (draw.current && !map.current?.hasControl(draw.current)) {
      if (map.current) {
        map.current.addControl(draw.current, 'top-left');
        if (onMapLoad) {
          onMapLoad(draw.current);
        }
      }
    }
  }, [onMapLoad, JSON.stringify(monitoringData)]);

  useEffect(() => {
    initializeMap();
    handleMapLoad();
  }, [handleMapLoad, initializeMap]);

  useEffect(() => {
    if (map.current) {
      map.current.setCenter([lng, lat]);
      map.current.setZoom(zoom);
    }
  }, [lng, lat, zoom]);

  return { mapContainer, map, draw, navigation, initializeMap, handleMapLoad };
}
