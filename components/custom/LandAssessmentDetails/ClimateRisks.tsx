'use client';

import { CircleHelp } from 'lucide-react';
import { Fragment } from 'react';

import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export type ClimateRiskBadgeType =
  | 'outline'
  | 'risk-low'
  | 'risk-medium'
  | 'risk-high'
  | 'default';

export interface ClimateRiskData {
  riskName: string;
  riskLevel: string;
  riskIcon: JSX.Element;
  riskBadgeType: ClimateRiskBadgeType;
}

interface ClimateRisksProps {
  climateRiskData: ClimateRiskData[];
}

const ClimateRisks = ({ climateRiskData }: ClimateRisksProps) => {
  return (
    <div className="flex min-w-[300px] flex-1 flex-col rounded-lg shadow-lg">
      <div className="rounded-t-lg bg-primary py-2 text-center text-white">
        Project Risks
      </div>
      <div className="grid grid-cols-2 gap-4 p-4">
        <div className="flex items-center justify-center font-bold">Hazard</div>
        <div className="flex items-center justify-center font-bold">Risk</div>
        {climateRiskData.map((risk, index) => (
          <Fragment key={index}>
            <div className="flex items-center justify-center gap-4 md:px-12">
              <div className="flex min-w-8 items-center justify-center">
                {risk.riskIcon}
              </div>
              <div className="flex min-w-8 flex-1 items-center justify-center break-words">
                {risk.riskName}
              </div>
              <div className="flex min-w-8 items-center justify-center">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <CircleHelp />
                    </TooltipTrigger>
                    <TooltipContent className="flex min-w-56 max-w-56 flex-col items-center justify-center gap-2 p-4">
                      <span className="text-center font-semibold">
                        {risk.riskLevel} Risk
                      </span>
                      <span className="text-center">
                        This project is at {risk.riskLevel} risk of{' '}
                        {risk.riskName}
                      </span>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
            <div className="flex items-center justify-center gap-4">
              <Badge variant={risk.riskBadgeType} className="border-primary">
                {risk.riskLevel}
              </Badge>
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default ClimateRisks;
