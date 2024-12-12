import { eq, getTableName } from 'drizzle-orm';
import { PgColumn, PgTable } from 'drizzle-orm/pg-core';
import { db } from '..';

interface TableData {
  [key: string]: any;
}

export const seedTable = async <T extends TableData>(
  table: PgTable,
  data: T[],
  primaryKey: PgColumn<any>
) => {
  const tableName = getTableName(table);

  for (const row of data) {
    const primaryKeyValue = row[primaryKey.name];
    const existingRecord = await db
      .select()
      .from(table)
      .where(eq(primaryKey, primaryKeyValue));

    if (!existingRecord.length) {
      await db.insert(table).values(row);
      console.log(
        `Inserted row in ${tableName} table with ${primaryKey.name}: ${primaryKeyValue}`
      );
    } else {
      console.log(
        `Skipped row in ${tableName} table with ${primaryKey.name}: ${primaryKeyValue}`
      );
    }
  }
};
