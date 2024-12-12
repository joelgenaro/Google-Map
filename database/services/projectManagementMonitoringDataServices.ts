import { eq } from 'drizzle-orm';
import { db } from '..';
import {
  InsertProjectManagementMonitoringData,
  InsertProjectManagementMonitoringPlant,
  InsertProjectManagementMonitoringPlot,
  InsertMonitoringDataWithPlotsAndPlants,
  SelectProjectManagementMonitoringData,
  SelectMonitoringDataWithPlotsAndPlants,
} from '../types';
import { projectManagementMonitoringData } from '../schema';
import {
  createProjectManagementMonitoringPlot,
  deleteProjectManagementMonitoringPlotsByMonitoringId,
  getProjectManagementMonitoringPlotsByMonitoringDataId,
} from './projectManagementMonitoringPlotServices';
import {
  createProjectManagementMonitoringPlant,
  deleteProjectManagementMonitoringPlantsByMonitoringId,
  getProjectManagementMonitoringPlantsByMonitoringDataId,
} from './projectManagementMonitoringPlantServices';

export const createProjectManagementMonitoringData = async (
  data: InsertProjectManagementMonitoringData
) => {
  const result = await db
    .insert(projectManagementMonitoringData)
    .values(data)
    .returning();

  return result[0].id;
};

export const updateProjectManagementMonitoringData = async (
  id: string,
  data: Partial<InsertProjectManagementMonitoringData>
) => {
  await db
    .update(projectManagementMonitoringData)
    .set(data)
    .where(eq(projectManagementMonitoringData.id, id));
};

export const getProjectManagementMonitoringDataById = async (
  id: string
): Promise<SelectProjectManagementMonitoringData> => {
  const result = await db
    .select()
    .from(projectManagementMonitoringData)
    .where(eq(projectManagementMonitoringData.id, id))
    .limit(1);
  return result[0];
};

export const getProjectManagementMonitoringDataByProjectId = async (
  projectId: string
): Promise<SelectProjectManagementMonitoringData[]> => {
  return db
    .select()
    .from(projectManagementMonitoringData)
    .where(eq(projectManagementMonitoringData.projectId, projectId));
};

export const deleteProjectManagementMonitoringData = async (id: string) => {
  await db
    .delete(projectManagementMonitoringData)
    .where(eq(projectManagementMonitoringData.id, id));
};

export async function insertMonitoringData(
  data: InsertMonitoringDataWithPlotsAndPlants
) {
  // Insert monitoring data
  const monitoringData: InsertProjectManagementMonitoringData = {
    projectId: data.projectId,
    datasetName: data.datasetName,
    dataCollectionDate: new Date(data.dataCollectionDate),
    monitoringTiming: data.monitoringTiming,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const monitoringDataId =
    await createProjectManagementMonitoringData(monitoringData);

  for (const plot of data.plots) {
    const plotData = {
      ...plot,
      projectId: data.projectId,
      monitoringDataId,
    } as InsertProjectManagementMonitoringPlot;
    await createProjectManagementMonitoringPlot(plotData);
  }

  // Insert plants data associated with the plot
  for (const plant of data.plants) {
    const plantData = {
      ...plant,
      projectId: data.projectId,
      monitoringDataId,
    } as InsertProjectManagementMonitoringPlant;
    await createProjectManagementMonitoringPlant(plantData);
  }
}

export async function updateMonitoringData(
  monitoringDataId: string,
  data: InsertMonitoringDataWithPlotsAndPlants
) {
  // Update monitoring data
  const monitoringData: Partial<InsertProjectManagementMonitoringData> = {
    datasetName: data.datasetName,
    dataCollectionDate: new Date(data.dataCollectionDate),
    monitoringTiming: data.monitoringTiming,
    updatedAt: new Date(),
  };

  await updateProjectManagementMonitoringData(monitoringDataId, monitoringData);

  if (data.plots.length === 0 && data.plants.length === 0) {
    return;
  }
  // Delete all existing monitoring plots and plants
  await deleteProjectManagementMonitoringPlotsByMonitoringId(monitoringDataId);
  await deleteProjectManagementMonitoringPlantsByMonitoringId(monitoringDataId);

  // Insert monitoring plots
  for (const plot of data.plots) {
    const plotData = {
      ...plot,
      projectId: data.projectId,
      monitoringDataId,
    } as InsertProjectManagementMonitoringPlot;
    await createProjectManagementMonitoringPlot(plotData);
  }

  // Insert monitoring plants
  for (const plant of data.plants) {
    const plantData = {
      ...plant,
      projectId: data.projectId,
      monitoringDataId,
    } as InsertProjectManagementMonitoringPlant;
    await createProjectManagementMonitoringPlant(plantData);
  }
}

export async function getMonitoringDataByMonitoringDataId(
  monitoringDataId: string
): Promise<SelectMonitoringDataWithPlotsAndPlants> {
  const monitoringData =
    await getProjectManagementMonitoringDataById(monitoringDataId);
  const plots = await getProjectManagementMonitoringPlotsByMonitoringDataId(
    monitoringData.id
  );
  const plants = await getProjectManagementMonitoringPlantsByMonitoringDataId(
    monitoringData.id
  );

  const result: SelectMonitoringDataWithPlotsAndPlants = {
    id: monitoringData.id,
    projectId: monitoringData.projectId,
    datasetName: monitoringData.datasetName,
    dataCollectionDate: monitoringData.dataCollectionDate,
    monitoringTiming: monitoringData.monitoringTiming,
    plots,
    plants,
  };

  return result;
}

export async function getAllMonitirngDataByProjectId(
  projectId: string
): Promise<SelectMonitoringDataWithPlotsAndPlants[]> {
  const monitoringDataList =
    await getProjectManagementMonitoringDataByProjectId(projectId);

  const result: SelectMonitoringDataWithPlotsAndPlants[] = [];
  for (const monitoringData of monitoringDataList) {
    const plots = await getProjectManagementMonitoringPlotsByMonitoringDataId(
      monitoringData.id
    );
    const plants = await getProjectManagementMonitoringPlantsByMonitoringDataId(
      monitoringData.id
    );

    result.push({
      id: monitoringData.id,
      projectId: monitoringData.projectId,
      datasetName: monitoringData.datasetName,
      dataCollectionDate: monitoringData.dataCollectionDate,
      monitoringTiming: monitoringData.monitoringTiming,
      plots,
      plants,
    });
  }

  return result;
}
