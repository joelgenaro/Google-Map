'use client';

import { useSeedsNearMeContext } from '@/components/context/SeedsNearMeContext';
import DatePickerWithPresets from '@/components/ui/datepicker';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { CircleHelp } from 'lucide-react';
import { memo, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

type InputFieldNames =
  | 'seedsRequiredDate'
  | 'seedTreatment'
  | 'seedViability'
  | 'seedProvenance';

interface InputFieldConfig {
  name: InputFieldNames;
  label: string;
  tooltipTitle: string;
  tooltip: string;
}

const stepTwoInputFields: InputFieldConfig[] = [
  {
    name: 'seedTreatment',
    label: 'Request seed treatment for applicable species',
    tooltipTitle: 'Seed Treatment',
    tooltip:
      'Any physical or chemical technique applied to seeds that is required to break seed dormancy and facilitate water uptake for germination.',
  },
  {
    name: 'seedViability',
    label: 'Request viability testing for seeds',
    tooltipTitle: 'Seed Viability',
    tooltip:
      'The inherent ability of a seed to germinate under suitable conditions. Germination testing is one method to determine the viability of a seed batch.',
  },
  {
    name: 'seedProvenance',
    label: 'Request seed provenance information',
    tooltipTitle: 'Seed Provenance',
    tooltip:
      'The origin of the seed batch. Where, geographically, the parent plant grows and from which seeds are collected.',
  },
];

interface StepTwoInputForm {
  seedsRequiredDate: Date;
  seedTreatment: boolean;
  seedViability: boolean;
  seedProvenance: boolean;
}

const StepTwoInput = () => {
  const {
    seedsRequiredDate,
    setSeedsRequiredDate,
    seedTreatment,
    setSeedTreatment,
    seedViability,
    setSeedViability,
    seedProvenance,
    setSeedProvenance,
  } = useSeedsNearMeContext();

  const { control, watch } = useForm<StepTwoInputForm>({
    defaultValues: {
      seedsRequiredDate,
      seedTreatment,
      seedViability,
      seedProvenance,
    },
  });

  // Use watch to subscribe to all form values, this will watch all fields
  const formValues = watch();

  // Sync form values with context provider
  useEffect(() => {
    setSeedsRequiredDate(formValues.seedsRequiredDate);
    setSeedTreatment(formValues.seedTreatment);
    setSeedViability(formValues.seedViability);
    setSeedProvenance(formValues.seedProvenance);
  }, [formValues]);

  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="flex min-h-12 items-center justify-between rounded-xl px-4 py-2 shadow-around">
        <Label className="w-full">When are seeds required?</Label>
        <Controller
          name="seedsRequiredDate"
          control={control}
          render={({ field: { onChange, value } }) => (
            <DatePickerWithPresets
              selectedDate={value}
              onSelectDate={onChange}
            />
          )}
        />
      </div>
      {stepTwoInputFields.map((field) => (
        <div
          key={`switch-${field.name}`}
          className="flex min-h-12 items-center justify-between rounded-xl px-4 py-2 shadow-around"
        >
          <div className="flex flex-row items-center justify-center gap-2">
            <Label className="w-full">{field.label}</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <CircleHelp />
                </TooltipTrigger>
                <TooltipContent className="flex min-w-56 max-w-56 flex-col items-center justify-center gap-2 p-4">
                  <span className="text-center font-semibold">
                    {field.tooltipTitle}
                  </span>
                  <span className="text-center">{field.tooltip}</span>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Controller
            name={field.name}
            control={control}
            render={({ field: { onChange, value } }) => (
              <div className="flex flex-row items-center justify-center gap-4">
                <span className="flex min-w-[21px] items-center justify-center text-center text-sm font-medium">
                  No
                </span>
                <Switch
                  id={`switch-${field}`}
                  checked={typeof value === 'boolean' ? value : false}
                  onCheckedChange={onChange}
                />
                <span className="flex min-w-[21px] items-center justify-center text-center text-sm font-medium">
                  Yes
                </span>
              </div>
            )}
          />
        </div>
      ))}
    </div>
  );
};

export default memo(StepTwoInput);
