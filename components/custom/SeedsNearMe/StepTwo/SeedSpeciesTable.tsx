'use client';

import useSeedSpeciesData, {
  SeedSpeciesData,
  SpeciesData,
} from '@/components/hooks/useSeedsSpeciesData';
import { Checkbox, CheckboxIndicator } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import type { CheckedState } from '@radix-ui/react-checkbox';
import { CheckIcon } from '@radix-ui/react-icons';
import { Fragment, memo } from 'react';
import { Controller } from 'react-hook-form';

export interface SpeciesTableProps {
  seedsSpeciesList: SpeciesData[];
  seedsRequestData: SeedSpeciesData[];
}

const SeedSpeciesTable = ({
  seedsSpeciesList,
  seedsRequestData,
}: SpeciesTableProps) => {
  const {
    control,
    mergedData,
    missingQuantitySeeds,
    handleQuantityChange,
    handleSelectionChange,
  } = useSeedSpeciesData(seedsSpeciesList, seedsRequestData);

  const tableHeaderBaseClasses =
    'sticky top-0 z-10 flex items-center justify-center bg-gray-50 px-6 py-3 text-center text-sm font-bold uppercase text-gray-700';
  const tableRowBaseClasses =
    'flex items-center justify-center bg-white px-6 py-4';

  return (
    <>
      {missingQuantitySeeds.length > 0 && (
        <div className="text-red-600">
          Quantity must be provided for the following seeds:{' '}
          <span
            className="block max-h-12 overflow-hidden overflow-ellipsis whitespace-pre-line"
            style={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {missingQuantitySeeds.join(', ')}
          </span>
        </div>
      )}
      <div className="relative max-h-snm-seeds-table min-h-snm-seeds-table overflow-auto rounded-xl shadow-around">
        <div className="grid w-full min-w-136 grid-cols-12 text-left text-sm text-gray-500">
          <div
            className={cn(
              tableHeaderBaseClasses,
              'col-span-4 min-w-fit justify-start'
            )}
          >
            Species
          </div>
          <div
            className={cn(
              tableHeaderBaseClasses,
              'col-span-4 min-w-fit justify-start'
            )}
          >
            Common name
          </div>
          <div className={cn(tableHeaderBaseClasses, 'col-span-2 min-w-16')}>
            Select
          </div>
          <div className={cn(tableHeaderBaseClasses, 'col-span-2 min-w-16')}>
            Seed quantity (g)
          </div>
          {mergedData.map((item, index) => (
            <Fragment key={`${item.seedSpecies}-${item.id}`}>
              <div
                className={cn(tableRowBaseClasses, 'col-span-4 justify-start')}
              >
                {item.seedSpecies}
              </div>
              <div
                className={cn(tableRowBaseClasses, 'col-span-4 justify-start')}
              >
                {seedsSpeciesList.find((s) => s.species === item.seedSpecies)
                  ?.commonName || ''}
              </div>
              <div className={cn(tableRowBaseClasses, 'col-span-2 min-w-8')}>
                <Controller
                  name={`species.${index}.selected`}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Checkbox
                      className="h-8 w-8 rounded-lg bg-gray-300 hover:shadow-around"
                      checked={value}
                      onCheckedChange={(checked: CheckedState) =>
                        handleSelectionChange(index, checked === true)
                      }
                    >
                      <CheckboxIndicator>
                        <CheckIcon className="h-6 w-6" />
                      </CheckboxIndicator>
                    </Checkbox>
                  )}
                />
              </div>
              <div className={cn(tableRowBaseClasses, 'col-span-2 min-w-10')}>
                <Controller
                  name={`species.${index}.quantity`}
                  control={control}
                  render={({ field }) => (
                    <Input
                      id={`quantity-${index}`}
                      className="w-full"
                      type="number"
                      min={0}
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        handleQuantityChange(index, Number(e.target.value));
                      }}
                    />
                  )}
                />
              </div>
            </Fragment>
          ))}
        </div>
      </div>
    </>
  );
};

export default memo(SeedSpeciesTable);
