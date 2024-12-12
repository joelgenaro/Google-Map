import { eq, inArray, and } from 'drizzle-orm';
import { db } from '..';
import { ProjectManagementDetailIssue } from '../types';
import { projectManagementDetailIssue } from '../schema';

export const getIssuesByProjectId = async (
  projectId: string
): Promise<ProjectManagementDetailIssue[]> => {
  const results = await db
    .select()
    .from(projectManagementDetailIssue)
    .where(eq(projectManagementDetailIssue.projectId, projectId));

  return results;
};

export const insertIssue = async (
  issueData: ProjectManagementDetailIssue
): Promise<string | null> => {
  await db.insert(projectManagementDetailIssue).values(issueData);
  return issueData.id!;
};

export const getIssueById = async (
  id: string
): Promise<ProjectManagementDetailIssue | null> => {
  const issueEntity = await db
    .select()
    .from(projectManagementDetailIssue)
    .where(eq(projectManagementDetailIssue.id, id))
    .limit(1)
    .execute();

  if (!issueEntity || issueEntity.length === 0) {
    return null;
  }

  return issueEntity[0];
};

export const updateIssue = async (
  id: string,
  updateData: Partial<ProjectManagementDetailIssue>
): Promise<string | null> => {
  updateData.updatedAt = new Date();
  const result = await db
    .update(projectManagementDetailIssue)
    .set(updateData)
    .where(eq(projectManagementDetailIssue.id, id))
    .returning({ id: projectManagementDetailIssue.id })
    .execute();

  return result.length > 0 ? result[0].id : null;
};

export const deleteIssue = async (id: string): Promise<void> => {
  await db
    .delete(projectManagementDetailIssue)
    .where(eq(projectManagementDetailIssue.id, id));
};

export const deleteAllIssues = async (projectId: string): Promise<void> => {
  await db
    .delete(projectManagementDetailIssue)
    .where(eq(projectManagementDetailIssue.projectId, projectId));
};
