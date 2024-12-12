import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { db, dbConnection } from '.';
import { seedAllTables } from './seed';
import dotenv from 'dotenv';

dotenv.config();

(async () => {
  try {
    console.log('Starting database migration...');
    // Run migrations on the database, skipping the ones already applied
    await migrate(db, { migrationsFolder: './drizzle' });
    console.log('Migrations applied successfully');

    // Check if seeding is enabled
    if (process.env.DATABASE_ENABLE_SEEDING === 'true') {
      console.log('Starting database seeding...');
      // Seed the database with initial data
      // This will only seed the data if it does not exist
      await seedAllTables();
      console.log('Database seeded successfully');
    } else {
      console.log('Database seeding is disabled');
    }
  } catch (error) {
    console.error('Error during migration or seeding:', error);
  } finally {
    try {
      // Close the connection, otherwise the script will hang
      await dbConnection.end();
      console.log('Database connection closed.');
    } catch (endError) {
      console.error('Error closing database connection:', endError);
    }
  }
})().catch((error) => {
  console.error('Unhandled error in the async function:', error);
});
