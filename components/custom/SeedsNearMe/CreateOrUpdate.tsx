'use client';

import { SeedsNearMeProvider } from '@/components/context/SeedsNearMeContext';
import { Step, Stepper } from '@/components/ui/stepper';
import { SeedsNearMeProps } from './Common/Constants';
import { getStepIcon, seedsNearMeSteps } from './Common/StepIcons';
import StepperContents from './Common/StepperContents';

const CreateOrUpdate = (props: SeedsNearMeProps) => {
  const { session, actionType, projectsListData } = props;

  // Conditionally render the stepper contents based on the action type
  const renderStepperContents = () => {
    // CREATE: Render the stepper contents for creating a new seed request
    if (actionType === 'CREATE') {
      return (
        <StepperContents
          session={session}
          actionType={actionType}
          projectsListData={projectsListData}
        />
      );
    } else if (actionType === 'UPDATE') {
      // UPDATE: Render the stepper contents for updating an existing seed request
      const { seedsRequestData } = props;
      return (
        <StepperContents
          session={session}
          actionType={actionType}
          projectsListData={projectsListData}
          seedsRequestData={seedsRequestData}
        />
      );
    }
  };

  return (
    <SeedsNearMeProvider>
      <div className="mb-4 flex flex-1 flex-col items-center justify-center gap-4 p-8 xl:p-0">
        <Stepper
          className="w-full rounded-xl p-6 shadow-around lg:w-1/2"
          initialStep={0}
          size="lg"
          steps={seedsNearMeSteps}
        >
          {seedsNearMeSteps.map((stepItem) => (
            <Step
              key={stepItem.id}
              label={stepItem.label}
              icon={stepItem.icon}
              checkIcon={getStepIcon(stepItem.id, 'white')}
            />
          ))}
          {renderStepperContents()}
        </Stepper>
      </div>
    </SeedsNearMeProvider>
  );
};

export default CreateOrUpdate;
