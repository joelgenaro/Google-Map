import { eq } from 'drizzle-orm';
import { db } from '..';
import {
  landAssessmentCarbonEstimationArea,
  landAssessmentCarbonExclusionArea,
  landAssessmentNewProject,
} from '../schema';
import {
  LandAssessmentCarbonEstimationArea,
  LandAssessmentCarbonExclusionArea,
  LandAssessmentNewProject,
  LandAssessmentProjectFull,
  LandAssessmentProjects,
} from '../types';

export const InsertLandAssessmentNewProject = async (
  data: LandAssessmentNewProject
): Promise<LandAssessmentNewProject> => {
  const project = await db
    .insert(landAssessmentNewProject)
    .values({ ...data })
    .returning();
  return project[0];
};

export const GetLandAssessmentNewProject = async (
  projectID: string
): Promise<LandAssessmentNewProject | null> => {
  const project = await db.query.landAssessmentNewProject.findFirst({
    where: eq(landAssessmentNewProject.id, projectID),
  });
  return project!;
};

export const getLandAssessmentProject = async (
  projectId: string
): Promise<LandAssessmentProjectFull | null> => {
  const [project, estimate, exclusion] = await Promise.all([
    db.query.landAssessmentNewProject.findFirst({
      where: eq(landAssessmentNewProject.id, projectId),
    }),
    db.query.landAssessmentCarbonEstimationArea.findMany({
      where: eq(landAssessmentCarbonEstimationArea.id, projectId),
    }),
    db.query.landAssessmentCarbonExclusionArea.findMany({
      where: eq(landAssessmentCarbonExclusionArea.id, projectId),
    }),
  ]);

  if (!project) return null;

  return { ...project, estimate, exclusion };
};

export const InsertLandAssessmentCarbonEstimationArea = async (
  data: LandAssessmentCarbonEstimationArea
): Promise<LandAssessmentCarbonEstimationArea> => {
  const project = await db
    .insert(landAssessmentCarbonEstimationArea)
    .values({ ...data })
    .returning();
  return project[0];
};

export const GetLandAssessmentCarbonEstimationArea = async (
  projectID: string
): Promise<LandAssessmentCarbonEstimationArea | null> => {
  const project = await db.query.landAssessmentCarbonEstimationArea.findFirst({
    where: eq(landAssessmentCarbonEstimationArea.id, projectID),
  });
  return project!;
};

export const UpdateLandAssessmentCarbonEstimationArea = async (
  projectID: string,
  data: LandAssessmentCarbonEstimationArea
): Promise<LandAssessmentCarbonEstimationArea> => {
  const project = await db
    .update(landAssessmentCarbonEstimationArea)
    .set({ ...data })
    .where(eq(landAssessmentCarbonEstimationArea.id, projectID))
    .returning();
  return project[0]!;
};

export const InsertLandAssessmentCarbonExclusionArea = async (
  data: LandAssessmentCarbonExclusionArea
): Promise<LandAssessmentCarbonExclusionArea> => {
  const project = await db
    .insert(landAssessmentCarbonExclusionArea)
    .values({ ...data })
    .returning();
  return project[0];
};

export const GetLandAssessmentCarbonExclusionArea = async (
  projectID: string
): Promise<LandAssessmentCarbonExclusionArea | null> => {
  const project = await db.query.landAssessmentCarbonExclusionArea.findFirst({
    where: eq(landAssessmentCarbonExclusionArea.id, projectID),
  });
  return project!;
};

export const UpdateLandAssessmentCarbonExclusionArea = async (
  projectID: string,
  data: LandAssessmentCarbonExclusionArea
): Promise<LandAssessmentCarbonExclusionArea> => {
  const project = await db
    .update(landAssessmentCarbonExclusionArea)
    .set({ ...data })
    .where(eq(landAssessmentCarbonExclusionArea.id, projectID))
    .returning();
  return project[0]!;
};

export const GetLandAssessmentBoundaries = async (
  userId: string
): Promise<LandAssessmentNewProject[]> => {
  const project = await db.query.landAssessmentNewProject.findMany({
    where: (table, { eq }) => eq(table.userId, userId),
  });
  return project;
}

export const GetLandAssessmentProjects = async (
  userId: string
): Promise<LandAssessmentProjects> => {
  const [project, estimate, exclusion] = await Promise.all([
    db.query.landAssessmentNewProject.findMany({
      where: (table, { eq }) => eq(table.userId, userId),
    }),
    db.query.landAssessmentCarbonEstimationArea.findMany({
      where: (table, { eq }) => eq(table.userId, userId),
    }),
    db.query.landAssessmentCarbonExclusionArea.findMany({
      where: (table, { eq }) => eq(table.userId, userId),
    }),
  ]);

  return { project, estimate, exclusion };
};

export const GetLandAssessmentAllProjects =
  async (): Promise<LandAssessmentProjects> => {
    const [project, estimate, exclusion] = await Promise.all([
      db.query.landAssessmentNewProject.findMany(),
      db.query.landAssessmentCarbonEstimationArea.findMany(),
      db.query.landAssessmentCarbonExclusionArea.findMany(),
    ]);

    return { project, estimate, exclusion };
  };
