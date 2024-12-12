import { pgTable, text, uuid, timestamp, smallint } from 'drizzle-orm/pg-core';
import { projectManagement } from './projectManagement';
import { projectManagementMonitoringData } from './projectManagementMonitoringData';

export const projectManagementMonitoringPlant = pgTable('project_management_monitoring_plant', {
  id: uuid('id').primaryKey().defaultRandom(),
  projectId: uuid('project_id')
    .notNull()
    .references(() => projectManagement.id, { onDelete: 'cascade' }),
  monitoringDataId: uuid('monitoring_data_id')
    .notNull()
    .references(() => projectManagementMonitoringData.id, {
      onDelete: 'cascade',
    }),
  plantID: text('plant_id'),
  plotID: text('plot_id'),
  species: text('species'),
  height: smallint('height'),
  canopyDiameter: smallint('canopy_diameter'),
  plantNotes: text('plant_notes'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  deletedAt: timestamp('deleted_at'),
});
