'use client';

import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import 'mapbox-gl/dist/mapbox-gl.css';

import { useSeedsNearMeContext } from '@/components/context/SeedsNearMeContext';
import { env } from '@/env';
import { cn } from '@/lib/utils';
import adjustMapView from '@/lib/utils/adjust-map-view';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import MapboxGeocoder, { Result } from '@mapbox/mapbox-gl-geocoder';
import { Feature, FeatureCollection, Polygon } from 'geojson';
import { LoaderCircleIcon } from 'lucide-react';
import mapboxgl from 'mapbox-gl';
import { memo, useEffect, useRef, useState } from 'react';

mapboxgl.accessToken = env.NEXT_PUBLIC_MAPBOX_TOKEN;

// We are only expecting a single polygon feature for this use case
export type GeoJSONPolygon = Feature<Polygon, any>;

interface GeocoderResultEvent {
  result: Result;
}

interface InteractiveMapProps {
  className?: string;
  geoJsonData?: FeatureCollection | null;
  onDrawnPolygon?: (polygonData: GeoJSONPolygon) => void;
  lat?: number | null;
  lng?: number | null;
  zoom?: number | null;
  isZoomControl?: boolean;
}

// Defaulting to Sydney, Australia as the center of the map
const InteractiveMap = ({
  className = '',
  geoJsonData = null,
  onDrawnPolygon,
  lat = -33.8688,
  lng = 151.2093,
  zoom = 10,
  isZoomControl = false,
}: InteractiveMapProps) => {
  const mapContainer = useRef(null);
  // Initialize with no-op functions to satisfy TypeScript requirements
  const onMapLoad = useRef(() => {});
  const onDrawCreate = useRef((e: any) => {});
  const { addressData, setAddressData, setGeoJsonData } =
    useSeedsNearMeContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current!,
      style: 'mapbox://styles/mapbox/satellite-v9',
      center: [lng!, lat!],
      zoom: zoom!,
    });

    const draw = new MapboxDraw({
      displayControlsDefault: false,
      controls: { polygon: true, trash: true },
    });

    // Add the geocoder
    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      marker: true,
      placeholder: 'Search by address',
      bbox: [113.338953078, -43.6345972634, 153.569469029, -10.6681857235],
    });

    onMapLoad.current = () => {
      // Set loading to false when the map is loaded
      setIsLoading(false);
      if (addressData) {
        // Ensure addressData.center is treated as a tuple [number, number]
        const center: [number, number] = [addressData.center[0], addressData.center[1]];
      
        new mapboxgl.Marker()
          .setLngLat(center) // Use the corrected center variable
          .addTo(map); // Add the marker to the map
      
        map.flyTo({
          center: center, // Use the corrected center variable
          zoom: 14,
        });
      }
      // Only call adjustMapView if geoJsonData is not null
      if (geoJsonData) {
        adjustMapView(map, draw, geoJsonData);
      } else {
        // Only add search control if geoJsonData is null
        map.addControl(geocoder);
        // Also add the draw control
        map.addControl(draw);
      }
      if (isZoomControl) {
        map.addControl(new mapboxgl.NavigationControl());
      }
      return;
    };

    onDrawCreate.current = (e: FeatureCollection<Polygon>) => {
      const features = draw.getAll();
      if (features.features.length === 1) {
        // Small delay to allow any internal updates to complete
        setTimeout(() => {
          draw.changeMode('simple_select');
          if (typeof onDrawnPolygon === 'function') {
            const drawnPolygon = e.features[0] as GeoJSONPolygon;
            onDrawnPolygon(drawnPolygon);
          }
        }, 100);
      }
    };

    geocoder.on('result', (e: GeocoderResultEvent) => {
      setAddressData(e.result);
      setGeoJsonData(null);
    });

    map.on('resize', () => map.resize());
    map.on('load', onMapLoad.current);
    map.on('draw.create', onDrawCreate.current);

    // Clean up on unmount
    return () => {
      map.off('load', onMapLoad.current);
      map.off('draw.create', onDrawCreate.current);
      map.remove();
    };
  }, [
    geoJsonData,
    lat,
    lng,
    addressData,
    onDrawnPolygon,
    setAddressData,
    setGeoJsonData,
    zoom,
  ]);

  return (
    <div className={cn('flex flex-1 rounded-xl shadow-around', className)}>
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

export default memo(InteractiveMap);
