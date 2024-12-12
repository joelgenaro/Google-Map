import {
  pgTable,
  text,
  uuid
} from 'drizzle-orm/pg-core';
import { users } from './users';

export const projectManagement = pgTable("projectManagement", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  projectName: text("projectName").notNull(),
  landholderName: text("landholderName").notNull(),
  address: text("address").notNull(),
  letterOfDeclarationUrl: text("letterOfDeclarationUrl"),
  auditScheduleUrl: text("auditScheduleUrl"),
  letterToParticipateUrl: text("letterToParticipateUrl"),
  specificationsUrls: text("specificationsUrls").array(),
  landManagementPlanUrl: text("landManagementPlanUrl"),
  fireManagementPlanUrl: text("fireManagementPlanUrl"),
  permanencePlanUrl: text("permanencePlanUrl"),
  fullCAMFilesUrl: text("fullCAMFilesUrl"),
  carbonEstimationAreaBaselineDataUrl: text("carbonEstimationAreaBaselineDataUrl"),
  carbonAdditionalFilesUrls: text("carbonAdditionalFilesUrls"),
  carbonAdditionalFilesDescription: text("carbonAdditionalFilesDescription"),
  monitoringPlotsUrl: text("monitoringPlotsUrl"),
  monitoringDataUrl: text("monitoringDataUrl"),
  monitoringAdditionalFilesUrls: text("monitoringAdditionalFilesUrls"),
  monitoringAdditionalFilesDescription: text("monitoringAdditionalFilesDescription"),
});