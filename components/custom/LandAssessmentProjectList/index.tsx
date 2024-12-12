'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

import { Card } from '@/components/ui/card';
import {
  CarbonMethodOptions,
  LAND_ASSESSMENT_FILTER_BAR_CONFIG,
} from '@/lib/constants';
import { LandAssessmentProjects } from '../../hooks/useGetLandAssessmentProjects';
import NonInteractiveMap from '../NonInteractiveMap';
import ProjectsFilterBar from '../ProjectsFilterBar';
import SkeletonLoader from './SkeletonLoader';
import { LandAssessmentNewProject } from '@/database/types';

const LandAssessmentProjectList = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<any | null>(null);
  const [projectData, setProjectData] = useState<LandAssessmentProjects[]>([]);
  const [isMapView, setIsMapView] = useState<boolean>(false);
  const [projectBoundaries, setProjectBoundaries] = useState<
    LandAssessmentNewProject[]
  >([]);

  const fetchProjectBoundaries = useCallback(async () => {
    try {
      const response = await fetch('/api/land-assessment/get-boundaries');
      const { result } = await response.json();
      setProjectBoundaries(result);
    } catch (error) {
      console.error("Failed to fetch project boundaries:", error);
    }
  }, [])

  useEffect(() => {
    fetchProjectBoundaries();
  }, [fetchProjectBoundaries]);

  const handleOnclick = (project: LandAssessmentProjects) => {
    const navigateTo = project.exclusionExists
      ? `/land-assessment/${project.id}`
      : project.estimateExists
        ? `/land-assessment/new-project/${project.id}/exclusion`
        : `/land-assessment/new-project/${project.id}`;
    router.push(navigateTo);
  };

  return (
    <div className="mb-6 flex h-full w-full flex-col items-center gap-4">
      <div className="flex h-full w-full flex-col">
        <ProjectsFilterBar
          inputFieldConfig={LAND_ASSESSMENT_FILTER_BAR_CONFIG}
          isLoading={setIsLoading}
          error={setError}
          projectData={setProjectData}
          isMapView={setIsMapView}
          pageType="land-assessment"
          newProject={{
            buttonLabel: 'New Project',
            href: '/land-assessment/new-project',
            showButton: true,
          }}
        />
      </div>
      <div className="flex h-full w-full flex-col gap-6">
        {isLoading && <SkeletonLoader />}
        {!isLoading && !error && projectData.length > 0 && (
          <div
            className={`grid grid-cols-1 gap-4 ${isMapView ? 'lg:grid-cols-2' : ''}`}
          >
            {isMapView && (
              <NonInteractiveMap projects={projectData} enableZoom={false} />
            )}
            <div className="flex flex-col gap-6">
              {projectData.map((project) => (
                <Card
                  key={project.id}
                  className="flex max-h-[300px] min-h-[300px] cursor-pointer rounded-xl shadow-lg"
                  onClick={() => handleOnclick(project)}
                >
                  <div className="flex flex-1 p-2">
                    <div className="w-1/2 p-4">
                      <div className="mb-2">
                        <p className="text-sm text-gray-500">Project Name</p>
                        <h2 className="text-2xl">{project.projectName}</h2>
                      </div>
                      <div className="mb-2">
                        <p className="text-sm text-gray-500">Location</p>
                        <p className="text-sm">{project.projectLocation}</p>
                      </div>
                      <div className="mb-2">
                        <p className="text-sm text-gray-500">Total CEAs</p>
                        <p className="text-sm">
                          {project.landAreaInHectares} ha
                        </p>
                      </div>
                      <div className="mb-2">
                        <p className="text-sm text-gray-500">Carbon Methods</p>
                        <div className="flex gap-3">
                          {project.carbonMethod?.map((method) =>
                            CarbonMethodOptions.map((option) =>
                              option.title === method ? (
                                <option.icon
                                  key={option.title}
                                  className="h-6 w-6"
                                />
                              ) : null
                            )
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="relative h-full w-1/2 rounded-xl">
                      {project.pinLocation ? (
                        <NonInteractiveMap
                          projects={[project]}
                          className="h-full"
                          enableZoom={false}
                          projectBoundary={
                            projectBoundaries.filter(
                              (projectBoundary) =>
                                projectBoundary.id === project.id
                            )[0]
                          }
                        />
                      ) : (
                        <Image
                          className="rounded-r-2xl"
                          src="/images/temp-background.png"
                          alt="Project Image"
                          layout="fill"
                          objectFit="cover"
                        />
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LandAssessmentProjectList;
