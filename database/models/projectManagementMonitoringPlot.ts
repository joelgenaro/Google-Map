import {
  pgTable,
  text,
  uuid,
  timestamp,
  numeric,
  smallint,
  boolean,
} from 'drizzle-orm/pg-core';
import { projectManagement } from './projectManagement';
import { projectManagementMonitoringData } from './projectManagementMonitoringData';

export const projectManagementMonitoringPlot = pgTable(
  'project_management_monitoring_plot',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    projectId: uuid('project_id')
      .notNull()
      .references(() => projectManagement.id, { onDelete: 'cascade' }),
    monitoringDataId: uuid('monitoring_data_id')
      .notNull()
      .references(() => projectManagementMonitoringData.id, {
        onDelete: 'cascade',
      }),
    plotID: text('plot_id'),
    longitude: text('longitude'),
    latitude: text('latitude'),
    canopyCover: smallint('canopy_cover'),
    leafLitter: smallint('leaf_litter'),
    bairSoil: smallint('bair_soil'),
    rock: smallint('rock'),
    vegetation: smallint('vegetation'),
    herbivory: boolean('herbivory'),
    disease: boolean('disease'),
    plotNotes: text('plot_notes'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
    deletedAt: timestamp('deleted_at'),
  }
);
