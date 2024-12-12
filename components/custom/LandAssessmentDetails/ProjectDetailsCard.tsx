'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { getCarbonMethodIcon } from './common.utils';

export interface ProjectDetailsProps {
  projectName: string;
  projectLocation: string;
  projectArea: string;
  carbonMethods: string[];
  plantingArea: string;
  totalCarbonProjectValue: string;
  annualCarbonProjectValue: string;
  carbonSequestered: string;
}

const ProjectDetailsCard = ({
  projectName,
  projectLocation,
  projectArea,
  carbonMethods,
  plantingArea,
  totalCarbonProjectValue,
  annualCarbonProjectValue,
  carbonSequestered,
}: ProjectDetailsProps) => {
  return (
    <Card className="flex w-full flex-1 flex-col rounded-lg shadow-lg">
      <CardHeader className="rounded-t-lg bg-primary p-4 text-lg font-semibold text-white">
        Project Details
      </CardHeader>
      <CardContent className="flex flex-col p-4">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-2">
            <span className="text-sm text-gray-500">Name</span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="overflow-hidden text-ellipsis whitespace-nowrap font-semibold">
                    {projectName}
                  </span>
                </TooltipTrigger>
                <TooltipContent className="flex items-center justify-center">
                  {projectName}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-sm text-gray-500">Location</span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="overflow-hidden text-ellipsis whitespace-nowrap font-semibold">
                    {projectLocation}
                  </span>
                </TooltipTrigger>
                <TooltipContent className="flex items-center justify-center">
                  {projectLocation}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-sm text-gray-500">Project Area</span>
            <span className="font-semibold">{projectArea} ha</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-sm text-gray-500">Carbon Methods</span>
            <div className="flex items-center gap-2">
              {carbonMethods.map((method) => (
                <div key={method} className="flex items-center gap-1 p-1">
                  {getCarbonMethodIcon(method)}
                </div>
              ))}
            </div>
          </div>
        </div>
        <Separator className="my-4" />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-2">
            <span className="text-sm text-gray-500">Planting Area</span>
            <span className="font-semibold">{plantingArea} ha</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-sm text-gray-500">
              Carbon Project Value (Total)
            </span>
            <span className="font-semibold">${totalCarbonProjectValue}</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-sm text-gray-500">
              Carbon Project Value (Annual)
            </span>
            <span className="font-semibold">
              ${annualCarbonProjectValue} / ha / y
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-sm text-gray-500">Carbon Sequestered</span>
            <span className="font-semibold">
              {carbonSequestered} tCO2 / ha / y
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectDetailsCard;
