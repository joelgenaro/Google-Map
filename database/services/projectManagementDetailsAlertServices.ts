import { eq, inArray, and } from 'drizzle-orm';
import { db } from '..';
import { projectManagementDetailAlert } from '../models/projectManagementDetailAlert';
import { ProjectManagementDetailAlert } from '../types';

export const getAlertsByProjectId = async (
  projectId: string
): Promise<ProjectManagementDetailAlert[]> => {
  const results = await db
    .select()
    .from(projectManagementDetailAlert)
    .where(eq(projectManagementDetailAlert.projectId, projectId));

  return results;
};

export const insertAlert = async (
  alertData: ProjectManagementDetailAlert
): Promise<string | null> => {
  await db.insert(projectManagementDetailAlert).values(alertData);
  return alertData.id!;
};

export const getAlertById = async (
  id: string
): Promise<ProjectManagementDetailAlert | null> => {
  const alertEntity = await db
    .select()
    .from(projectManagementDetailAlert)
    .where(eq(projectManagementDetailAlert.id, id))
    .limit(1)
    .execute();

  if (!alertEntity || alertEntity.length === 0) {
    return null;
  }

  return alertEntity[0];
};

export const updateAlert = async (
  id: string,
  updateData: Partial<ProjectManagementDetailAlert>
): Promise<string | null> => {
  updateData.updatedAt = new Date();
  const result = await db
    .update(projectManagementDetailAlert)
    .set(updateData)
    .where(eq(projectManagementDetailAlert.id, id))
    .returning({ id: projectManagementDetailAlert.id })
    .execute();

  return result.length > 0 ? result[0].id : null;
};

export const archiveAlert = async (id: string): Promise<string | null> => {
  const result = await db
    .update(projectManagementDetailAlert)
    .set({ deletedAt: new Date(), status: 'Archived' })
    .where(eq(projectManagementDetailAlert.id, id))
    .returning({ id: projectManagementDetailAlert.id })
    .execute();

  return result.length > 0 ? result[0].id : null;
};

export const archiveAllAlerts = async (projectId: string): Promise<number> => {
  const result = await db
    .update(projectManagementDetailAlert)
    .set({ deletedAt: new Date(), status: 'Archived' })
    .where(eq(projectManagementDetailAlert.projectId, projectId))
    .returning({ projectManagementDetailAlert });

  return result.length;
};

export const archiveSomeAlerts = async (
  projectId: string,
  alertIds: string[]
): Promise<number> => {
  const result = await db
    .update(projectManagementDetailAlert)
    .set({ deletedAt: new Date(), status: 'Archived' })
    .where(
      and(
        eq(projectManagementDetailAlert.projectId, projectId),
        inArray(projectManagementDetailAlert.id, alertIds)
      )
    )
    .returning({ projectManagementDetailAlert })

  return result.length;
};
