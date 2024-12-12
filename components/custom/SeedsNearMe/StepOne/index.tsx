'use client';

import { useSeedsNearMeContext } from '@/components/context/SeedsNearMeContext';
import { FeatureCollection, Polygon } from 'geojson';
import InteractiveMap, { GeoJSONPolygon } from '../Common/InteractiveMap';
import StepOneInput from './StepOneInput';

const StepOne = () => {
  const { geoJsonData, setGeoJsonData } = useSeedsNearMeContext();

  // Handles the drawn polygon from the map and sets it to the context
  const handleDrawnPolygon = (polygonData: GeoJSONPolygon) => {
    const featureCollection: FeatureCollection<Polygon> = {
      type: 'FeatureCollection',
      features: [polygonData],
    };
    setGeoJsonData(featureCollection);
  };

  return (
    <div className="flex w-full flex-1 flex-col gap-6 lg:flex-row">
      <div className="flex flex-1 flex-col gap-6 lg:w-1/2">
        <StepOneInput />
      </div>
      <div className="flex flex-1 flex-col lg:w-1/2">
        <InteractiveMap
          geoJsonData={geoJsonData}
          onDrawnPolygon={handleDrawnPolygon}
          isZoomControl={true}
        />
      </div>
    </div>
  );
};

export default StepOne;
