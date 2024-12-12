import { pgTable, text, uuid, timestamp } from 'drizzle-orm/pg-core';
import { projectManagement } from './projectManagement';

export const projectManagementMonitoringData = pgTable('project_management_monitoring_data_list', {
  id: uuid('id').primaryKey().defaultRandom(),
  projectId: uuid('project_id')
    .notNull()
    .references(() => projectManagement.id, { onDelete: 'cascade' }),
  datasetName: text('dataset_name').notNull(),
  dataCollectionDate: timestamp('data_collection_date').notNull(),
  monitoringTiming: text('monitoring_timing').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  deletedAt: timestamp('deleted_at'),
});
