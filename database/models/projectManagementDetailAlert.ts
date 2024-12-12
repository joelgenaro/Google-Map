import {
  pgTable,
  text,
  uuid,
  timestamp
} from 'drizzle-orm/pg-core';
import { projectManagement } from './projectManagement';

export const projectManagementDetailAlert = pgTable("project_management_detail_alert", {
  id: uuid("id").primaryKey().defaultRandom(),
  projectId: uuid("project_id")
    .notNull()
    .references(() => projectManagement.id, { onDelete: "cascade" }),
  alert: text("alert").notNull(),
  date: timestamp("date").notNull(),
  raiseIssue: text("raise_issue").notNull(),
  dangerLevel: text("danger_level").notNull(),
  status: text("status").notNull(),
  type: text("type").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  deletedAt: timestamp("deleted_at"),
});