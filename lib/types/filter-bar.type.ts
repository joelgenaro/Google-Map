import { ComponentType } from 'react';

import { LandAssessmentProjects } from '@/components/hooks/useGetLandAssessmentProjects';
import {
  Cow as CowIconSvg,
  Seed as SeedIconSvg,
  Tractor as TractorIconSvg,
  Tree as TreeIconSvg,
} from '@/components/icons';

export type FieldType = 'checkbox-as-icon' | 'select' | 'switch';

interface BaseInputFieldConfig {
  fieldName: string;
  fieldLabel: string;
  fieldType: FieldType;
}

interface SwitchInputFieldConfig extends BaseInputFieldConfig {
  fieldType: 'switch';
}

interface SelectInputFieldConfig extends BaseInputFieldConfig {
  fieldType: 'select';
  selectOptions: string[];
}

export type CarbonMethodsCheckboxIconNames =
  | 'environmentalPlanting'
  | 'plantation'
  | 'humanInducedReforestation'
  | 'soilCarbon';

// Define another valid types for the icons that are used in the filter bar
// export type AnotherFilterCheckboxIconNames =
//   | 'test1'
//   | 'test2'
//   | 'test3'
//   | 'test4';

// Define a union type of all valid icon names
// type AllCheckboxIconNames = CarbonMethodsCheckboxIconNames | AnotherFilterCheckboxIconNames;
type AllCheckboxIconNames = CarbonMethodsCheckboxIconNames;

// Define a mapping from CarbonMethodsCheckboxIconNames to components
export const CheckboxIconMappings: {
  [key in AllCheckboxIconNames]: ComponentType;
} = {
  humanInducedReforestation: CowIconSvg,
  environmentalPlanting: SeedIconSvg,
  soilCarbon: TractorIconSvg,
  plantation: TreeIconSvg,
};

interface CheckboxAsIconInputFieldConfig extends BaseInputFieldConfig {
  fieldType: 'checkbox-as-icon';
  checkboxIconNames: AllCheckboxIconNames[];
}

export type InputFieldConfig =
  | SwitchInputFieldConfig
  | SelectInputFieldConfig
  | CheckboxAsIconInputFieldConfig;

export interface ProjectsFilterBarProps {
  inputFieldConfig: InputFieldConfig[];
  isLoading: (isLoading: boolean) => void;
  error: (error: any) => void;
  projectData: (projectData: LandAssessmentProjects[]) => void;
  isMapView: (isLoading: boolean) => void;
  pageType?: string;
  newProject?: {
    buttonLabel: string;
    href: string;
    showButton: boolean;
  };
}

export interface CheckboxAsIconValues {
  [iconName: string]: boolean | undefined;
}

export interface FilterValues {
  switches: { [key: string]: boolean };
  selects: { [key: string]: string };
  checkboxes: { [key: string]: CheckboxAsIconValues };
}

// Dynamic default value computation
export const defaultFilterValues = (
  inputFieldConfig: InputFieldConfig[]
): FilterValues => {
  return {
    checkboxes: inputFieldConfig.reduce(
      (acc, field) => {
        if (field.fieldType === 'checkbox-as-icon' && field.checkboxIconNames) {
          acc[field.fieldName] = field.checkboxIconNames.reduce(
            (iconAcc, iconName) => {
              // Default unchecked state
              iconAcc[iconName] = false;
              return iconAcc;
            },
            {} as CheckboxAsIconValues
          );
        }
        return acc;
      },
      {} as FilterValues['checkboxes']
    ),
    selects: inputFieldConfig.reduce(
      (acc, field) => {
        if (field.fieldType === 'select') {
          // Default empty string for select
          acc[field.fieldName] = '';
        }
        return acc;
      },
      {} as FilterValues['selects']
    ),
    switches: inputFieldConfig.reduce(
      (acc, field) => {
        if (field.fieldType === 'switch') {
          // Default unchecked state for switch
          acc[field.fieldName] = false;
        }
        return acc;
      },
      {} as FilterValues['switches']
    ),
  };
};
