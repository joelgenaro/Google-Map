'use client';

import { useSeedsNearMeContext } from '@/components/context/SeedsNearMeContext';
import { useSaveSeedsRequest } from '@/components/hooks/useSaveSeedsRequest';
import { SeedSpeciesData } from '@/components/hooks/useSeedsSpeciesData';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from '@/components/ui/dialog';
import { useStepper } from '@/components/ui/stepper';
import {
  LandAssessmentNewProject,
  SeedsRequestWithProjectData,
} from '@/database/types';
import { FeatureCollection } from 'geojson';
import { CircleAlert, LoaderCircleIcon } from 'lucide-react';
import { Session } from 'next-auth';
import { useRouter } from 'next/navigation';
import { memo, useCallback, useEffect, useState } from 'react';
import RequestSummary from '../RequestSummary';
import StepOne from '../StepOne';
import StepTwo from '../StepTwo';
import { ActionType } from './Constants';
import { seedsNearMeSteps } from './StepIcons';

interface StepperContentsProps {
  session: Session | null;
  actionType: ActionType;
  projectsListData?: LandAssessmentNewProject[];
  seedsRequestData?: SeedsRequestWithProjectData;
}

const StepperContents = ({
  session,
  actionType,
  projectsListData,
  seedsRequestData,
}: StepperContentsProps) => {
  const router = useRouter();
  const [isNextBtnDisabled, setIsNextBtnDisabled] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  // Stepper hooks to manage the steps and their state
  const {
    nextStep,
    prevStep,
    activeStep,
    setStep,
    isDisabledStep,
    hasCompletedAllSteps,
  } = useStepper();
  // Custom hook to access the context values for the SeedsNearMe form
  const {
    setSession,
    // For Step 1 - Project Selection
    projectsData,
    setProjectsData,
    selectedProjectToLink,
    setSelectedProjectToLink,
    geoJsonData,
    setGeoJsonData,
    // For Step 2 - Seed Request Form
    seedsRequiredDate,
    setSeedsRequiredDate,
    seedTreatment,
    setSeedTreatment,
    seedViability,
    setSeedViability,
    seedProvenance,
    setSeedProvenance,
    seedsRequestData: contextSeedsRequestData,
    setSeedsRequestData,
    missingQuantity,
    resetContext,
    resetContextDisabled,
  } = useSeedsNearMeContext();
  // Custom hook to create a new seed request
  const { saveSeedsRequest, submitting: createSeedsRequestLoading } =
    useSaveSeedsRequest();

  const isActionCreate = actionType === 'CREATE';
  const isActionUpdate = actionType === 'UPDATE';

  // Prev button and Next button should be modified
  const showPrevAndResetBtn = activeStep < seedsNearMeSteps.length;

  // Set session data, projects data, and action type to the context
  useEffect(() => {
    if (session) setSession(session);

    if (isActionCreate && projectsListData) {
      setProjectsData(projectsListData);
    } else if (isActionUpdate && seedsRequestData) {
      // If the seeds request data has a project ID, set the projects data to that project only
      if (seedsRequestData.projectId) {
        setProjectsData([
          {
            id: seedsRequestData.projectId,
            userId: session?.user?.id || '',
            projectName: seedsRequestData.projectName || '',
            data: seedsRequestData.projectData as FeatureCollection,
          },
        ]);
      } else if (projectsListData && projectsListData.length > 0) {
        // If the seeds request data does not have a project ID, set the projects data to all projects
        setProjectsData(projectsListData);
      }
    }
  }, [session, actionType, projectsListData, seedsRequestData]);

  // Set the seeds request data to the context
  useEffect(() => {
    if (projectsData.length > 0 && seedsRequestData) {
      setSelectedProjectToLink(seedsRequestData.projectId || '');
      setGeoJsonData(
        seedsRequestData.projectId
          ? (seedsRequestData.projectData as FeatureCollection)
          : (seedsRequestData.geoJsonData as FeatureCollection)
      );
      setSeedsRequestData(seedsRequestData.seedsSpecies as SeedSpeciesData[]);
      setSeedsRequiredDate(new Date(seedsRequestData.requiredDate));
      setSeedTreatment(seedsRequestData.seedTreatment ?? false);
      setSeedViability(seedsRequestData.seedViability ?? false);
      setSeedProvenance(seedsRequestData.seedProvenance ?? false);
    }
  }, [projectsData, seedsRequestData]);

  // Check if the next button should be disabled
  useEffect(() => {
    if (activeStep === 0) {
      setIsNextBtnDisabled(!geoJsonData);
    } else if (activeStep === 1) {
      setIsNextBtnDisabled(missingQuantity);
    }
  }, [geoJsonData, missingQuantity, activeStep]);

  const getNextButtonLabel = () => {
    if (activeStep === seedsNearMeSteps.length - 1) {
      if (createSeedsRequestLoading) {
        return (
          <div className="flex h-full flex-1 items-center justify-center">
            <LoaderCircleIcon className="mr-2 h-6 w-6 animate-spin" />
            <span>{isActionCreate ? 'Submitting' : 'Updating'} ...</span>
          </div>
        );
      }
      return isActionCreate ? 'Submit Request' : 'Update Request';
    }

    if (hasCompletedAllSteps) {
      return 'Finish';
    }

    return 'Next';
  };

  const handleConfirmReset = useCallback(() => {
    resetContext();
    setIsDialogOpen(false);
    setStep(0);
    router.refresh();
  }, [resetContext, setStep, router]);

  const handleClickNext = useCallback(async () => {
    if (activeStep === 1) {
      try {
        await saveSeedsRequest(
          {
            // Data below are used for the database model
            id: seedsRequestData?.id || null,
            createdBy: session?.user?.name || '',
            updatedBy: isActionUpdate ? session?.user?.name || 'System' : null,
            updatedAt: isActionUpdate ? new Date() : null,
            projectId: !selectedProjectToLink ? null : selectedProjectToLink,
            requiredDate: seedsRequiredDate,
            seedTreatment,
            seedViability,
            seedProvenance,
            seedsSpecies: contextSeedsRequestData,
            // Only save the geoJsonData if the the project is not selected
            // This is to reduce redundancy in the database as the project data is already saved
            geoJsonData: !selectedProjectToLink ? geoJsonData : null,
            // Data below are used for the hook only, not for the database model
            email: session?.user?.email || '',
            projectName:
              projectsListData?.find(
                (item) => item.id === selectedProjectToLink
              )?.projectName || '',
          },
          actionType
        );
        nextStep();
      } catch (saveError) {
        console.error('Error saving seed request:', saveError);
      }
    } else if (!hasCompletedAllSteps) {
      nextStep();
    } else {
      router.push('/');
    }
  }, [
    activeStep,
    saveSeedsRequest,
    seedsRequestData,
    session,
    actionType,
    selectedProjectToLink,
    projectsListData,
    contextSeedsRequestData,
    seedsRequiredDate,
    seedTreatment,
    seedViability,
    seedProvenance,
    nextStep,
    hasCompletedAllSteps,
    router,
  ]);

  const stepContent = (index: number) => {
    switch (index) {
      case 0:
        return <StepOne />;
      case 1:
        return <StepTwo />;
      default:
        return hasCompletedAllSteps ? <RequestSummary /> : null;
    }
  };

  return (
    <div className="flex h-full w-full flex-col">
      <div className="mb-4 flex flex-1 flex-row">{stepContent(activeStep)}</div>
      <div className="flex w-full flex-1 gap-6">
        <div className="hidden sm:flex sm:w-1/2 sm:justify-center"></div>
        <div className="flex w-full flex-col-reverse justify-between gap-4 sm:w-1/2 lg:flex-row">
          {showPrevAndResetBtn && (
            <>
              <div className="flex w-full justify-end lg:justify-start">
                <Button
                  className="w-2/3 px-12 py-6 lg:w-fit"
                  disabled={resetContextDisabled}
                  onClick={() => setIsDialogOpen(true)}
                  size="lg"
                  variant="destructive"
                >
                  Reset
                </Button>
              </div>
              <div className="flex w-full justify-end lg:justify-center">
                <Button
                  className="w-2/3 px-12 py-6 lg:w-fit"
                  disabled={isDisabledStep}
                  onClick={prevStep}
                  size="lg"
                  variant="outline"
                >
                  Back
                </Button>
              </div>
            </>
          )}
          <div className="flex w-full justify-end lg:justify-end">
            <Button
              className="w-2/3 px-12 py-6 lg:w-fit"
              size="lg"
              onClick={handleClickNext}
              disabled={isNextBtnDisabled || createSeedsRequestLoading}
              variant="default"
            >
              {getNextButtonLabel()}
            </Button>
          </div>
        </div>
        <Dialog open={isDialogOpen}>
          <DialogContent onClose={() => setIsDialogOpen(false)}>
            <DialogTitle>Confirm Reset</DialogTitle>
            <div className="flex w-full flex-col items-center justify-center py-4 text-center">
              <CircleAlert size={74} color="red" className="mb-4" />
              <span className="font-semibold">
                Caution: This action will remove all your changes and none of
                them will be saved. Are you sure you want to proceed?
              </span>
            </div>
            <DialogFooter className="flex w-full items-center justify-end">
              <Button
                className="px-12 py-6"
                onClick={() => setIsDialogOpen(false)}
                size="lg"
                variant="secondary"
              >
                Cancel
              </Button>
              <Button
                className="px-12 py-6"
                onClick={handleConfirmReset}
                size="lg"
                variant="destructive"
              >
                Confirm
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default memo(StepperContents);
