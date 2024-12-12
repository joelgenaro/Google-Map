import {
  pgTable,
  text,
  uuid,
  timestamp
} from 'drizzle-orm/pg-core';
import { projectManagement } from './projectManagement';

export const projectManagementDetailIssue = pgTable("project_management_detail_issue", {
  id: uuid("id").primaryKey().defaultRandom(),
  projectId: uuid("project_id")
    .notNull()
    .references(() => projectManagement.id, { onDelete: "cascade" }),
  issue: text("issue").notNull(),
  status: text("status").notNull(),
  action: text("action"),
  date: timestamp("date").notNull(),
  description: text("description"),
  attachedFile: text("attached_file"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  deletedAt: timestamp("deleted_at"),
});