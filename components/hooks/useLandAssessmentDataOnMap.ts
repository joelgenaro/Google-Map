import { RefObject, useEffect } from 'react';
import { LandAssessmenthandleData, polygonStyleBlue, polygonStyleGreen, polygonStyleRed, polygonStyleYellow } from '@/lib/helper';
import { LngLatBounds } from 'mapbox-gl';
import { FeatureCollectionOrNull } from '@/lib/types/mapbox.type';
import * as turf from '@turf/turf';
import { LngLatBoundsLike } from 'mapbox-gl';

interface DrawableMapDataProps {
  map: RefObject<mapboxgl.Map>;
  uploadedData?: FeatureCollectionOrNull;
  firstStepData?: FeatureCollectionOrNull;
  secondStepData?: FeatureCollectionOrNull;
  thirdStepData?: FeatureCollectionOrNull;
  forthStepData?: FeatureCollectionOrNull;
  step: number;
}

export const useLandAssessmentDataOnMap = (
  {
    map,
    uploadedData,
    firstStepData,
    secondStepData,
    thirdStepData,
    forthStepData,
    step,
  }: DrawableMapDataProps
) => {
  useEffect(() => {
    // Add uploaded data to map
    if (map.current) {
      if (map.current.isStyleLoaded()) {
        switch (step) {
          case 1:
            LandAssessmenthandleData(map, uploadedData, 'uploadedData', polygonStyleBlue);
            break;
          case 2:
            LandAssessmenthandleData(map, firstStepData, 'firstStepData', polygonStyleYellow);
            LandAssessmenthandleData(map, uploadedData, 'uploadedData', polygonStyleBlue);
            break;
          case 3:
            LandAssessmenthandleData(map, secondStepData, 'secondStepData', polygonStyleBlue);
            LandAssessmenthandleData(map, firstStepData, 'firstStepData', polygonStyleYellow);
            LandAssessmenthandleData(map, uploadedData, 'uploadedData', polygonStyleRed);
            break;
          case 4:
            LandAssessmenthandleData(map, firstStepData, 'firstStepData', polygonStyleYellow);
            LandAssessmenthandleData(map, secondStepData, 'secondStepData', polygonStyleGreen);
            LandAssessmenthandleData(map, thirdStepData, 'thirdStepData', polygonStyleBlue);
            LandAssessmenthandleData(map, forthStepData, 'forthStepData', polygonStyleRed);
            break;
          default:
            break;
        }
      } else {
        map.current?.on('load', () => {
          switch (step) {
            case 1:
              LandAssessmenthandleData(map, uploadedData, 'uploadedData', polygonStyleBlue);
              break;
            case 2:
              LandAssessmenthandleData(
                map,
                firstStepData,
                'firstStepData',
                polygonStyleYellow
              );
              LandAssessmenthandleData(map, uploadedData, 'uploadedData', polygonStyleBlue);
              break;
            case 3:
              LandAssessmenthandleData(
                map,
                secondStepData,
                'secondStepData',
                polygonStyleBlue
              );
              LandAssessmenthandleData(
                map,
                firstStepData,
                'firstStepData',
                polygonStyleYellow
              );
              LandAssessmenthandleData(map, uploadedData, 'uploadedData', polygonStyleRed);
              break;
            case 4:
              LandAssessmenthandleData(
                map,
                firstStepData,
                'firstStepData',
                polygonStyleYellow
              );
              LandAssessmenthandleData(
                map,
                secondStepData,
                'secondStepData',
                polygonStyleGreen
              );
              LandAssessmenthandleData(
                map,
                thirdStepData,
                'thirdStepData',
                polygonStyleBlue
              );
              LandAssessmenthandleData(
                map,
                forthStepData,
                'forthStepData',
                polygonStyleRed
              );
              break;
            default:
              break;
          }
        });
      }

      // Zoom to uploaded data
      const bounds = new LngLatBounds();
      const dataToUpload = [uploadedData, firstStepData, secondStepData].filter(
        Boolean
      );

      dataToUpload.forEach((data) => {
        if (data && 'features' in data) {
          // Calculate the bounding box of the GeoJSON data
          const boundaryBbox = turf.bbox(data) as LngLatBoundsLike;

          map.current?.fitBounds(boundaryBbox, { padding: 40 });
        }
      });

      if (!bounds.isEmpty()) {
        map.current.fitBounds(bounds, { padding: 20 });
      }

    }
  }, [uploadedData, firstStepData, secondStepData, step]);
};
