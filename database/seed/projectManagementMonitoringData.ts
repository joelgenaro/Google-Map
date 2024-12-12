import { projectManagementMonitoringPlant } from '../models/projectManagementMonitoringPlant';
import { projectManagementMonitoringPlot } from '../models/projectManagementMonitoringPlot';
import { projectManagementMonitoringData } from '../schema';
import {
  InsertProjectManagementMonitoringData,
  InsertProjectManagementMonitoringPlant,
  InsertProjectManagementMonitoringPlot,
} from '../types';
import { seedTable } from './seedTable';

const plotData: InsertProjectManagementMonitoringPlot[] = [];

const plantData: InsertProjectManagementMonitoringPlant[] = [];

const dataList: InsertProjectManagementMonitoringData[] = [];

export const seedProjectManagementMonitoringData = async () => {
  await seedTable(
    projectManagementMonitoringData,
    dataList,
    projectManagementMonitoringData.id
  );
  await seedTable(
    projectManagementMonitoringPlot,
    plotData,
    projectManagementMonitoringPlot.id
  );
  await seedTable(
    projectManagementMonitoringPlant,
    plantData,
    projectManagementMonitoringPlant.id
  );
};
