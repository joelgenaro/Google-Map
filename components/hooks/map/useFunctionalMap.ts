import { MapColors } from '@/lib/constants';
import { LandAssessmenthandleData } from '@/lib/helper';
import { FeatureCollectionOrNull } from '@/lib/types/mapbox.type';
import * as turf from '@turf/turf';
import { LngLatBoundsLike } from 'mapbox-gl';
import { RefObject, useEffect } from 'react';

export interface InitialMapData {
  data?: FeatureCollectionOrNull;
  style?: 'blue' | 'red' | 'green' | 'yellow';
  boundaryId?: string;
}

interface DrawableMapDataProps {
  map: RefObject<mapboxgl.Map>;
  uploadedData?: FeatureCollectionOrNull;
  initialMapData?: Array<InitialMapData>;
}

export const useFunctionalMap = ({
  map,
  uploadedData,
  initialMapData,
}: DrawableMapDataProps) => {
  useEffect(() => {
    // Add uploaded data to map
    if (map.current) {
      if (map.current.isStyleLoaded()) {
        initialMapData?.forEach(({ data, style, boundaryId }, index) => {
          const styleFunction = MapColors[style as keyof typeof MapColors];
          LandAssessmenthandleData(
            map,
            data,
            boundaryId || index.toString(),
            styleFunction
          );
        });
      } else {
        map.current?.on('load', () => {
          initialMapData?.forEach(({ data, style, boundaryId }, index) => {
            const styleFunction = MapColors[style as keyof typeof MapColors];
            LandAssessmenthandleData(
              map,
              data,
              boundaryId || index.toString(),
              styleFunction
            );
          });
        });
      }

      // Auto zoom and pan the map to fit the bounding box
      const dataToUpload = [
        uploadedData,
        ...(initialMapData?.map(({ data }) => data) || []),
      ]
        .flat()
        .filter(Boolean);

      dataToUpload.forEach((data) => {
        if (data && 'features' in data) {
          // Calculate the bounding box of the GeoJSON data
          const boundaryBbox = turf.bbox(data) as LngLatBoundsLike;

          map.current?.fitBounds(boundaryBbox, { padding: 40 });
        }
      });
    }
  }, [uploadedData, initialMapData]);
};
