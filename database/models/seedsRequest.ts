import { sql } from 'drizzle-orm';
import {
  boolean,
  date,
  index,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core';
import { landAssessmentNewProject } from '../schema';

const statusEnum = pgEnum('status_enum', [
  'REQUESTED',
  'CANCELLED',
  'COMPLETED',
]);

export const seedsRequest = pgTable(
  'seeds_request',
  {
    id: text('id').primaryKey(),
    createdAt: timestamp('created_at', { mode: 'date' })
      .notNull()
      .default(sql`NOW()`),
    updatedAt: timestamp('updated_at', { mode: 'date' }),
    deletedAt: timestamp('deleted_at', { mode: 'date' }),
    createdBy: text('created_by'),
    updatedBy: text('updated_by'),
    deletedBy: text('deleted_by'),
    projectId: uuid('project_id').references(() => landAssessmentNewProject.id, {
      onDelete: 'cascade',
    }),
    requiredDate: date('required_date').notNull(),
    seedTreatment: boolean('seed_treatment').default(false),
    seedViability: boolean('seed_viability').default(false),
    seedProvenance: boolean('seed_provenance').default(false),
    seedsSpecies: jsonb('seeds_species').notNull(),
    geoJsonData: jsonb('geo_json_data'),
    status: statusEnum('status').notNull(),
  },
  (table) => ({
    idIndex: index('seeds_request_id_idx').on(table.id),
    projectIdIndex: index('seeds_request_project_id_idx').on(table.projectId),
  })
);
