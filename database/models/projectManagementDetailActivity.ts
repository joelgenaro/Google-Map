import {
  pgTable,
  text,
  uuid,
  timestamp
} from 'drizzle-orm/pg-core';
import { projectManagement } from './projectManagement';

export const projectManagementDetailActivity = pgTable("project_management_detail_activity", {
  id: uuid("id").primaryKey().defaultRandom(),
  projectId: uuid("project_id")
    .notNull()
    .references(() => projectManagement.id, { onDelete: "cascade" }),
  activity: text("activity").notNull(),
  status: text("status").notNull(),
  date: timestamp("date"),
  fromDate: timestamp("from_date"),
  toDate: timestamp("to_date"),
  type: text("type"),
  description: text("description"),
  attachedFile: text("attached_file"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  deletedAt: timestamp("deleted_at"),
});