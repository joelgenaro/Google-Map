import { format } from 'date-fns';
import { and, eq, gt, isNull, lte, or } from 'drizzle-orm';
import { db } from '..';
import { platformUpdate } from '../schema';
import { PlatformUpdate } from '../types';

export const getAllPlatformUpdate = async (): Promise<PlatformUpdate[]> => {
  const currentDateStr = format(new Date(), 'yyyy-MM-dd');
  const currentDateObj = new Date();
  return await db
    .select()
    .from(platformUpdate)
    .where(
      and(
        // deletedAt is null
        isNull(platformUpdate.deletedAt),
        // enabled is true
        eq(platformUpdate.enabled, true),
        or(
          and(
            // startDate is in the past
            lte(platformUpdate.startDate, currentDateStr),
            // endDate is null
            isNull(platformUpdate.endDate)
          ),
          and(
            // startDate is in the past
            lte(platformUpdate.startDate, currentDateStr),
            // endDate is greater than current date
            gt(platformUpdate.endDate, currentDateObj)
          )
        )
      )
    );
};

export const getAllPlatformUpdates = async (): Promise<PlatformUpdate[]> => {
  return await db.select().from(platformUpdate);
};

export const getOnePlatformUpdate = async (
  id: string
): Promise<PlatformUpdate[]> => {
  return await db
    .select()
    .from(platformUpdate)
    .where(eq(platformUpdate.id, id));
};

export const insertPlatformUpdate = async (
  update: PlatformUpdate
): Promise<void> => {
  await db.insert(platformUpdate).values({ ...update });
};

export const updatePlatformUpdate = async (
  update: PlatformUpdate
): Promise<void> => {
  await db
    .update(platformUpdate)
    .set({ ...update })
    .where(eq(platformUpdate.id, update.id as string));
};

export const deletePlatformUpdate = async (id: string): Promise<void> => {
  await db.delete(platformUpdate).where(eq(platformUpdate.id, id));
};
