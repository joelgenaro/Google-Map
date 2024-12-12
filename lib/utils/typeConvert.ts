import { LandAssessmentProjects } from "@/components/hooks/useGetLandAssessmentProjects";
import { ProjectManagements } from "@/components/hooks/useGetProjectManagements";

export const transformProjectData = (data: ProjectManagements[] | LandAssessmentProjects[]): LandAssessmentProjects[] => {
  return data.map((project) => {
    if ('projectAreaExist' in project) {
      return {
        ...project,
        landAreaInHectares: 0,
        estimateExists: project.projectAreaExist,
        exclusionExists: false,
      };
    } else {
      return project;
    }
  });
};