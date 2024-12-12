import { eq } from "drizzle-orm";
import { db } from "..";
import { projectManagement } from "../schema";
import { ProjectManagement } from "../types";

export const InsertProjectManagement = async (
  data: ProjectManagement
): Promise<ProjectManagement> => {
  const project = await db
    .insert(projectManagement)
    .values({ ...data })
    .returning();
  return project[0];
};

export const UpdateProjectManagement = async (
  projectID: string,
  data: Partial<ProjectManagement>
): Promise<ProjectManagement> => {
  const project = await db
    .update(projectManagement)
    .set({ ...data })
    .where(eq(projectManagement.id, projectID))
    .returning();
  return project[0]!;
};

export const GetProjectManagement = async (
  projectID: string
): Promise<ProjectManagement> => {
  const project = await db.query.projectManagement.findFirst({
    where: eq(projectManagement.id, projectID),
  });
  return project!;
};

export const GetProjectmanagements = async (
  userId: string
): Promise<ProjectManagement[]> => {
  const project = await db.query.projectManagement.findMany({
    where: (table, { eq }) => eq(table.userId, userId),
  });
  return project;
};

export const GetAllProjectManagements = async (): Promise<ProjectManagement[]> => {
  return await db
    .select()
    .from(projectManagement)
};