import { sql } from 'drizzle-orm';
import {
  boolean,
  date,
  index,
  pgTable,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core';

export const platformUpdate = pgTable(
  'platform_update',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    createdAt: timestamp('created_at', { mode: 'date' }).default(sql`NOW()`),
    updatedAt: timestamp('updated_at', { mode: 'date' }),
    deletedAt: timestamp('deleted_at', { mode: 'date' }),
    createdBy: text('created_by'),
    updatedBy: text('updated_by'),
    deletedBy: text('deleted_by'),
    message: text('message').notNull(),
    startDate: date('start_date').default(sql`CURRENT_DATE`),
    endDate: date('end_date', { mode: 'date' }),
    enabled: boolean('enabled').default(true),
  },
  (table) => ({
    idIndex: index('platform_update_id_idx').on(table.id),
  })
);
