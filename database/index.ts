import { env } from '@/env';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

const connectionString = env.DATABASE_URL;

export const dbConnection = postgres(connectionString);

export const db = drizzle(dbConnection, { schema });
