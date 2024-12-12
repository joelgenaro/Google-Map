import { SpeciesData } from '@/components/hooks/useSeedsSpeciesData';
import {
  LandAssessmentNewProject,
  SeedsRequestWithProjectData,
} from '@/database/types';
import { ApiSeedsSpeciesList } from '@/lib/mock/seeds-species-list';
import { Session } from 'next-auth';

export type ActionType = 'CREATE' | 'UPDATE';

interface SeedsNearMeBaseProps {
  session: Session | null;
  actionType: ActionType;
}

interface SeedsNearMeCreateProps extends SeedsNearMeBaseProps {
  actionType: 'CREATE';
  projectsListData: LandAssessmentNewProject[];
}

interface SeedsNearMeUpdateProps extends SeedsNearMeBaseProps {
  actionType: 'UPDATE';
  seedsRequestData: SeedsRequestWithProjectData;
  projectsListData?: LandAssessmentNewProject[];
}

export type SeedsNearMeProps = SeedsNearMeCreateProps | SeedsNearMeUpdateProps;

export const transformSeedsSpeciesList = (
  data: ApiSeedsSpeciesList
): SpeciesData[] => {
  const { Species, 'Common name': commonNames } = data;

  return Object.keys(Species).map((key) => ({
    id: parseInt(key),
    species: Species[key],
    commonName: commonNames[key] || '',
  }));
};
