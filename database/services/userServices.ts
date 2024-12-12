import { eq } from "drizzle-orm";
import { db } from "..";
import { users } from "../schema";
import { User } from "../types";

export const InsertUserRecord = async (data: User): Promise<User> => {
  const user = await db
    .insert(users)
    .values({ ...data })
    .returning();
  return user[0];
};

export const RetrieveUser = async (email: string): Promise<User> => {
  const retrieveUser = await db.query.users.findFirst({
    where: eq(users.email, email),
  });
  return retrieveUser!;
};

export const GetUserByID = async (userId: string): Promise<User> => {
  const user = await db.query.users.findFirst({
    where: eq(users.id, userId),
  });
  return user!;
};

export const DeleteUser = async (id: string): Promise<void> => {
  await db.delete(users).where(eq(users.id, id));
};