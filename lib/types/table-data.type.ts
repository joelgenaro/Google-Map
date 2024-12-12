import {
  ProjectManagementMonitoringPlant,
  ProjectManagementMonitoringPlot,
} from '@/database/types';
import { ColumnDef } from '@tanstack/react-table';

export type TableData =
  | ProjectManagementMonitoringPlot[]
  | ProjectManagementMonitoringPlant[];

export type TableColumn = ColumnDef<
  ProjectManagementMonitoringPlot | ProjectManagementMonitoringPlant
>;

export type DataType = 'plot' | 'plant';