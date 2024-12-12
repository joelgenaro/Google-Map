import { LandAssessmentProjects } from '@/components/hooks/useGetLandAssessmentProjects';
import { FilterValues } from '../types/filter-bar.type';
import { isAreaGreaterThan } from './land-area-hectares';

const FilterBarHelper = (
  projectData: LandAssessmentProjects[],
  filterData: FilterValues
): LandAssessmentProjects[] => {
  const { carbonMethods } = filterData.checkboxes;
  const { propertyArea, state } = filterData.selects;
  const activeCarbonMethodNames: string[] = [];

  // Prepare a list of active carbon methods
  if (carbonMethods.environmentalPlanting)
    activeCarbonMethodNames.push('Environmental Planting');
  if (carbonMethods.plantation)
    activeCarbonMethodNames.push('Plantation Forestry');
  if (carbonMethods.humanInducedReforestation)
    activeCarbonMethodNames.push('Human-Induced Reforestation');
  if (carbonMethods.soilCarbon) activeCarbonMethodNames.push('Soil Carbon');

  // Filter projects based on active carbon methods and state (if specified)
  const filteredProjects = projectData.filter((data) => {
    // Check if any of the selected carbon methods are in the project's carbon methods
    const carbonMethodMatch =
      activeCarbonMethodNames.length === 0 ||
      activeCarbonMethodNames.some(
        (activeMethod) =>
          data.carbonMethod && data.carbonMethod.includes(activeMethod)
      );

    const stateMatch = state === '' || data.projectLocState.includes(state);

    const propertyAreaMatch =
      propertyArea === '' ||
      propertyArea === 'Any' ||
      isAreaGreaterThan(data.landAreaInHectares, propertyArea);

    return carbonMethodMatch && stateMatch && propertyAreaMatch;
  });
  return filteredProjects;
};

export default FilterBarHelper;
