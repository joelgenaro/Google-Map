import { RefObject, useEffect } from 'react';

export const useLandAssessmentBoundaries = (map: RefObject<mapboxgl.Map>, draw: any, clearBoundaries: boolean | undefined, onBoundariesCleared: any) => {
  useEffect(() => {
    if (clearBoundaries && draw.current) {
      draw.current.deleteAll();
      // Re-add firstStepData and secondStepData if they exist
      if (map.current) {
        if (map.current.getSource("uploadedData")) {
          if (map.current.getLayer("uploadedData")) {
            map.current.removeLayer("uploadedData");
          }
          if (map.current.getLayer("uploadedData" + "Outline")) {
            map.current.removeLayer("uploadedData" + "Outline");
          }
          map.current.removeSource("uploadedData");
        }
      }

      if (onBoundariesCleared) {
        onBoundariesCleared();
      }
    }
  }, [clearBoundaries]);;
};