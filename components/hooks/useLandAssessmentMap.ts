import { useState, useEffect, useRef, RefObject } from 'react';
import mapboxgl, { NavigationControl } from 'mapbox-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import { env } from '@/env';
import { RedPolygon } from '@/lib/constants';

mapboxgl.accessToken = env.NEXT_PUBLIC_MAPBOX_TOKEN;

export const useLandAssessmentMap = (mapContainer: RefObject<HTMLDivElement>, step: number, onMapLoad: (draw: MapboxDraw) => void) => {
  const map = useRef<mapboxgl.Map | null>(null);
  const draw = useRef<MapboxDraw | null>(null);
  const navigation = useRef<NavigationControl | null>(null);
  const [lng, setLng] = useState(151.2099);
  const [lat, setLat] = useState(-33.865143);
  const [zoom, setZoom] = useState(9);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current ?? '',
      style: 'mapbox://styles/mapbox/satellite-v9',
      center: [lng, lat],
      zoom: zoom,
    });

    if (step === 3) {
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
        styles: RedPolygon,
      });
    } else {
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
    }

    navigation.current = new mapboxgl.NavigationControl({
      showZoom: true,
      visualizePitch: true,
    });

    map.current?.on('load', () => {
      if (navigation.current && !map.current?.hasControl(navigation.current)) {
        if (map.current) {
          map.current.addControl(navigation.current, 'top-left');
        }
      }

      if (draw.current && !map.current?.hasControl(draw.current)) {
        if (map.current) {
          map.current.addControl(draw.current, 'top-left');
          onMapLoad(draw.current);
        }
      }
    });

    map.current?.on('move', () => {
      if (map.current) {
        setLng(parseFloat(map.current.getCenter().lng.toFixed(4)));
        setLat(parseFloat(map.current.getCenter().lat.toFixed(4)));
        setZoom(parseFloat(map.current.getZoom().toFixed(2)));
      }
    });

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
  }, []);

  return { map, lng, lat, zoom, draw };
};
