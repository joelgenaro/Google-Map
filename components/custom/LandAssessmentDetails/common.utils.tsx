import { CircleHelpIcon } from 'lucide-react';

import { Cow, Seed, Tractor, Tree } from '@/components/icons';
import EarthquakeIcon from '@/components/icons/EarthquakeIcon';
import FireIcon from '@/components/icons/FireIcon';
import FloodIcon from '@/components/icons/FloodIcon';
import ThunderstormIcon from '@/components/icons/ThunderstormIcon';
import WindIcon from '@/components/icons/WindIcon';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { RawClimateGraphData } from '@/lib/mock/climate-graph-data';
import { RawClimateRiskData } from '@/lib/mock/climate-risk-data';
import { ClimateGraphData } from './ClimateGraphs';
import { ClimateRiskBadgeType, ClimateRiskData } from './ClimateRisks';

export const roundToTwoDecimals = (num: number) => Math.round(num * 100) / 100;

export const transformRawClimateGraphData = (
  data: RawClimateGraphData
): ClimateGraphData[] => {
  const monthValues = Object.values(data.Month);
  const precipitationData = Object.values(
    data.percentile_50_precipitation_sum_sum
  );
  const temperatureMaxData = Object.values(data.mean_temperature_2m_max_mean);
  const temperatureMinData = Object.values(data.mean_temperature_2m_min_mean);
  const daysBelow0Data = Object.values(data.percentile_50_days_below_0C_sum);

  return monthValues.map((month, index) => ({
    Month: month,
    rainfall_mm: roundToTwoDecimals(precipitationData[index]),
    max_temp_celsius: roundToTwoDecimals(temperatureMaxData[index]),
    min_temp_celsius: roundToTwoDecimals(temperatureMinData[index]),
    frost_days: roundToTwoDecimals(daysBelow0Data[index]),
  }));
};

export const transformRawClimateRiskData = (
  data: RawClimateRiskData
): ClimateRiskData[] => {
  const riskEntries = Object.entries(data.Risk).filter(
    ([, risk]) => risk !== 'LGA'
  );

  const getClimateRiskIcon = (riskName: string) => {
    switch (riskName) {
      case 'Cyclone':
        return <WindIcon className="h-6 w-6" />;
      case 'Flood':
        return <FloodIcon className="h-6 w-6" />;
      case 'Storm':
        return <ThunderstormIcon className="h-6 w-6" />;
      case 'Bushfire':
        return <FireIcon className="h-6 w-6" />;
      case 'Earthquake':
        return <EarthquakeIcon className="h-6 w-6" />;
      default:
        return <CircleHelpIcon className="h-6 w-6" />;
    }
  };

  const getClimateRiskBadgeType = (riskLevel: string): ClimateRiskBadgeType => {
    switch (riskLevel) {
      case 'No Exposure':
        return 'outline';
      case 'Low':
        return 'risk-low';
      case 'Medium':
        return 'risk-medium';
      case 'High':
        return 'risk-high';
      default:
        return 'default';
    }
  };

  return riskEntries.map(([key, risk]) => {
    const riskLevel =
      data['Risk Level'][key as keyof (typeof data)['Risk Level']];
    return {
      riskName: risk,
      riskLevel: riskLevel,
      riskIcon: getClimateRiskIcon(risk),
      riskBadgeType: getClimateRiskBadgeType(riskLevel),
    };
  });
};

// Function to format number with commas and 4 decimal places
export const formatNumberWithCommas = (number: number) => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(number);
};

export const roundToTwoDecimalsWithCommas = (num: number) =>
  formatNumberWithCommas(parseFloat(num.toFixed(2)));

export const getCarbonMethodIcon = (carbonMethod: string) => {
  let icon = null;
  switch (carbonMethod) {
    case 'Human-Induced Reforestation':
      icon = <Cow className="h-5 w-5" />;
      break;
    case 'Environmental Planting':
      icon = <Seed className="h-5 w-5" />;
      break;
    case 'Soil Carbon':
      icon = <Tractor className="h-5 w-5" />;
      break;
    case 'Plantation Forestry':
      icon = <Tree className="h-5 w-5" />;
      break;
    default:
      icon = null;
  }

  if (!icon) {
    return null;
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span>{icon}</span>
        </TooltipTrigger>
        <TooltipContent className="flex items-center justify-center">
          {carbonMethod}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
