'use client';

import { FilePlus } from 'lucide-react';
import Link from 'next/link';
import { memo, useCallback, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

import {
  FilterValues,
  ProjectsFilterBarProps,
  defaultFilterValues,
} from '@/lib/types/filter-bar.type';
import { deepEqual } from '@/lib/utils/deep-equal';
import FilterBarHelper from '@/lib/utils/filter-bar-helper';
import { transformProjectData } from '@/lib/utils/typeConvert';
import useDebounce from '../hooks/useDebounce';
import {
  LandAssessmentProjects,
  useGetLandAssessmentProjects,
} from '../hooks/useGetLandAssessmentProjects';
import { useGetProjectmanagements } from '../hooks/useGetProjectManagements';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Switch } from '../ui/switch';
import CheckboxAsIcon from './CheckboxAsIcon';

const ProjectsFilterBar = ({
  inputFieldConfig,
  isLoading,
  error,
  projectData,
  isMapView,
  newProject,
  pageType = 'land-assessment',
}: ProjectsFilterBarProps) => {
  // const applyFilters = useCallback(async () => {
  //   onLoadingChange(true);
  //   try {
  //     const filterData = getValues();
  //     const response = await fetch('/api/projects/filter', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify(filterData),
  //     });
  //     if (!response.ok) {
  //       onErrorChange(response.statusText);
  //     }
  //     const data = await response.json();
  //     onResultsChange(data);
  //   } catch (error: any) {
  //     onErrorChange(error.message);
  //   } finally {
  //     onLoadingChange(false);
  //   }
  // }, [getValues, onResultsChange, onLoadingChange, onErrorChange]);

  const { control, getValues, reset, watch, formState } = useForm<FilterValues>(
    {
      defaultValues: defaultFilterValues(inputFieldConfig),
      shouldUnregister: false,
    }
  );

  const {
    isLoading: hookIsLoading,
    error: hookError,
    projectData: hookProjectData,
  } = pageType === 'land-assessment'
    ? useGetLandAssessmentProjects()
    : useGetProjectmanagements();

  const getProjectData = useCallback((): LandAssessmentProjects[] => {
    return pageType === 'land-assessment'
      ? (hookProjectData as LandAssessmentProjects[])
      : transformProjectData(hookProjectData);
  }, [hookProjectData, pageType]);

  const executeCallbacks = useCallback(() => {
    isLoading(hookIsLoading);
    error(hookError);
    const currentFilterValues = getValues();
    isMapView(currentFilterValues.switches['mapView']);
    const shouldFilterData = !deepEqual(
      currentFilterValues,
      formState.defaultValues
    );
    const currentHookProjectData = getProjectData();
    projectData(
      shouldFilterData
        ? FilterBarHelper(currentHookProjectData, currentFilterValues)
        : currentHookProjectData
    );
  }, [
    isLoading,
    hookIsLoading,
    error,
    hookError,
    getValues,
    isMapView,
    formState.defaultValues,
    getProjectData,
    projectData,
  ]);

  const debouncedApplyFilters = useDebounce(executeCallbacks, 1000);

  useEffect(() => {
    executeCallbacks();
  }, [hookIsLoading, hookError, hookProjectData, executeCallbacks]);

  useEffect(() => {
    // Watch for changes on all form fields to trigger the API call
    const subscription = watch(() => debouncedApplyFilters());
    return () => subscription.unsubscribe();
  }, [watch, debouncedApplyFilters]);

  if (!inputFieldConfig || inputFieldConfig.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="flex flex-wrap items-stretch justify-start gap-4 rounded-xl p-4 shadow-around">
        {newProject && newProject.showButton && (
          <div className="block w-fit">
            <Link
              href={newProject.href}
              className="flex flex-col items-center justify-center text-center"
            >
              <FilePlus className="h-8 w-8" />
              <span className="mt-2 leading-5">{newProject.buttonLabel}</span>
            </Link>
          </div>
        )}
        {inputFieldConfig.map((field, index) => (
          <div
            className={`flex flex-col gap-4 pl-3 md:flex-row md:items-center ${
              index > 0 || (newProject && newProject.showButton)
                ? 'sm:border-l sm:border-gray-500'
                : ''
            }`}
            key={`${field.fieldType}-${field.fieldName}`}
          >
            <Label
              key={`${field.fieldType}-${field.fieldName}`}
              className="min-w-fit font-semibold text-primary"
            >
              {field.fieldLabel}
            </Label>
            {field.fieldType === 'switch' && (
              <div className="flex flex-wrap gap-4">
                <Controller
                  key={`key-controller-${field.fieldType}-${field.fieldName}`}
                  name={`switches.${field.fieldName}`}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <>
                      <Switch
                        id={`switch-${field.fieldName}`}
                        checked={value}
                        onCheckedChange={onChange}
                      />
                      <span className="min-w-[21px] items-center text-sm font-medium">
                        {watch(`switches.${field.fieldName}`) ? 'On' : 'Off'}
                      </span>
                    </>
                  )}
                />
              </div>
            )}
            {field.fieldType === 'checkbox-as-icon' &&
              field.checkboxIconNames && (
                <div className="flex flex-row gap-4">
                  {field.checkboxIconNames.map((iconName) => (
                    <Controller
                      key={`key-controller-${field.fieldType}-${field.fieldName}-${iconName}`}
                      name={`checkboxes.${field.fieldName}.${iconName}`}
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <CheckboxAsIcon
                          iconName={iconName}
                          checked={value}
                          onChange={onChange}
                        />
                      )}
                    />
                  ))}
                </div>
              )}
            {field.fieldType === 'select' && (
              <Controller
                key={`key-controller-${field.fieldType}-${field.fieldName}`}
                name={`selects.${field.fieldName}`}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Select value={value || ''} onValueChange={onChange}>
                    <SelectTrigger
                      aria-label={field.fieldLabel}
                      className="rounded-md"
                    >
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {field.selectOptions &&
                          field.selectOptions.map((item) => (
                            <SelectItem key={item} value={item}>
                              {item}
                            </SelectItem>
                          ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
            )}
          </div>
        ))}
      </div>
      <div className="flex flex-1 items-center justify-end">
        <Button className="self-center uppercase" onClick={() => reset()}>
          Reset Filters
        </Button>
      </div>
    </div>
  );
};

export default memo(ProjectsFilterBar);
