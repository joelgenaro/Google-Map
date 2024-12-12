'use client';

import { useSeedsNearMeContext } from '@/components/context/SeedsNearMeContext';
import InteractiveMap from '../Common/InteractiveMap';
import Summary from './Summary';

const RequestSummary = () => {
  const { geoJsonData } = useSeedsNearMeContext();

  return (
    <div className="flex w-full flex-1 flex-col gap-6 lg:flex-row ">
      <div className="flex flex-1 flex-col gap-6 lg:w-1/2">
        <Summary />
      </div>
      <div className="flex flex-1 flex-col lg:w-1/2">
        <InteractiveMap
          className="max-h-snm-mapbox min-h-snm-mapbox"
          geoJsonData={geoJsonData}
          isZoomControl={true}
        />
      </div>
    </div>
  );
};

export default RequestSummary;
