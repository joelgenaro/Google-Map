import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';
import { env } from './env';

export default defineConfig({
  dialect: 'postgresql',
  schema: './database/schema.ts',
  dbCredentials: { url: env.DATABASE_URL },
  strict: true,
  verbose: true,
  out: './drizzle',
});
