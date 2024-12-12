import {
  jsonb,
  pgTable,
  text,
  uuid
} from 'drizzle-orm/pg-core';
import { users } from './users';

export const landAssessmentNewProject = pgTable('landAssessmentNewProject', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  projectName: text('projectName').notNull(),
  data: jsonb('data').notNull(),
});

export const landAssessmentCarbonEstimationArea = pgTable(
  'landAssessmentCarbonEstimationArea',
  {
    id: uuid('id').primaryKey(),
    userId: uuid('userId')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    carbonMethod: text('carbonMethod').array(),
    data: jsonb('data').notNull(),
  }
);

export const landAssessmentCarbonExclusionArea = pgTable("landAssessmentCarbonExclusionArea", {
  id: uuid("id").primaryKey(),
  userId: uuid("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  data: jsonb("data").notNull(),
});
