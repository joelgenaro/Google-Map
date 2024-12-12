import { eq } from 'drizzle-orm';
import { db } from '..';
import { ProjectManagementMonitoringReport } from '../types';
import { projectManagementMonitoringReport } from '../schema';

export const getReportsByProjectId = async (
  projectId: string
): Promise<ProjectManagementMonitoringReport[]> => {
  const results = await db
    .select()
    .from(projectManagementMonitoringReport)
    .where(eq(projectManagementMonitoringReport.projectId, projectId));

  return results;
};

export const getReportById = async (
  id: string
): Promise<ProjectManagementMonitoringReport | null> => {
  const issueEntity = await db
    .select()
    .from(projectManagementMonitoringReport)
    .where(eq(projectManagementMonitoringReport.id, id))
    .limit(1)
    .execute();

  if (!issueEntity || issueEntity.length === 0) {
    return null;
  }

  return issueEntity[0];
};

export const insertReport = async (
  issueData: ProjectManagementMonitoringReport
): Promise<string | null> => {
  await db.insert(projectManagementMonitoringReport).values(issueData);
  return issueData.id!;
};

export const updateReport = async (
  id: string,
  updateData: Partial<ProjectManagementMonitoringReport>
): Promise<string | null> => {
  updateData.updatedAt = new Date();
  const result = await db
    .update(projectManagementMonitoringReport)
    .set(updateData)
    .where(eq(projectManagementMonitoringReport.id, id))
    .returning({ id: projectManagementMonitoringReport.id })
    .execute();

  return result.length > 0 ? result[0].id : null;
};

export const deleteReport = async (id: string): Promise<void> => {
  await db
    .delete(projectManagementMonitoringReport)
    .where(eq(projectManagementMonitoringReport.id, id));
};

export const deleteAllReports = async (projectId: string): Promise<void> => {
  await db
    .delete(projectManagementMonitoringReport)
    .where(eq(projectManagementMonitoringReport.projectId, projectId));
};
