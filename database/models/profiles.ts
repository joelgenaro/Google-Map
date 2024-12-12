import {
  integer,
  pgTable,
  text,
  uuid
} from 'drizzle-orm/pg-core';
import { users } from './users';

export const profiles = pgTable('profile', {
  userId: uuid('userId')
    .notNull()
    .unique()
    .references(() => users.id, { onDelete: 'cascade' }),
  profileType: text('profileType').notNull(),
  userType: text('userType').notNull(),
  registerReason: text('registerReason').notNull(),
  experienceLevel: integer('experienceLevel').notNull(),
});