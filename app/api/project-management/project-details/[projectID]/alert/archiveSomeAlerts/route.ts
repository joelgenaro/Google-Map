import { ArchiveSomeAlerts } from "./archieveSomeAlerts";

export async function PATCH(
  req: Request,
  { params }: { params: { projectID: string } }
) {
  return ArchiveSomeAlerts(req, params.projectID);
}