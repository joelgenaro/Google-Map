'use client';

import ProjectsFilterBar from '@/components/custom/ProjectsFilterBar';
import { LAND_ASSESSMENT_FILTER_BAR_CONFIG } from '@/lib/constants';
import { useState } from 'react';
import { LandAssessmentProjects } from '../hooks/useGetLandAssessmentProjects';
import NonInteractiveMap from './NonInteractiveMap';
import Image from 'next/image';
import { LoaderCircleIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ProjectManagementList() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState();
  const [projectData, setProjectData] = useState<LandAssessmentProjects[]>([]);
  const [isMapView, setIsMapView] = useState<boolean>(false);
  const router = useRouter();

  const handleOnclick = (project: LandAssessmentProjects) => {
    const navigateTo = project.estimateExists
      ? `/project-management/details/${project.id}/project-status`
      : `/project-management/environmental-planting/${project.id}/specifications`;
    router.push(navigateTo);
  };

  return (
    <div className="mx-4 flex w-full flex-1 flex-col items-center justify-center gap-4">
      <div className="mb-4 block w-full">
        <ProjectsFilterBar
          inputFieldConfig={LAND_ASSESSMENT_FILTER_BAR_CONFIG}
          isLoading={setIsLoading}
          error={setError}
          projectData={setProjectData}
          isMapView={setIsMapView}
          pageType="project-management"
          newProject={{
            buttonLabel: 'New Project',
            href: '/project-management/project-methodology',
            showButton: true,
          }}
        />
      </div>
      <div className="flex w-full flex-1 flex-col gap-6">
        {!isLoading && !error && projectData && projectData.length > 0 && (
          <div
            className={`grid grid-cols-1 gap-4 ${isMapView ? 'lg:grid-cols-2' : ''}`}
          >
            {isMapView && <NonInteractiveMap projects={projectData} />}
            <div className="flex flex-col gap-6">
              {projectData.map((project: LandAssessmentProjects) => (
                <div
                  key={project.id}
                  className="flex cursor-pointer rounded-2xl border border-black bg-white"
                  onClick={() => handleOnclick(project)}
                >
                  <div className="flex-1 p-4">
                    <div className="mb-2 flex items-center gap-4">
                      <h2 className="text-2xl">{project.projectName}</h2>
                      <p className="text-sm">{project.projectLocation}</p>
                    </div>
                  </div>
                  <div className="flex-1">
                    <Image
                      className="h-[200px] w-full rounded-r-2xl"
                      src="/images/temp-background.png"
                      alt="Project Image"
                      width={600}
                      height={200}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="flex w-full flex-1 flex-col gap-6">
          {isLoading && (
            <div className="flex h-full flex-1 items-center justify-center">
              <LoaderCircleIcon className="h-12 w-12 animate-spin" />
              <span>Loading ...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
