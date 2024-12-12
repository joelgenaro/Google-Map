import {
  pgTable,
  text,
  uuid,
  timestamp
} from 'drizzle-orm/pg-core';
import { projectManagement } from './projectManagement';

export const projectManagementMonitoringReport = pgTable("project_management_monitoring_report", {
  id: uuid("id").primaryKey().defaultRandom(),
  projectId: uuid("project_id")
    .notNull()
    .references(() => projectManagement.id, { onDelete: "cascade" }),
  fromDate: timestamp("from_date"),
  toDate: timestamp("to_date"),
  method: text("method"),
  projectName: text("projectName").notNull(),
  status: text("status").notNull(),
  report: text("report"),
  description: text("description"),
  attachedFile: text("attached_file"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  deletedAt: timestamp("deleted_at"),
});