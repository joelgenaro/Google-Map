import { eq } from 'drizzle-orm';
import { db } from '..';
import {
  InsertProjectManagementMonitoringPlot,
  SelectProjectManagementMonitoringPlot,
} from '../types';
import { projectManagementMonitoringPlot } from '../schema';

export const createProjectManagementMonitoringPlot = async (
  data: InsertProjectManagementMonitoringPlot
) => {
  await db.insert(projectManagementMonitoringPlot).values(data);
};

export const updateProjectManagementMonitoringPlot = async (
  id: string,
  data: Partial<InsertProjectManagementMonitoringPlot>
) => {
  await db
    .update(projectManagementMonitoringPlot)
    .set(data)
    .where(eq(projectManagementMonitoringPlot.id, id));
};

export const getProjectManagementMonitoringPlotById = async (
  id: string
): Promise<SelectProjectManagementMonitoringPlot> => {
  const result = await db
    .select()
    .from(projectManagementMonitoringPlot)
    .where(eq(projectManagementMonitoringPlot.id, id))
    .limit(1);
  return result[0];
};

export const getProjectManagementMonitoringPlotsByMonitoringDataId = async (
  monitoringDataId: string
): Promise<SelectProjectManagementMonitoringPlot[]> => {
  return db
    .select()
    .from(projectManagementMonitoringPlot)
    .where(
      eq(projectManagementMonitoringPlot.monitoringDataId, monitoringDataId)
    );
};

export const deleteProjectManagementMonitoringPlot = async (id: string) => {
  await db
    .delete(projectManagementMonitoringPlot)
    .where(eq(projectManagementMonitoringPlot.id, id));
};

export const deleteProjectManagementMonitoringPlotsByMonitoringId = async (
  monitoringId: string
) => {
  await db
    .delete(projectManagementMonitoringPlot)
    .where(eq(projectManagementMonitoringPlot.monitoringDataId, monitoringId));
}