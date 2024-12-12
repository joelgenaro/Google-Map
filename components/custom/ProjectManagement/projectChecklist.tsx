'use client';

import { TooltipProvider } from '@/components/ui/tooltip';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import NavigationButtons from './general/navigationButtons';
import useSWR from 'swr';
import { projectManagementFetcher } from '@/lib/helper';
import { Checkbox } from '@/components/ui/checkbox';
import { LoaderCircleIcon } from 'lucide-react';

interface FormData {
  landManagementPlanUrl: string;
  fireManagementPlanUrl: string;
  permanencePlanUrl: string;
}

export default function ProjectChecklist({
  params,
}: {
  params: { projectID: string };
}) {
  const [projectChecklist, setProjectChecklist] = useState<
    Array<{ title: string; status: boolean }>
  >([]);
  const { handleSubmit } = useForm<FormData>();
  const router = useRouter();

  const {
    data: projectData,
    error: projectError,
    isLoading: projectIsLoading,
  } = useSWR(
    `/api/project-management/environmental-planting/${params.projectID}`,
    projectManagementFetcher
  );

  useEffect(() => {
    if (projectData?.project && projectData?.project.id) {
      // Set checklistStatus
      const status: Record<string, boolean> = {};
      for (const key in projectData.project) {
        if (key === 'specificationsUrls') {
          status[key] = !(projectData.project as Record<string, any>)[
            key
          ].includes("I don't have this file");
        } else {
          status[key] =
            (projectData.project as Record<string, any>)[key] !==
            "I don't have this file";
        }
      }
      const newProjectChecklist = [
        {
          title: 'Project details',
          status: status.projectName && status.landholderName && status.address,
        },
        {
          title: 'Registration documentation',
          status:
            status.letterOfDeclarationUrl &&
            status.auditScheduleUrl &&
            status.letterToParticipateUrl,
        },
        { title: 'Specifications', status: status.specificationsUrls },
        {
          title: 'Land management plan',
          status:
            status.landManagementPlanUrl &&
            status.fireManagementPlanUrl &&
            status.permanencePlanUrl,
        },
        {
          title: 'Carbon baseline',
          status:
            status.fullCAMFilesUrl &&
            status.carbonEstimationAreaBaselineDataUrl &&
            status.additionalFilesUrls,
        },
        {
          title: 'Monitoring',
          status:
            status.monitoringPlotsUrl &&
            status.monitoringDataUrl &&
            status.monitoringAdditionalFilesUrls,
        },
      ];
      setProjectChecklist(newProjectChecklist);
    }
  }, [projectData]);

  const onSubmitSaveAndExit = () => {
    router.push(`/`);
  };
  
  const onSubmitSaveAndContinue = () => {
    router.push(`/project-management`);
  };

  return (
    <TooltipProvider>
      <form
        className="flex h-[calc(100vh-7rem)] w-full flex-col px-12 pb-8 lg:h-[calc(100vh-8rem)]"
        onSubmit={handleSubmit(onSubmitSaveAndContinue)}
      >
        <h2 className="mt-8 text-3xl sm:text-2xl">Project checklist</h2>
        <div className="flex flex-1 flex-col justify-center gap-10 px-8 py-16">
          {projectIsLoading ? (
            <div className="flex h-full flex-1 items-center justify-center">
              <LoaderCircleIcon className="h-12 w-12 animate-spin" />
              <span>Loading ...</span>
            </div>
          ) : (
            projectChecklist.map((checklist, index) => (
              <div className="flex items-center space-x-4" key={index}>
                <Checkbox
                  className="h-6 w-6"
                  id={checklist.title}
                  checked={checklist.status}
                  disabled
                />
                <label
                  htmlFor="terms"
                  className="text-xl font-medium leading-none peer-disabled:cursor-not-allowed"
                >
                  {checklist.title}
                </label>
              </div>
            ))
          )}
        </div>
        <NavigationButtons
          submitting={false}
          onSubmitSaveAndContinue={onSubmitSaveAndContinue}
          onSubmitSaveAndExit={onSubmitSaveAndExit}
        />
      </form>
    </TooltipProvider>
  );
}
