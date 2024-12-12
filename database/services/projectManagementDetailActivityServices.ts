import { eq } from 'drizzle-orm';
import { db } from '..';
import { ProjectManagementDetailActivity } from '../types';
import { projectManagementDetailActivity } from '../schema';

export const getActivitiesByProjectId = async (
  projectId: string
): Promise<ProjectManagementDetailActivity[]> => {
  const results = await db
    .select()
    .from(projectManagementDetailActivity)
    .where(eq(projectManagementDetailActivity.projectId, projectId));

  return results;
};

export const getActivityId = async (
  id: string
): Promise<ProjectManagementDetailActivity | null> => {
  const issueEntity = await db
    .select()
    .from(projectManagementDetailActivity)
    .where(eq(projectManagementDetailActivity.id, id))
    .limit(1)
    .execute();

  if (!issueEntity || issueEntity.length === 0) {
    return null;
  }

  return issueEntity[0];
};

export const insertActivity = async (
  issueData: ProjectManagementDetailActivity
): Promise<string | null> => {
  await db.insert(projectManagementDetailActivity).values(issueData);
  return issueData.id!;
};

export const updateActivity = async (
  id: string,
  updateData: Partial<ProjectManagementDetailActivity>
): Promise<string | null> => {
  updateData.updatedAt = new Date();
  const result = await db
    .update(projectManagementDetailActivity)
    .set(updateData)
    .where(eq(projectManagementDetailActivity.id, id))
    .returning({ id: projectManagementDetailActivity.id })
    .execute();

  return result.length > 0 ? result[0].id : null;
};

export const deleteActivity = async (id: string): Promise<void> => {
  await db
    .delete(projectManagementDetailActivity)
    .where(eq(projectManagementDetailActivity.id, id));
};

export const deleteAllActivities = async (projectId: string): Promise<void> => {
  await db
    .delete(projectManagementDetailActivity)
    .where(eq(projectManagementDetailActivity.projectId, projectId));
};
