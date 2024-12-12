'use client';

import { Switch } from '@/components/ui/switch';
import { memo } from 'react';

interface PreviewMapLegendProps {
  showProjectArea: boolean;
  setShowProjectArea: (value: boolean) => void;
  showCarbonExclusion: boolean;
  setShowCarbonExclusion: (value: boolean) => void;
  showCarbonEstimate: boolean;
  setShowCarbonEstimate: (value: boolean) => void;
}

const PreviewMapLegend = ({
  showProjectArea,
  setShowProjectArea,
  showCarbonExclusion,
  setShowCarbonExclusion,
  showCarbonEstimate,
  setShowCarbonEstimate,
}: PreviewMapLegendProps) => {
  const isOnlyOneVisible =
    [showProjectArea, showCarbonExclusion, showCarbonEstimate].filter(Boolean)
      .length === 1;

  return (
    <div className="flex flex-col gap-4 py-4">
      <h2 className="text-lg font-semibold">Legend</h2>
      <div className="flex items-center justify-evenly gap-2">
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="flex flex-col items-center justify-center gap-1 sm:flex-row md:gap-2">
            <div
              className="h-4 w-4 rounded"
              style={{ backgroundColor: 'rgba(0, 128, 255, 0.5)' }}
            ></div>
            <span className="text-center text-xs sm:text-base">
              Project Boundary
            </span>
          </div>
          <Switch
            id="switch-project-area"
            checked={showProjectArea}
            onCheckedChange={() => setShowProjectArea(!showProjectArea)}
            disabled={isOnlyOneVisible && showProjectArea}
          />
        </div>
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="flex flex-col items-center justify-center gap-1 sm:flex-row md:gap-2">
            <div
              className="mr-2 h-4 w-4 rounded"
              style={{ backgroundColor: 'rgba(0, 255, 0, 0.5)' }}
            ></div>
            <span className="text-center text-xs sm:text-base">
              Project Area
            </span>
          </div>
          <Switch
            id="switch-carbon-estimate"
            checked={showCarbonEstimate}
            onCheckedChange={() => setShowCarbonEstimate(!showCarbonEstimate)}
            disabled={isOnlyOneVisible && showCarbonEstimate}
          />
        </div>
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="flex flex-col items-center justify-center gap-1 sm:flex-row md:gap-2">
            <div
              className="h-4 w-4 rounded"
              style={{ backgroundColor: 'rgba(255, 0, 0, 0.5)' }}
            ></div>
            <span className="text-center text-xs sm:text-base">
              Exclusion Zones
            </span>
          </div>
          <Switch
            id="switch-carbon-exclusion"
            checked={showCarbonExclusion}
            onCheckedChange={() => setShowCarbonExclusion(!showCarbonExclusion)}
            disabled={isOnlyOneVisible && showCarbonExclusion}
          />
        </div>
      </div>
    </div>
  );
};

export default memo(PreviewMapLegend);
