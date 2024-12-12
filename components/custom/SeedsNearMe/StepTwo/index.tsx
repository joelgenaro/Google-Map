'use client';

import { useSeedsNearMeContext } from '@/components/context/SeedsNearMeContext';
import { useFetchSeedsSpecies } from '@/components/hooks/useFetchSeedsSpecies';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/components/ui/use-toast';
import InteractiveMap from '../Common/InteractiveMap';
import SpeciesTable from './SeedSpeciesTable';
import StepTwoInput from './StepTwoInput';

const StepTwo = () => {
  const { toast } = useToast();
  const { geoJsonData, seedsRequestData } = useSeedsNearMeContext();
  const { seedsSpeciesList, error, loading } =
    useFetchSeedsSpecies(geoJsonData);

  if (loading) {
    return (
      <div className="flex w-full flex-1 flex-col gap-6 lg:flex-row">
        <div className="flex flex-1 flex-col gap-6 lg:w-1/2">
          <Skeleton className="h-[507px] w-full" />
          <div className="flex flex-1 flex-col gap-4">
            <Skeleton className="h-14 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
        <div className="flex flex-1 flex-col lg:w-1/2">
          <Skeleton className="h-[779.333px] w-full" />
        </div>
      </div>
    );
  } else if (error && !loading) {
    toast({
      title: 'Something went wrong while fetching seeds species',
      description: error,
      variant: 'destructive',
    });
  }

  return (
    !loading && (
      <div className="flex w-full flex-1 flex-col gap-6 lg:flex-row">
        <div className="flex flex-1 flex-col gap-6 lg:w-1/2">
          <SpeciesTable
            seedsSpeciesList={seedsSpeciesList}
            seedsRequestData={seedsRequestData}
          />
          <StepTwoInput />
        </div>
        <div className="flex flex-1 flex-col lg:w-1/2">
          <InteractiveMap
            className="max-h-snm-mapbox min-h-snm-mapbox"
            geoJsonData={geoJsonData}
            isZoomControl={true}
          />
        </div>
      </div>
    )
  );
};

export default StepTwo;
