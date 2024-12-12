import { db } from '@/database';
import { seedsRequest } from '@/database/schema';
import { eq } from 'drizzle-orm';

// Table types should be defined in the schema file/models folder
type Table = typeof seedsRequest;

const generateShortTimestampBasedId = (): string => {
  // Convert to a base36 string
  const timestamp = Date.now().toString(36);
  // Take 4 characters
  const randomPart = Math.random().toString(36).substring(2, 6);
  return `${timestamp}${randomPart}`;
};

const isUniqueId = async (id: string, table: Table): Promise<boolean> => {
  const existingIds = await db
    .select()
    .from(table)
    .where(eq(table.id, id))
    .limit(1)
    .execute();
  return existingIds.length === 0;
};

export const generateUniqueShortTimestampBasedId = async (
  table: Table
): Promise<string> => {
  let id: string = '';
  let isUnique = false;
  while (!isUnique) {
    id = generateShortTimestampBasedId();
    isUnique = await isUniqueId(id, table);
  }
  return id;
};
