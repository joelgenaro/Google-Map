import { generateUniqueShortTimestampBasedId } from '@/lib/utils/generate-unique-id';
import { eq, sql } from 'drizzle-orm';
import { db } from '..';
import { seedsRequest } from '../models/seedsRequest';
import { landAssessmentNewProject, users } from '../schema';
import { LandAssessmentNewProject, SeedsRequest, SeedsRequestWithProjectData } from '../types';

export const getProjectsWithoutSeedsRequests = async (
  userId: string
): Promise<LandAssessmentNewProject[]> => {
  const results = await db
    .select()
    .from(landAssessmentNewProject)
    .where(
      sql`${landAssessmentNewProject.userId} = ${userId}
      AND NOT EXISTS (
        SELECT 1
        FROM ${seedsRequest}
        WHERE ${seedsRequest.projectId} = ${landAssessmentNewProject.id}
        AND ${seedsRequest.status} = 'REQUESTED'
      )`
    );

  return results;
};

export const createSeedsRequest = async (
  requestData: Omit<SeedsRequest, 'id'>
): Promise<string | null> => {
  const id = await generateUniqueShortTimestampBasedId(seedsRequest);
  const newSeedsRequest = { id, ...requestData };
  // If the project ID is not provided, set it to null
  newSeedsRequest.projectId = requestData.projectId
    ? requestData.projectId
    : null;

  await db.insert(seedsRequest).values(newSeedsRequest);
  return newSeedsRequest.id;
};

export const getAllSeedsRequest = async (
  userId: string | null
): Promise<SeedsRequestWithProjectData[]> => {
  // If the user ID is not provided, return an empty array
  if (!userId) return [];

  // Check if the user exists
  const userEntity = await db
    .select()
    .from(users)
    .where(eq(users.id, userId))
    .limit(1)
    .execute();

  // If the user does not exist, return an empty array
  if (userEntity.length === 0) return [];

  const results = await db
    .select({
      id: seedsRequest.id,
      createdAt: seedsRequest.createdAt,
      updatedAt: seedsRequest.updatedAt,
      deletedAt: seedsRequest.deletedAt,
      createdBy: seedsRequest.createdBy,
      updatedBy: seedsRequest.updatedBy,
      deletedBy: seedsRequest.deletedBy,
      projectId: seedsRequest.projectId,
      requiredDate: seedsRequest.requiredDate,
      seedTreatment: seedsRequest.seedTreatment,
      seedViability: seedsRequest.seedViability,
      seedProvenance: seedsRequest.seedProvenance,
      seedsSpecies: seedsRequest.seedsSpecies,
      geoJsonData: seedsRequest.geoJsonData,
      status: seedsRequest.status,
      projectName: landAssessmentNewProject.projectName || null,
      projectData: landAssessmentNewProject.data || null,
    })
    .from(seedsRequest)
    .leftJoin(
      landAssessmentNewProject,
      eq(seedsRequest.projectId, landAssessmentNewProject.id)
    ).where(sql`
      ${seedsRequest.deletedAt} IS NULL AND 
      (${seedsRequest.projectId} IS NOT NULL AND
        ${landAssessmentNewProject.userId} = ${userEntity[0].id}
      ) OR (
        ${seedsRequest.projectId} IS NULL AND
        ${seedsRequest.createdBy} LIKE ${userEntity[0].name}
      )
    `);

  return results;
};

export const getSeedRequestById = async (
  id: string
): Promise<SeedsRequestWithProjectData | null> => {
  // First, fetch the seedsRequest to check if projectId is null
  const seedRequestEntity = await db
    .select()
    .from(seedsRequest)
    .where(eq(seedsRequest.id, id))
    .limit(1)
    .execute();

  if (!seedRequestEntity || seedRequestEntity.length === 0) {
    return null;
  }

  const seedRequest: (typeof seedRequestEntity)[0] = seedRequestEntity[0];

  // If projectId is null, return the seedsRequest data without joining
  if (seedRequest.projectId === null) {
    return {
      ...seedRequest,
      projectName: null,
      projectData: null,
    };
  }

  // Otherwise, join with landAssessmentNewProject to get project data
  const result = await db
    .select({
      id: seedsRequest.id,
      createdAt: seedsRequest.createdAt,
      updatedAt: seedsRequest.updatedAt,
      deletedAt: seedsRequest.deletedAt,
      createdBy: seedsRequest.createdBy,
      updatedBy: seedsRequest.updatedBy,
      deletedBy: seedsRequest.deletedBy,
      projectId: seedsRequest.projectId,
      requiredDate: seedsRequest.requiredDate,
      seedTreatment: seedsRequest.seedTreatment,
      seedViability: seedsRequest.seedViability,
      seedProvenance: seedsRequest.seedProvenance,
      seedsSpecies: seedsRequest.seedsSpecies,
      geoJsonData: seedsRequest.geoJsonData,
      status: seedsRequest.status,
      projectName: landAssessmentNewProject.projectName,
      projectData: landAssessmentNewProject.data,
    })
    .from(seedsRequest)
    .innerJoin(
      landAssessmentNewProject,
      eq(seedsRequest.projectId, landAssessmentNewProject.id)
    )
    .where(eq(seedsRequest.id, id))
    .limit(1)
    .execute();

  return result[0] || null;
};

export const updateSeedsRequest = async (
  id: string,
  updateData: Partial<SeedsRequest>
): Promise<string | null> => {
  // Update the updatedAt field
  updateData.updatedAt = new Date();
  const result = await db
    .update(seedsRequest)
    .set(updateData)
    .where(eq(seedsRequest.id, id))
    .returning({ id: seedsRequest.id })
    .execute();

  return result.length > 0 ? result[0].id : null;
};

export const deleteSeedsRequest = async (
  id: string
): Promise<string | null> => {
  const result = await db
    .update(seedsRequest)
    .set({ deletedAt: new Date() })
    .where(eq(seedsRequest.id, id))
    .returning({ id: seedsRequest.id })
    .execute();

  return result.length > 0 ? result[0].id : null;
};
