import { eq } from 'drizzle-orm';
import { db } from '..';
import {
  InsertProjectManagementMonitoringPlant,
  SelectProjectManagementMonitoringPlant,
} from '../types';
import { projectManagementMonitoringPlant } from '../schema';

export async function createProjectManagementMonitoringPlant(
  data: InsertProjectManagementMonitoringPlant
) {
  await db.insert(projectManagementMonitoringPlant).values(data);
}

export async function updateProjectManagementMonitoringPlant(
  id: string,
  data: Partial<InsertProjectManagementMonitoringPlant>
) {
  await db
    .update(projectManagementMonitoringPlant)
    .set(data)
    .where(eq(projectManagementMonitoringPlant.id, id));
}

export async function getProjectManagementMonitoringPlantById(
  id: string
): Promise<SelectProjectManagementMonitoringPlant> {
  const result = await db
    .select()
    .from(projectManagementMonitoringPlant)
    .where(eq(projectManagementMonitoringPlant.id, id))
    .limit(1);

  return result[0];
}

export async function getProjectManagementMonitoringPlantsByMonitoringDataId(
  monitoringDataId: string
): Promise<SelectProjectManagementMonitoringPlant[]> {
  return db
    .select()
    .from(projectManagementMonitoringPlant)
    .where(
      eq(projectManagementMonitoringPlant.monitoringDataId, monitoringDataId)
    );
}

export async function deleteProjectManagementMonitoringPlant(id: string) {
  await db
    .delete(projectManagementMonitoringPlant)
    .where(eq(projectManagementMonitoringPlant.id, id));
}

export async function deleteProjectManagementMonitoringPlantsByMonitoringId(monitoringId:string) {
  await db
    .delete(projectManagementMonitoringPlant)
    .where(eq(projectManagementMonitoringPlant.monitoringDataId, monitoringId));
}
